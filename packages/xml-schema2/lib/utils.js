"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultAttribute = exports.defaultSchema = exports.isBasicValue = void 0;
const lodash_1 = require("lodash");
function isBasicValue(val) {
    return lodash_1.isString(val) || lodash_1.isNumber(val) || lodash_1.isBoolean(val);
}
exports.isBasicValue = isBasicValue;
// Default schema
function defaultSchema(schema) {
    return lodash_1.defaults(schema || {}, {
        // Use sub-value as text/raw node
        inner: null,
        // Sub elements fields
        fields: {},
        // Attribute for the element
        attributes: {},
        // Value transformation
        transform: lodash_1.identity,
        untransform: lodash_1.identity,
        // Default value
        default: undefined,
        // Map basic value to object
        map: {},
        // Add value as text
        text: true,
        // Use raw node instead of escaped text
        raw: false,
        // Use CDATA instead of raw or text
        cdata: false,
        // Values is supposed to be an array
        array: false,
        // Only check that element exits
        bool: false,
    });
}
exports.defaultSchema = defaultSchema;
// Default attribute
function defaultAttribute(schema) {
    return lodash_1.defaults(schema || {}, {
        // Value transformation
        transform: lodash_1.identity,
        untransform: lodash_1.identity,
        // Default value
        default: undefined,
    });
}
exports.defaultAttribute = defaultAttribute;
exports.default = exports;
//# sourceMappingURL=utils.js.map