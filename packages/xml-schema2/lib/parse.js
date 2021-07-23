"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applySchema = exports.parseElement = void 0;
const tslib_1 = require("tslib");
const xml_parser_1 = (0, tslib_1.__importDefault)(require("xml-parser"));
const utils_1 = require("./utils");
const lodash_1 = require("lodash");
// Using a schema, parse an element
function parseElement(el, schema) {
    var output = {};
    schema = (0, utils_1.defaultSchema)(schema || {});
    // Extract attributes
    if (schema.attributes) {
        (0, lodash_1.each)(schema.attributes, function (attr, name) {
            attr = (0, utils_1.defaultAttribute)(attr || {});
            var attrName = attr.name || name;
            var value = el.attributes[attrName] || attr.default;
            // Untransform value
            value = attr.untransform(value);
            // Set the value
            (0, lodash_1.set)(output, name, value);
        });
    }
    // Extract fields
    if (schema.fields) {
        (0, lodash_1.each)(schema.fields, function (field, name) {
            var value;
            var tagName = field.tag || name;
            // Extract all tags
            var tags = (0, lodash_1.filter)(el.children, { name: tagName });
            // Only check that element exists
            if (field.bool) {
                value = (tags.length > 0);
            }
            else {
                if (tags.length == 0)
                    return;
                // Map tags to values
                var values = (0, lodash_1.map)(tags, function (tag) {
                    return parseElement(tag, field);
                });
                // Normalize to one value if not an array
                if (!field.array) {
                    value = values.length == 1 ? values[0] : values;
                }
                else {
                    value = values;
                }
            }
            // Set the value
            if (name == '$') {
                (0, lodash_1.extend)(output, value);
            }
            else {
                (0, lodash_1.set)(output, name, value);
            }
        });
    }
    // Extract main value if text node
    if (el.content !== undefined && el.children.length == 0 && schema.text) {
        var value = el.content;
        // Untransform value
        value = schema.untransform(value);
        return value;
    }
    return output;
}
exports.parseElement = parseElement;
function applySchema(xmlSource, schema) {
    const xml = (0, xml_parser_1.default)(xmlSource);
    // Check that is valid xml
    if (!xml.root)
        throw "Invalid XML";
    // Check that tag name match
    if (schema.tag != xml.root.name)
        throw "Tag name doesn't match the schema: " + schema.tag + " != " + xml.root.name;
    return parseElement(xml.root, schema);
}
exports.applySchema = applySchema;
exports.default = exports;
//# sourceMappingURL=parse.js.map