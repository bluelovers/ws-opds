import { identity, defaults, isString, isNumber, isBoolean } from 'lodash';
import { ISchema } from './types';

export function isBasicValue(val)
{
	return isString(val) || isNumber(val) || isBoolean(val);
}

// Default schema
export function defaultSchema(schema: ISchema)
{
	return defaults(schema || {} as ISchema, {
		// Use sub-value as text/raw node
		inner: null,

		// Sub elements fields
		fields: {},

		// Attribute for the element
		attributes: {},

		// Value transformation
		transform: identity,
		untransform: identity,

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
	} as ISchema);
}

// Default attribute
export function defaultAttribute(schema: ISchema): ISchema
{
	return defaults(schema || {} as ISchema, {
		// Value transformation
		transform: identity,
		untransform: identity,

		// Default value
		default: undefined,
	} as ISchema);
}

export default exports as typeof import('./utils')
