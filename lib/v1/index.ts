import { BeforeDeserialized, JsonElementType, JsonProperty, JsonWriteonly } from 'ta-json-x';
import { Schema } from '../class';
import '../debug';
import { EnumEntryContent, EnumLinkRel, EnumMIME, REL_BASE_URL } from '../const';
import { getOPDSRel, hrefURL, typedOrObjectList } from '../util';
import moment = require("moment");
import opds = require("../..");

export class Price extends Schema.Base
{
	@JsonProperty()
	public currencycode: string;

	@JsonProperty()
	public value: number;
}

export class Link extends Schema.Base
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

export class Author extends Schema.Base<IFeed>
{
	@JsonProperty()
	public name: string;

	@JsonProperty()
	public uri?: string;

	@JsonProperty()
	public email?: string;
}

export class EntryContent extends Schema.Base<IFeed>
{
	@JsonProperty()
	public type: string | EnumEntryContent;

	@JsonProperty()
	public value: string;
}

export class EntryCategory extends Schema.Base<IFeed>
{
	@JsonProperty()
	public term: string;

	@JsonProperty()
	public label?: string;

	@JsonProperty()
	public scheme?: string;
}

export class Entry extends Schema.Base<IFeed>
{
	@JsonProperty()
	public id: string;

	@JsonProperty()
	public identifier: string;

	@JsonProperty()
	public title: string;

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

	protected _categories?: (string|EntryCategory)[];

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
}

export interface IFeed extends Schema.IBaseJSON
{
	id?: string;
	title?: string;
	icon?: string;
}

export class Feed extends Schema.Base<IFeed>
{

	@BeforeDeserialized()
	protected BeforeDeserialized()
	{
		this._updated = moment();
	}

	@JsonProperty()
	public id?: string;

	@JsonProperty()
	public title: string;
	@JsonProperty()
	public subtitle: string;

	@JsonProperty()
	public icon?: string;

	protected _updated: moment.Moment;

	@JsonProperty('updated')
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

	toOPDS()
	{
		return opds.create(this.serialize())
	}

	@JsonProperty()
	public source?: string;
}

export default exports as typeof import('./index');


