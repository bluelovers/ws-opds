"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applySchema = exports.createAttr = exports.createElement = void 0;
const utils_1 = require("./utils");
const lodash_1 = require("lodash");
// Create element and apply shcema
function createElement(feed, schema, value) {
    if (schema.bool && !value)
        return;
    var el = feed.ele(schema.tag);
    if (!schema.bool)
        applySchema(el, schema, value);
}
exports.createElement = createElement;
// Apply an attribute-schema to an element
function createAttr(el, schema, value) {
    schema = utils_1.defaultAttribute(schema || {});
    // Apply default value
    if (schema.default !== undefined) {
        value = lodash_1.isPlainObject(value) ? lodash_1.defaults(value, schema.default || {}) : (value || schema.default);
    }
    if (value == null)
        return;
    // Transform value
    value = schema.transform(value);
    // Add attribute
    el.att(schema.name, value);
}
exports.createAttr = createAttr;
// Apply a schema to an existing element
function applySchema(el, schema, value) {
    var innerValue;
    schema = utils_1.defaultSchema(schema || {});
    // Apply default value
    if (schema.default !== undefined) {
        value = lodash_1.isPlainObject(value) ? lodash_1.defaults(value, schema.default || {}) : (value || schema.default);
    }
    if (value == null) {
        el.remove();
        return;
    }
    // Map value
    if (schema.map.to && utils_1.isBasicValue(value)) {
        value = lodash_1.fromPairs([[schema.map.to, value]]);
    }
    // Transform value
    value = schema.transform(value);
    innerValue = value;
    schema.value = value;
    var isText = lodash_1.result(schema, 'text', true);
    var isRaw = lodash_1.result(schema, 'raw', false);
    var isCDATA = lodash_1.result(schema, 'cdata', false);
    // Extract inner value
    if (schema.inner)
        innerValue = lodash_1.get(innerValue, schema.inner);
    // Add value if string or number
    if (isText && utils_1.isBasicValue(innerValue)) {
        if (isCDATA) {
            el.dat(innerValue);
        }
        else if (isRaw) {
            el.raw(innerValue);
        }
        else {
            el.txt(innerValue);
        }
    }
    // Apply attributes
    lodash_1.each(schema.attributes, function (attr, key) {
        var val = lodash_1.get(value, key);
        createAttr(el, lodash_1.defaults(attr, {
            name: key,
        }), val);
    });
    // Apply sub-fields
    lodash_1.each(schema.fields, function (field, key) {
        // Extract value to use for the field
        var val = key == '$' ? value : lodash_1.get(value, key);
        // Create new element and handle arrays
        if (lodash_1.isArray(val)) {
            lodash_1.each(val, lodash_1.partial(createElement, el, field));
        }
        else {
            createElement(el, lodash_1.defaults(field, {
                tag: key,
            }), val);
        }
    });
}
exports.applySchema = applySchema;
exports.default = exports;
//# sourceMappingURL=generate.js.map