/**
 * Created by user on 2019/3/7.
 */
import { IParseOptions } from "ta-json-x";
import "reflect-metadata";
export declare namespace Schema {
    abstract class Base<D extends Base.TSTYPE = Base.TSTYPE> {
        constructor(...argv: any[]);
        protected _init(...argv: any[]): void;
        protected BeforeDeserialized(...argv: any[]): void;
        stringify(pretty?: boolean | string): string;
        serialize<T extends D | Base.TSTYPE>(): T;
        static deserialize<T extends Base>(json: Partial<T>, options?: IParseOptions): T;
        static deserialize<T extends Base, J extends Base.TSTYPE | Partial<T>>(json: J, options?: IParseOptions): T & Base;
        static parse<T extends Base>(json: string, options?: IParseOptions): T;
        _isvaild(): boolean;
    }
    namespace Base {
        interface TSTYPE {
            [k: string]: unknown;
        }
    }
}
declare const _default: typeof import("./class");
export default _default;
