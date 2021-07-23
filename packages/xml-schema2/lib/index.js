"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XMLSchema = void 0;
const tslib_1 = require("tslib");
const xmlbuilder_1 = (0, tslib_1.__importDefault)(require("xmlbuilder"));
const generate_1 = (0, tslib_1.__importDefault)(require("./generate"));
const parse_1 = (0, tslib_1.__importDefault)(require("./parse"));
const lodash_1 = require("lodash");
class XMLSchema {
    constructor(schema) {
        this.schema = schema;
    }
    /**
     * Create a xml string from a schema
     */
    generate(value, options, doctype) {
        options = (0, lodash_1.defaults)(options || {}, {
            version: '1.0',
            encoding: 'UTF-8',
            standalone: false,
            pretty: false,
        });
        const xml = xmlbuilder_1.default.create(this.schema.tag, {
            version: options.version,
            encoding: options.encoding,
            standalone: options.standalone,
        }, doctype);
        generate_1.default.applySchema(xml, this.schema, value || {});
        return xml.end({
            pretty: options.pretty,
        });
    }
    /**
     * Parse a xml tring
    */
    parse(xmlSource) {
        return parse_1.default.applySchema(xmlSource, this.schema);
    }
}
exports.XMLSchema = XMLSchema;
XMLSchema.default = XMLSchema;
exports.default = XMLSchema;
//# sourceMappingURL=index.js.map