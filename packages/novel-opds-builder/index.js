"use strict";
/**
 * Created by user on 2019/3/8.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._cache = exports.buildOPDS = void 0;
const cache_loader_1 = require("@node-novel/cache-loader");
const class_1 = require("node-novel-info/class");
const array_hyper_unique_1 = require("array-hyper-unique");
const list_1 = require("cjk-conv/lib/zh/table/list");
const opds_extra_1 = require("opds-extra");
const const_1 = require("opds-extra/lib/const");
const const_2 = require("./lib/const");
const str_util_1 = __importDefault(require("str-util"));
const bluebird_1 = __importDefault(require("bluebird"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const mime_types_1 = __importDefault(require("mime-types"));
/**
 * build OPDS xml from node-novel novel-stat.json
 *
 * @param {string} novelStatJsonPath
 * @param {string} outputOPDSPath
 */
function buildOPDS(novelStatJsonPath, outputOPDSPath) {
    return bluebird_1.default.resolve().then(async function () {
        let ret = await _cache(novelStatJsonPath);
        let siteURL = 'https://demonovel.netlify.com/';
        let feed = opds_extra_1.OPDSV1.Feed.deserialize({
            title: '@node-novel',
            subtitle: siteURL,
            icon: const_2.base64_qrcode,
            links: [
                {
                    rel: const_1.EnumLinkRel.IMAGE,
                    href: const_2.base64_qrcode,
                    type: const_1.EnumMIME.png,
                },
                {
                    rel: const_1.EnumLinkRel.IMAGE_THUMBNAIL,
                    href: const_2.base64_qrcode,
                    type: const_1.EnumMIME.png,
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
        if (!/\/$/.test(outputUrl)) {
            outputUrl += '/';
        }
        feed.books = feed.books || [];
        Object.entries(ret.novels2)
            .forEach(function ([title, data]) {
            let authors = data.authors.reduce(function (a, b) {
                a.push({
                    name: b,
                });
                return a;
            }, []);
            let novel;
            if (data.list.length == 1) {
                novel = data.list[0];
            }
            else {
                novel = data.list[0];
            }
            if (novel) {
                let links = [];
                if (novel.cache.epub_basename) {
                    links.push({
                        rel: const_1.EnumLinkRel.ACQUISITION,
                        href: new URL([
                            novel.pathMain_base,
                            novel.cache.epub_basename,
                        ].join('/'), outputUrl),
                        type: const_1.EnumMIME.epub,
                    });
                }
                if (novel.cache.txt_basename) {
                    links.push({
                        rel: const_1.EnumLinkRel.ACQUISITION,
                        href: new URL([
                            novel.pathMain_base,
                            'out',
                            novel.cache.txt_basename,
                        ].join('/'), outputUrl),
                        type: const_1.EnumMIME.txt,
                    });
                }
                if (links.length) {
                    if (novel.mdconf.novel && novel.mdconf.novel.cover) {
                        let href = novel.mdconf.novel.cover;
                        let type = mime_types_1.default.lookup(href);
                        if (!type || !/image/.test(type)) {
                            type = const_1.EnumMIME.jpg;
                        }
                        links.push({
                            rel: const_1.EnumLinkRel.IMAGE,
                            href,
                            type,
                        });
                        links.push({
                            rel: const_1.EnumLinkRel.IMAGE_THUMBNAIL,
                            href,
                            type,
                        });
                    }
                    // @ts-ignore
                    let et = opds_extra_1.OPDSV1.Entry.deserialize({
                        title,
                        links,
                        authors,
                        updated: novel.epub_date,
                    });
                    feed.books.push(et);
                }
            }
        });
        let xml = feed.toXML();
        await fs_extra_1.default.outputFile(outputOPDSPath, xml);
        return {
            ret,
            feed,
            xml,
        };
    });
}
exports.buildOPDS = buildOPDS;
function loadNovelStatCache(json) {
    return cache_loader_1.createFromJSON(json, {
        readonly: true,
    });
}
function toHalfWidthLocaleLowerCase(s) {
    return str_util_1.default.toHalfWidth(s).toLocaleLowerCase();
}
function _cache(novelStatJsonPath) {
    return bluebird_1.default.resolve().then(async function () {
        let novelStatCache = await fs_extra_1.default.readJSON(novelStatJsonPath)
            .then(loadNovelStatCache);
        let datamap = novelStatCache.filterNovel();
        let ret = Object.entries(datamap)
            .reduce(function (data, [pathMain, novels]) {
            data.pathMains.push(pathMain);
            Object.entries(novels)
                .forEach(function ([novelID, novel]) {
                novel.cache = novel.cache || {};
                // @ts-ignore
                novel.epub_date = novel.cache.epub_date && cache_loader_1.createMoment(novel.cache.epub_date)
                    .startOf('day')
                    .valueOf() || 0;
                // @ts-ignore
                const metaInfo = new class_1.NodeNovelInfo(novel.mdconf, {
                    throw: false,
                    lowCheckLevel: true,
                });
                // @ts-ignore
                novel.title = metaInfo.title(novelID);
                let ks = array_hyper_unique_1.array_unique([
                    novelID,
                    ...metaInfo.titles(),
                    ...metaInfo.series_titles(),
                ].reduce((a, v) => {
                    a.push(toHalfWidthLocaleLowerCase(v));
                    a.push(toHalfWidthLocaleLowerCase(list_1.slugify(v, true)));
                    return a;
                }, []).filter(v => v));
                ks
                    .forEach(title => {
                    data.alias[title] = data.alias[title] || [];
                    data.alias[title].push(novel);
                });
                let alllist = array_hyper_unique_1.array_unique(array_hyper_unique_1.array_unique(ks.map(title => data.alias[title])).reduce((ls, list) => {
                    ls.push(...list);
                    return ls;
                }, []));
                ks
                    .forEach(title => {
                    data.alias[title] = alllist;
                });
                data.novels.push(novel);
            });
            return data;
        }, {
            pathMains: [],
            alias: {},
            novels: [],
            authors: [],
            max_chapter: 0,
            data: datamap,
            novels2: {},
            novels3: {},
            novelStatCache: novelStatCache,
        });
        ret.novels.forEach(function (novel, index) {
            novel._index = index;
        });
        ret.novels = ret.novels.sort(function (a, b) {
            return b.epub_date - a.epub_date;
        });
        ret.novels2 = array_hyper_unique_1.array_unique(Object.values(ret.alias))
            .reduce(function (a, ls) {
            ls = ls
                .filter(v => v.cache.chapter)
                .sort(function (a, b) {
                return b.epub_date - a.epub_date;
            });
            if (ls.length) {
                let title = ls[0].title;
                let epub_date = ls[0].epub_date;
                let titles = [];
                let authors = [];
                ls.forEach(function (novel, index) {
                    // @ts-ignore
                    const metaInfo = new class_1.NodeNovelInfo(novel.mdconf, {
                        throw: false,
                        lowCheckLevel: true,
                    });
                    if (index == 0) {
                        title = metaInfo.title(novel.novelID);
                    }
                    titles.push(...metaInfo.titles());
                    authors.push(...metaInfo.authors());
                });
                array_hyper_unique_1.array_unique_overwrite(titles);
                array_hyper_unique_1.array_unique_overwrite(authors);
                a.push({
                    title,
                    titles,
                    authors,
                    epub_date,
                    list: ls,
                });
            }
            return a;
        }, [])
            .sort(function (a, b) {
            return b.epub_date - a.epub_date;
        })
            .reduce(function (a, data) {
            a[data.title] = data;
            return a;
        }, {});
        return ret;
    });
}
exports._cache = _cache;
exports.default = buildOPDS;
//# sourceMappingURL=index.js.map