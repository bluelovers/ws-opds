import { EnumLinkRel } from '../const';
import { getOPDSRel } from '../util';

const DATE = {
	transform: function (d)
	{
		return (new Date(d)).toISOString();
	},
};

const AUTHOR = {
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

const PRICE = {
	tag: 'opds:price',
	inner: 'value',
	attributes: {
		currencycode: {},
	},
	map: {
		to: 'value',
	},
};

const LINK = {
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

const CATEGORY = {
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

const CONTENT_BASE = {
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

const CONTENT = {
	...CONTENT_BASE,
	tag: 'content',
};

const ENTRY = {
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
			transform: function (d)
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

export const FEED = {
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
