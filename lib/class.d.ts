/**
 * Created by user on 2019/3/7.
 */
import { IParseOptions } from "ta-json-x";
import "reflect-metadata";
export declare namespace Schema {
    interface IBaseJSON {
        [k: string]: unknown;
    }
    abstract class Base<D extends IBaseJSON = IBaseJSON> {
        constructor(...argv: any[]);
        protected _init(...argv: any[]): void;
        protected BeforeDeserialized(...argv: any[]): void;
        stringify(pretty?: boolean | string): string;
        serialize<T extends D | IBaseJSON>(): T;
        static deserialize<T extends Base, J extends IBaseJSON = Partial<{
            [k in keyof T]?: T[k];
        }>>(json: J, options?: IParseOptions): T;
        static parse<T extends Base>(json: string, options?: IParseOptions): T;
    }
}
declare const _default: typeof import("./class");
export default _default;
