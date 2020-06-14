"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.create = void 0;
const xml_schema2_1 = __importDefault(require("xml-schema2"));
const schemas_1 = __importDefault(require("./schemas"));
const opdsSchema = new xml_schema2_1.default(schemas_1.default);
// Create an opds feed
function create(feed) {
    return opdsSchema.generate(feed, {
        //version: '1.0',
        //encoding: 'UTF-8',
        standalone: true,
        pretty: true,
    });
}
exports.create = create;
function parse(xml) {
    return opdsSchema.parse(xml);
}
exports.parse = parse;
exports.default = exports;
//# sourceMappingURL=xml.js.map