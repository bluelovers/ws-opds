import XMLSchema from "xml-schema2";
import FEED from './schemas';
import { Feed } from './core';

const opdsSchema = new XMLSchema(FEED);

// Create an opds feed
export function create(feed: Feed.TSTYPE): string
{
	return opdsSchema.generate(feed, {
		//version: '1.0',
		//encoding: 'UTF-8',
		standalone: true,
		pretty: true,
	});
}

export function parse(xml: string)
{
	return opdsSchema.parse(xml);
}

export default exports as typeof import('./xml')
