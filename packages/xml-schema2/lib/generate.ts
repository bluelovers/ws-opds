import { defaultAttribute, defaultSchema, isBasicValue } from './utils';
import { isPlainObject, defaults, fromPairs, result, get, partial, each, isArray } from 'lodash';
import { ISchema } from './types';
import { XMLElement } from 'xmlbuilder';

// Create element and apply shcema
export function createElement(feed: XMLElement, schema: ISchema, value)
{
	if (schema.bool && !value) return;

	var el = feed.ele(schema.tag);
	if (!schema.bool) applySchema(el, schema, value);
}

// Apply an attribute-schema to an element
export function createAttr(el: XMLElement, schema: ISchema, value)
{
	schema = defaultAttribute(schema || {});

	// Apply default value
	if (schema.default !== undefined)
	{
		value = isPlainObject(value) ? defaults(value, schema.default || {}) : (value || schema.default);
	}

	if (value == null) return;

	// Transform value
	value = schema.transform(value);

	// Add attribute
	el.att(schema.name, value);
}

// Apply a schema to an existing element
export function applySchema(el: XMLElement, schema: ISchema, value)
{
	var innerValue;
	schema = defaultSchema(schema || {});

	// Apply default value
	if (schema.default !== undefined)
	{
		value = isPlainObject(value) ? defaults(value, schema.default || {}) : (value || schema.default);
	}

	if (value == null)
	{
		el.remove();
		return;
	}

	// Map value
	if (schema.map.to && isBasicValue(value))
	{
		value = fromPairs([[schema.map.to, value]]);
	}

	// Transform value
	value = schema.transform(value);

	innerValue = value;

	schema.value = value;
	var isText = result(schema, 'text', true);
	var isRaw = result(schema, 'raw', false);
	var isCDATA = result(schema, 'cdata', false);

	// Extract inner value
	if (schema.inner) innerValue = get(innerValue, schema.inner);

	// Add value if string or number
	if (isText && isBasicValue(innerValue))
	{
		if (isCDATA)
		{
			el.dat(innerValue as any);
		}
		else if (isRaw)
		{
			el.raw(innerValue as any);
		}
		else
		{
			el.txt(innerValue as any);
		}
	}

	// Apply attributes
	each(schema.attributes, function (attr, key)
	{
		var val = get(value, key);
		createAttr(el, defaults(attr, {
			name: key,
		}), val);
	});

	// Apply sub-fields
	each(schema.fields, function (field, key)
	{
		// Extract value to use for the field
		var val = key == '$' ? value : get(value, key);

		// Create new element and handle arrays
		if (isArray(val))
		{
			each(val, partial(createElement, el, field));
		}
		else
		{
			createElement(el, defaults(field, {
				tag: key,
			}), val);
		}
	});
}

export default exports as typeof import('./generate')
