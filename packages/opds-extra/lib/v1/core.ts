import { BeforeDeserialized, IParseOptions, JsonElementType, JsonProperty, JsonWriteonly, TaJson } from 'ta-json-x';
import { Schema } from '../class';
import '../debug';
import { EnumEntryContent, EnumLinkRel, EnumMIME, EnumPriceCurrencyCode, REL_BASE_URL } from '../const';
import { getOPDSRel, hrefURL, typedOrObjectList } from '../util';
import moment from "moment";
import xml from "./xml";

// @ts-ignore
export class Price extends Schema.Base<Price.TSTYPE>
{
	@JsonProperty()
	public currencycode: string | EnumPriceCurrencyCode;

	@JsonProperty()
	public value: number;
}

export declare namespace Price
{
	export interface TSTYPE
	{
		currencycode?: string | EnumPriceCurrencyCode,
		value: number,
	}

	export type TSTYPE1 = number;
	export type TSTYPE2 = Price | TSTYPE1 | TSTYPE;
}

// @ts-ignore
export class Link extends Schema.Base<Link.TSTYPE>
{
	protected _href: string | URL;

	@JsonProperty()
	public get href()
	{
		if (typeof this._href === 'string')
		{
			return this._href
		}
		else if (this._href && typeof this._href.href === 'string')
		{
			return this._href.href
		}
	}

	public set href(value: string | URL)
	{
		let r = hrefURL(value);

		if (r != null)
		{
			this._href = r;
		}
	}

	@JsonProperty()
	public rel: string;

	@JsonProperty()
	public title: string | EnumLinkRel;

	@JsonProperty()
	public type: string | EnumMIME;

	protected _price: (Price | number)[];

	@JsonProperty()
	public get price()
	{
		if (this._price != null)
		{
			if (!Array.isArray(this._price))
			{
				return this._price
			}
			else if (this._price.length == 1)
			{
				return this._price[0]
			}
		}

		return;
	}

	@JsonProperty()
	public get prices()
	{
		if (Array.isArray(this._price) && this._price.length > 1)
		{
			return this._price;
		}
	}

	/**
	 * @alias price
	 */
	public set prices(value: Price | number | (Price | number)[])
	{
		this.price = value;
	}

	public set price(value: Price | number | (Price | number)[])
	{
		let r = typedOrObjectList<number, Price>(value, 'number', Price);

		if (r != null)
		{
			this._price = r;
		}
	}

	public getRelFullURL()
	{
		if (this.rel)
		{
			return getOPDSRel(this.rel)
			//return new URL(this.rel, REL_BASE_URL).href
		}
	}

	/**
	 * 語系
	 */
	@JsonProperty()
	hreflang?: string;

	/**
	 * 連結內容的大小，當rel為enclosure時，應該要有此屬性
	 */
	@JsonProperty()
	length?: number;

}

export declare namespace Link
{
	export interface TSTYPE
	{
		href: string | URL;
		rel?: string;
		title?: string | EnumLinkRel;
		type?: string | EnumMIME;
		price?: Price.TSTYPE2 | Price.TSTYPE2[];
		prices?: Price.TSTYPE2 | Price.TSTYPE2[];
		hreflang?: string;
		length?: number;
	}

	export type TSTYPE2 = Link | TSTYPE
}

// @ts-ignore
export class Author extends Schema.Base<Author.TSTYPE>
{
	constructor(value?: Author.TSTYPE2)
	{
		super();

		if (typeof value === 'string')
		{
			this.name = value
		}
		else if (value != null)
		{
			let u: Author;
			u = Author.deserialize<Author>(value);

			if (u._isvaild())
			{
				Object.keys(u).forEach(k =>
				{
					this[k] = u[k];
				})
			}
		}
	}

	@JsonProperty()
	public name: string;

	@JsonProperty()
	public uri?: string;

	@JsonProperty()
	public email?: string;
}

export declare namespace Author
{
	export interface TSTYPE
	{
		name: string;
		uri?: string;
		email?: string;
	}

	export type TSTYPE1 = string
	export type TSTYPE2 = Author | TSTYPE1 | TSTYPE
}

// @ts-ignore
export class EntryContent extends Schema.Base<EntryContent.TSTYPE>
{
	@JsonProperty()
	public type: string | EnumEntryContent;

	@JsonProperty()
	public value: string;
}

export declare namespace EntryContent
{
	export interface TSTYPE
	{
		type: string | EnumEntryContent;
		value: string;
	}

	export type TSTYPE2 = EntryContent | TSTYPE;
}

export class EntryCategory extends Schema.Base<EntryCategory.TSTYPE>
{
	@JsonProperty()
	public term: string;

	@JsonProperty()
	public label?: string;

	@JsonProperty()
	public scheme?: string;

	@JsonProperty()
	@JsonElementType(String)
	@JsonWriteonly()
	public set code(value: string)
	{
		this.term = value;
	}
}

export declare namespace EntryCategory
{
	export type TSTYPE = ({
		code?: string;
		term: string;
	} | {
		code: string;
		term?: string;
	}) & {
		label?: string;
		scheme?: string;
	}

	export type TSTYPE1 = string;
	export type TSTYPE2 = EntryCategory | TSTYPE1 | TSTYPE;
}

// @ts-ignore
export class Entry extends Schema.Base<Entry.TSTYPE>
{
	@JsonProperty()
	public id: string;

	@JsonProperty()
	public identifier: string;

	@JsonProperty()
	public title: string;

	@JsonProperty()
	public subtitle?: string;

