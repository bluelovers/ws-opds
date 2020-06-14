
import builder, { XMLElement } from 'xmlbuilder';
import utils from './utils';
import generate from './generate';
import parse from './parse';
import { defaults } from 'lodash';
import { ISchema, IOptions } from './types';

export class XMLSchema
{
	constructor(public schema: ISchema)
	{

	}

	/**
	 * Create a xml string from a schema
	 */
	generate(value?, options?: IOptions, doctype?)
	{
		options = defaults(options || {}, {
			version: '1.0',
			encoding: 'UTF-8',
			standalone: false,
			pretty: false,
		});

		const xml = builder.create(this.schema.tag, {
			version: options.version,
			encoding: options.encoding,
			standalone: options.standalone,
		}, doctype);

		generate.applySchema(xml, this.schema, value || {});

		return xml.end({
			pretty: options.pretty,
		});
	}

	/**
	 * Parse a xml tring
	*/
	parse(xmlSource: string)
	{
		return parse.applySchema(xmlSource, this.schema);
	}

	static default = XMLSchema
}

export default XMLSchema;
