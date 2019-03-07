import { Schema } from '../class';
import '../debug';
import { EnumEntryContent, EnumLinkRel, EnumMIME } from '../const';
import moment = require("moment");
export declare class Price extends Schema.Base {
    currencycode: string;
    value: number;
}
export declare class Link extends Schema.Base {
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
export declare class Author extends Schema.Base<IFeed> {
    name: string;
    uri?: string;
    email?: string;
}
export declare class EntryContent extends Schema.Base<IFeed> {
    type: string | EnumEntryContent;
    value: string;
}
export declare class EntryCategory extends Schema.Base<IFeed> {
    term: string;
    label?: string;
    scheme?: string;
}
export declare class Entry extends Schema.Base<IFeed> {
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
}
export interface IFeed extends Schema.IBaseJSON {
    id?: string;
    title?: string;
    icon?: string;
}
export declare class Feed extends Schema.Base<IFeed> {
    protected BeforeDeserialized(): void;
    id?: string;
    title: string;
    subtitle: string;
    icon?: string;
    protected _updated: moment.Moment;
    updated: moment.MomentInput;
    authors?: Author[];
    links?: Link[];
    books?: Entry[];
    toOPDS(): string;
    source?: string;
}
declare const _default: typeof import(".");
export default _default;
