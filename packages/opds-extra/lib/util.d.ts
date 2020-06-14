import { Schema } from './class';
export declare function typedOrObjectList<A, B extends Schema.Base>(inputList: unknown | unknown[], typeA: A | string, typeB: {
    new (): B;
}): (A | B)[];
export declare function hrefURL(value: string | URL): string;
export declare function getOPDSRel(value: string | URL): string;
declare const _default: typeof import("./util");
export default _default;
