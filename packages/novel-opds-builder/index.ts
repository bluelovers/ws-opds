/**
 * Created by user on 2019/3/8.
 */

import {
	createFromJSON,
	createMoment,
	IFilterNovelData,
	INovelStatCache,
	NovelStatCache,
} from '@node-novel/cache-loader'
import { NodeNovelInfo } from 'node-novel-info/class'

import { array_unique, array_unique_overwrite } from 'array-hyper-unique'
import { slugify } from 'cjk-conv/lib/zh/table/list';

import { OPDSV1 } from 'opds-extra';
import { EnumLinkRel, EnumMIME } from 'opds-extra/lib/const';
import { base64_qrcode } from './lib/const';
import StrUtil from 'str-util';
import Bluebird from 'bluebird';
import fs from 'fs-extra';

import MIMETypes from 'mime-types';

/**
 * build OPDS xml from node-novel novel-stat.json
 *
 * @param {string} novelStatJsonPath
 * @param {string} outputOPDSPath
 */
export function buildOPDS(novelStatJsonPath: string, outputOPDSPath: string)
{
	return Bluebird.resolve().then(async function ()
	{
		let ret = await _cache(novelStatJsonPath);

		let siteURL = 'https://demonovel.netlify.com/';

		let feed = OPDSV1.Feed.deserialize({
			title: '@node-novel',
			subtitle: siteURL,

			icon: base64_qrcode,

			links: [
				{
					rel: EnumLinkRel.IMAGE,
					href: base64_qrcode,
					type: EnumMIME.png,
				},
				{
					rel: EnumLinkRel.IMAGE_THUMBNAIL,
					href: base64_qrcode,
					type: EnumMIME.png,
				},
			],

			authors: [
				{
					name: '@node-novel',
					uri: siteURL,
				},
			],

		});

		let outputUrl = ret.novelStatCache.data.meta.outputUrl;

		outputUrl = 'https://gitlab.com/demonovel/epub-txt/raw/master/';

		if (!/\/$/.test(outputUrl))
		{
			outputUrl += '/';
		}

		feed.books = feed.books || [];

		Object.entries(ret.novels2)
			.forEach(function ([title, data])
			{
				let authors = data.authors.reduce(function (a, b)
				{
					a.push({
						name: b,
					});

					return a;
				}, []);

				let novel: IFilterNovelDataPlus;

				if (data.list.length == 1)
				{
					novel = data.list[0];
				}
				else
				{
					novel = data.list[0];
				}

				if (novel)
				{
					let links = [];

					if (novel.cache.epub_basename)
					{
						links.push({
							rel: EnumLinkRel.ACQUISITION,
							href: new URL([
								novel.pathMain_base,
								novel.cache.epub_basename,
							].join('/'), outputUrl),
							type: EnumMIME.epub,
						})
					}

					if (novel.cache.txt_basename)
					{
						links.push({
							rel: EnumLinkRel.ACQUISITION,
							href: new URL([
								novel.pathMain_base,
								'out',
								novel.cache.txt_basename,
							].join('/'), outputUrl),
							type: EnumMIME.txt,
						})
					}

					if (links.length)
					{
						if (novel.mdconf.novel && novel.mdconf.novel.cover)
						{
							let href = novel.mdconf.novel.cover;

							let type = MIMETypes.lookup(href);

							if (!type || !/image/.test(type))
							{
								type = EnumMIME.jpg;
							}

							links.push({
								rel: EnumLinkRel.IMAGE,
								href,
								type,
							});

							links.push({
								rel: EnumLinkRel.IMAGE_THUMBNAIL,
								href,
								type,
							});
						}

						// @ts-ignore
						let et = OPDSV1.Entry.deserialize<OPDSV1.Entry>({
							title,
							links,
							authors,
							updated: novel.epub_date,
						});

						feed.books.push(et)
					}
				}
			})
		;

		let xml = feed.toXML();
		await fs.outputFile(outputOPDSPath, xml);

		return {
			ret,
			feed,
			xml,
		}
	});
}

export interface INovels2Row
{
	epub_date?: number,
	title?: string,
	titles?: string[],
	authors?: string[],
	list?: IFilterNovelDataPlus[],
}

