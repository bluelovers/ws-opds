import { ISchema, IOptions } from './types';
export declare class XMLSchema {
    schema: ISchema;
    constructor(schema: ISchema);
    /**
     * Create a xml string from a schema
     */
    generate(value?: any, options?: IOptions, doctype?: any): string;
    /**
     * Parse a xml tring
    */
    parse(xmlSource: string): any;
    static default: typeof XMLSchema;
}
export default XMLSchema;
