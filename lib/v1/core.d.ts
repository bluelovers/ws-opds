import { IParseOptions } from 'ta-json-x';
import { Schema } from '../class';
import '../debug';
import { EnumEntryContent, EnumLinkRel, EnumMIME, EnumPriceCurrencyCode } from '../const';
import moment = require("moment");
export declare class Price extends Schema.Base<Price.TSTYPE> {
    currencycode: string | EnumPriceCurrencyCode;
    value: number;
}
export declare namespace Price {
    interface TSTYPE {
        currencycode?: string | EnumPriceCurrencyCode;
        value: number;
    }
    type TSTYPE1 = number;
    type TSTYPE2 = Price | TSTYPE1 | TSTYPE;
}
export declare class Link extends Schema.Base<Link.TSTYPE> {
    protected _href: string | URL;
    href: string | URL;
    rel: string;
    title: string | EnumLinkRel;
    type: string | EnumMIME;
    protected _price: (Price | number)[];
    price: Price | number | (Price | number)[];
    /**
    * @alias price
    */
    prices: Price | number | (Price | number)[];
    getRelFullURL(): string;
    /**
     * 語系
     */
    hreflang?: string;
    /**
     * 連結內容的大小，當rel為enclosure時，應該要有此屬性
     */
    length?: number;
}
export declare namespace Link {
    interface TSTYPE {
        href: string | URL;
        rel?: string;
        title?: string | EnumLinkRel;
        type?: string | EnumMIME;
        price?: Price.TSTYPE2 | Price.TSTYPE2[];
        prices?: Price.TSTYPE2 | Price.TSTYPE2[];
        hreflang?: string;
        length?: number;
    }
    type TSTYPE2 = Link | TSTYPE;
}
export declare class Author extends Schema.Base<Author.TSTYPE> {
    constructor(value?: Author.TSTYPE2);
    name: string;
    uri?: string;
    email?: string;
}
export declare namespace Author {
    interface TSTYPE {
        name: string;
        uri?: string;
        email?: string;
    }
    type TSTYPE1 = string;
    type TSTYPE2 = Author | TSTYPE1 | TSTYPE;
}
export declare class EntryContent extends Schema.Base<EntryContent.TSTYPE> {
    type: string | EnumEntryContent;
    value: string;
}
export declare namespace EntryContent {
    interface TSTYPE {
        type: string | EnumEntryContent;
        value: string;
    }
    type TSTYPE2 = EntryContent | TSTYPE;
}
export declare class EntryCategory extends Schema.Base<EntryCategory.TSTYPE> {
    term: string;
    label?: string;
    scheme?: string;
    code: string;
}
export declare namespace EntryCategory {
    type TSTYPE = ({
        code?: string;
        term: string;
    } | {
        code: string;
        term?: string;
    }) & {
        label?: string;
        scheme?: string;
    };
    type TSTYPE1 = string;
    type TSTYPE2 = EntryCategory | TSTYPE1 | TSTYPE;
}
export declare class Entry extends Schema.Base<Entry.TSTYPE> {
    id: string;
    identifier: string;
    title: string;
    authors?: Author[];
    protected _updated: moment.Moment;
    updated: moment.MomentInput;
    protected _published: moment.Moment;
    published: moment.MomentInput;
    protected _issued: moment.Moment;
    issued: moment.MomentInput;
    links: Link[];
    summary?: string;
    content?: EntryContent;
    protected _categories?: (string | EntryCategory)[];
    categories: EntryCategory | string | (EntryCategory | string)[];
    image: string | URL;
    publisher?: string;
    language?: string;
    rights?: string;
    source?: string;
    addAuthor(value: Author.TSTYPE2): Author;
}
export declare namespace Entry {
    interface TSTYPE {
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
    type TSTYPE2 = Entry | TSTYPE;
}
export declare class Feed extends Schema.Base<Feed.TSTYPE> {
    protected BeforeDeserialized(): void;
    id?: string;
    title: string;
    subtitle: string;
    icon?: string;
    logo?: string;
    protected _updated: moment.Moment;
    updated: moment.MomentInput;
    authors?: Author[];
    links?: Link[];
    books?: Entry[];
    addAuthor(value: Author.TSTYPE2): Author;
    toXML(): string;
    static parseXML(data: string): Feed;
    source?: string;
    static deserialize<T extends Feed, J extends Feed.TSTYPE>(json: J, options?: IParseOptions): T;
    static parseJSON<T extends Feed>(json: string, options?: IParseOptions): T;
}
export declare namespace Feed {
    interface TSTYPE {
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
