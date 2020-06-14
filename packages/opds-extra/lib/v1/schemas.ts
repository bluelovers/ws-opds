import { EnumLinkRel } from '../const';
import { getOPDSRel } from '../util';
import { ISchema } from 'xml-schema2/lib/types';

export const DATE: ISchema = {
	transform(d: number | string | Date)
	{
		return (new Date(d)).toISOString();
	},
};

export const AUTHOR: ISchema = {
	tag: 'author',
	array: true,
	fields: {
		name: {},
		uri: {},
		email: {},
	},
	map: {
		to: 'name',
	},
};

export const PRICE: ISchema = {
	tag: 'opds:price',
	inner: 'value',
	attributes: {
		currencycode: {},
	},
	map: {
		to: 'value',
	},
};

export const LINK: ISchema = {
	tag: 'link',
	array: true,
	attributes: {
		href: {},
		title: {},
		rel: {
			transform(v: string)
			{
				return getOPDSRel(v)

				//return new URL(v, "http://opds-spec.org/").href;
			},
		},
		type: {},
	},
	fields: {
		price: PRICE,
		//prices: PRICE,
	},
	map: {
		href: 'name',
	},
};

export const CATEGORY: ISchema = {
	tag: 'category',
	array: true,
	attributes: {
		code: {
			name: 'term',
		},
		label: {},
		scheme: {
			default: "http://www.bisg.org/standards/bisac_subject/index.html",
		},
	},
	map: {
		to: 'code',
	},
};

export const CONTENT_BASE: ISchema = {
	inner: 'value',
	cdata: true,
	raw: true,
	/*
	raw(s)
	{
		console.log(s, this, this.value.type);

		if (this.value.type === 'xhtml')
		{
			return true;
		}

		//return !!(this.value.type && this.value.type != 'text');
		return true;
	},
	*/
	attributes: {
		type: {
			default: "text",
		},
	},
	map: {
		to: 'value',
	},
};

export const CONTENT: ISchema = {
	...CONTENT_BASE,
	tag: 'content',
};

export const ENTRY: ISchema = {
	tag: 'entry',
	array: true,
	fields: {
		id: {},
		title: {},
		subtitle: {},
		published: {
			...DATE,
			tag: 'published',
		},
		updated: {
			...DATE,
			tag: 'updated',
		},
		summary: {
			...CONTENT_BASE,
			tag: 'summary',
		},
		links: LINK,
		authors: AUTHOR,
		categories: CATEGORY,
		issued: {
			tag: "dc:issued",
			transform(d: Date)
			{
				return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
			},
		},
		publisher: {
			tag: "dc:publisher",
		},
		language: {
			tag: "dc:language",
		},
		rights: {},
		content: CONTENT,
		identifier: {
			tag: "dc:identifier",
		},
	},
};

export const FEED: ISchema = {
	tag: 'feed',
	attributes: {
		xmlns: {
			default: "http://www.w3.org/2005/Atom",
		},
		xmlnsdc: {
			name: "xmlns:dc",
			default: "http://purl.org/dc/terms/",
		},
		xmlnsopds: {
			name: "xmlns:opds",
			default: "http://opds-spec.org/2010/catalog",
		},
	},
	fields: {
		id: {},
		title: {},
		subtitle: {},
		icon: {},
		logo: {},
		updated: DATE,
		links: LINK,
		authors: AUTHOR,
		books: ENTRY,
	},
};

export default FEED