	@JsonProperty()
	@JsonElementType(Author)
	public authors?: Author[];

	protected _updated: moment.Moment;

	@JsonProperty()
	public get updated()
	{
		if (this._updated)
		{
			return this._updated.toDate()
		}
	}

	public set updated(_updated: moment.MomentInput)
	{
		this._updated = moment.isMoment(_updated) ? _updated : moment(_updated);
	}

	protected _published: moment.Moment;

	@JsonProperty()
	public get published()
	{
		if (this._published)
		{
			return this._published.toDate()
		}
	}

	public set published(_updated: moment.MomentInput)
	{
		this._published = moment.isMoment(_updated) ? _updated : moment(_updated);
	}

	protected _issued: moment.Moment;

	@JsonProperty()
	public get issued()
	{
		if (this._issued)
		{
			return this._issued.toDate()
		}
	}

	public set issued(_updated: moment.MomentInput)
	{
		this._issued = moment.isMoment(_updated) ? _updated : moment(_updated);
	}

	@JsonProperty()
	@JsonElementType(Link)
	public links: Link[];

	@JsonProperty()
	public summary?: string;

	@JsonProperty()
	public content?: EntryContent;

	protected _categories?: (string | EntryCategory)[];

	@JsonProperty()
	public get categories()
	{
		if (Array.isArray(this._categories) && this._categories.length)
		{
			return this._categories;
		}
	}

	public set categories(value: EntryCategory | string | (EntryCategory | string)[])
	{
		let r = typedOrObjectList<string, EntryCategory>(value, 'string', EntryCategory);

		if (r != null)
		{
			this._categories = r;
		}
	}

	@JsonProperty()
	@JsonElementType(URL)
	@JsonWriteonly()
	public set image(url: string | URL)
	{
		let r = hrefURL(url);

		if (r != null)
		{
			this.links = (this.links || [])
				.filter(v => v.rel != EnumLinkRel.IMAGE)
			;

			let u = new Link();
			u.href = r;
			u.rel = EnumLinkRel.IMAGE;
			u.type = EnumMIME.jpg;

			this.links.push(u);
		}
	}

	@JsonProperty()
	public publisher?: string;

	@JsonProperty()
	public language?: string;

	@JsonProperty()
	public rights?: string;

	@JsonProperty()
	public source?: string;

	addAuthor(value: Author.TSTYPE2)
	{
		let u = new Author(value);

		if (u && u._isvaild())
		{
			this.authors = this.authors || [];
			this.authors.push(u);

			return u;
		}
	}
}

export declare namespace Entry
{
	export interface TSTYPE
	{
		id?: string;
		identifier?: string;
		title: string;
		authors?: Author.TSTYPE2[];
		updated?: moment.MomentInput;
		published?: moment.MomentInput;
		issued?: moment.MomentInput;
		links: Link.TSTYPE2[];
		summary?: string;
		content?: EntryContent.TSTYPE2;
		categories?: EntryCategory.TSTYPE2 | EntryCategory.TSTYPE2[];
		image?: string | URL;
		publisher?: string;
		language?: string;
		rights?: string;
		source?: string;
	}

	export type TSTYPE2 = Entry | TSTYPE
}

// @ts-ignore
export class Feed extends Schema.Base<Feed.TSTYPE>
{

	@BeforeDeserialized()
	protected override BeforeDeserialized()
	{
		this._updated = moment();
	}

	@JsonProperty()
	@JsonElementType(String)
	public id?: string;

	@JsonProperty()
	@JsonElementType(String)
	public title: string;
	@JsonProperty()
	@JsonElementType(String)
	public subtitle: string;

	@JsonProperty()
	@JsonElementType(String)
	public icon?: string;

	@JsonProperty()
	@JsonElementType(String)
	public logo?: string;

	protected _updated: moment.Moment;

	@JsonProperty('updated')
	@JsonElementType(Number)
	public get updated()
	{
		return (this._updated).toDate()
	}

	public set updated(_updated: moment.MomentInput)
	{
		this._updated = moment.isMoment(_updated) ? _updated : moment(_updated);
	}

	@JsonProperty()
	@JsonElementType(Author)
	public authors?: Author[];

	@JsonProperty()
	@JsonElementType(Link)
	public links?: Link[];

	@JsonProperty()
	@JsonElementType(Entry)
	public books?: Entry[];

	addAuthor(value: Author.TSTYPE2)
	{
		let u = new Author(value);

		if (u && u._isvaild())
		{
			this.authors = this.authors || [];
			this.authors.push(u);

			return u;
		}
	}

	toXML()
	{
		return xml.create(this.serialize())
	}

	static parseXML(data: string)
	{
		return this.deserialize(xml.parse(data))
	}

	@JsonProperty()
	@JsonElementType(String)
	public source?: string;

	static override deserialize<T extends Feed, J extends Feed.TSTYPE>(json: J, options?: IParseOptions): T
	{
		// @ts-ignore
		return TaJson.deserialize<T>(json, this, options);
	}

	static parseJSON<T extends Feed>(json: string, options?: IParseOptions): T
	{
		// @ts-ignore
		return TaJson.parse<T>(json, this, options)
	}

}

export declare namespace Feed
{
	export interface TSTYPE
	{
		id?: string;
		title: string;
		subtitle?: string;
		icon?: string;
		updated?: moment.MomentInput;
		authors?: Author.TSTYPE2[];
		links?: Link.TSTYPE2[];
		books?: Entry.TSTYPE2[];
		source?: string;
	}
}