export type IFilterNovelDataPlus = IFilterNovelData & {
	_index: number,
	update_date: number,
	update_date2: number,
	epub_date: number,
	segment_date: number,
	title: string,
};

function loadNovelStatCache(json: INovelStatCache)
{
	return createFromJSON(json, {
		readonly: true,
	});
}

function toHalfWidthLocaleLowerCase(s: string)
{
	return StrUtil.toHalfWidth(s).toLocaleLowerCase()
}

export function _cache(novelStatJsonPath: string)
{
	return Bluebird.resolve().then(async function ()
	{
		let novelStatCache: NovelStatCache = await fs.readJSON(novelStatJsonPath)
			.then(loadNovelStatCache);

		let datamap = novelStatCache.filterNovel();

		let ret = Object.entries(datamap)
			.reduce(function (data, [pathMain, novels])
			{
				data.pathMains.push(pathMain);

				Object.entries(novels)
					.forEach(function ([novelID, novel])
					{
						novel.cache = novel.cache || {};

						// @ts-ignore
						novel.epub_date = novel.cache.epub_date && createMoment(novel.cache.epub_date)
							.startOf('day')
							.valueOf() || 0;

						// @ts-ignore
						const metaInfo = new NodeNovelInfo(novel.mdconf, {
							throw: false,
							lowCheckLevel: true,
						});

						// @ts-ignore
						novel.title = metaInfo.title(novelID);

						let ks = array_unique([
								novelID,
								...metaInfo.titles(),
								...metaInfo.series_titles(),
							].reduce((a, v) =>
							{
								a.push(toHalfWidthLocaleLowerCase(v));
								a.push(toHalfWidthLocaleLowerCase(slugify(v, true)));

								return a;

							}, [] as string[]).filter(v => v))
						;

						ks
							.forEach(title =>
							{
								data.alias[title] = data.alias[title] || [];

								data.alias[title].push(novel as IFilterNovelDataPlus);
							})
						;

						let alllist = array_unique(array_unique(ks.map(title => data.alias[title])).reduce((ls, list) =>
						{

							ls.push(...list);

							return ls;
						}, []));

						ks
							.forEach(title =>
							{
								data.alias[title] = alllist;
							})
						;

						data.novels.push(novel as IFilterNovelDataPlus);

					})
				;

				return data
			}, {
				pathMains: [] as string[],
				alias: {} as {
					[title: string]: IFilterNovelDataPlus[]
				},
				novels: [] as IFilterNovelDataPlus[],
				authors: [] as string[],
				max_chapter: 0,

				data: datamap,

				novels2: {} as {
					[title: string]: INovels2Row
				},

				novels3: {} as {
					[author: string]: IFilterNovelDataPlus[]
				},

				novelStatCache: novelStatCache,
			})
		;

		ret.novels.forEach(function (novel, index)
		{
			novel._index = index;
		});

		ret.novels = ret.novels.sort(function (a, b)
		{
			return b.epub_date - a.epub_date
		});

		ret.novels2 = array_unique(Object.values(ret.alias))
			.reduce(function (a, ls)
			{
				ls = ls
					.filter(v => v.cache.chapter)
					.sort(function (a, b)
					{
						return b.epub_date - a.epub_date
					})
				;

				if (ls.length)
				{
					let title = ls[0].title;
					let epub_date = ls[0].epub_date;

					let titles: string[] = [];
					let authors: string[] = [];

					ls.forEach(function (novel, index)
					{
						// @ts-ignore
						const metaInfo = new NodeNovelInfo(novel.mdconf, {
							throw: false,
							lowCheckLevel: true,
						});

						if (index == 0)
						{
							title = metaInfo.title(novel.novelID);
						}

						titles.push(...metaInfo.titles());
						authors.push(...metaInfo.authors());

					});

					array_unique_overwrite(titles);
					array_unique_overwrite(authors);

					a.push({
						title,
						titles,
						authors,
						epub_date,
						list: ls,
					});
				}

				return a;
			}, [] as INovels2Row[])
			.sort(function (a, b)
			{
				return b.epub_date - a.epub_date
			})
			.reduce(function (a, data)
			{
				a[data.title] = data;

				return a
			}, {} as {
				[title: string]: INovels2Row
			})
		;

		return ret
	})
}

export default buildOPDS
