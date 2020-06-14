import xmlparse from 'xml-parser';
import { defaultSchema, defaultAttribute } from './utils';
import { each, set, filter, map, extend } from 'lodash';
import { ISchema } from './types';
import { XMLElement } from 'xmlbuilder';

// Using a schema, parse an element
export function parseElement(el, schema: ISchema)
{
	var output = {};
	schema = defaultSchema(schema || {});

	// Extract attributes
	if (schema.attributes)
	{
		each(schema.attributes, function (attr, name)
		{
			attr = defaultAttribute(attr || {});

			var attrName = attr.name || name;
			var value = el.attributes[attrName] || attr.default;

			// Untransform value
			value = attr.untransform(value);

			// Set the value
			set(output, name, value);
		});
	}

	// Extract fields
	if (schema.fields)
	{
		each(schema.fields, function (field, name)
		{
			var value;
			var tagName = field.tag || name;

			// Extract all tags
			var tags = filter(el.children, { name: tagName });

			// Only check that element exists
			if (field.bool)
			{
				value = (tags.length > 0);
			}
			else
			{
				if (tags.length == 0) return;

				// Map tags to values
				var values = map(tags, function (tag)
				{
					return parseElement(tag, field);
				});

				// Normalize to one value if not an array
				if (!field.array)
				{
					value = values.length == 1 ? values[0] : values;
				}
				else
				{
					value = values;
				}
			}

			// Set the value
			if (name == '$')
			{
				extend(output, value);
			}
			else
			{
				set(output, name, value);
			}
		});
	}

	// Extract main value if text node
	if (el.content !== undefined && el.children.length == 0 && schema.text)
	{
		var value = el.content;

		// Untransform value
		value = schema.untransform(value);

		return value;
	}

	return output;
}

export function applySchema(xmlSource: string, schema: ISchema)
{
	const xml = xmlparse(xmlSource);

	// Check that is valid xml
	if (!xml.root) throw "Invalid XML";

	// Check that tag name match
	if (schema.tag != xml.root.name) throw "Tag name doesn't match the schema: " + schema.tag + " != " + xml.root.name;

	return parseElement(xml.root, schema);
}

export default exports as typeof import('./parse')
