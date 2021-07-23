import { ISchema } from './types';
export declare function isBasicValue(val: any): val is string | number | boolean;
export declare function defaultSchema(schema: ISchema): ISchema;
export declare function defaultAttribute(schema: ISchema): ISchema;
declare const _default: typeof import("./utils");
export default _default;
