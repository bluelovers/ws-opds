"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const XMLSchema = require("xml-schema2");
const schemas = require("./schemas");
const opdsSchema = new XMLSchema(schemas.FEED);
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
//# sourceMappingURL=xml.js.map