import { ISchema } from './types';
import { XMLElement } from 'xmlbuilder';
export declare function createElement(feed: XMLElement, schema: ISchema, value: any): void;
export declare function createAttr(el: XMLElement, schema: ISchema, value: any): void;
export declare function applySchema(el: XMLElement, schema: ISchema, value: any): void;
declare const _default: typeof import("./generate");
export default _default;
