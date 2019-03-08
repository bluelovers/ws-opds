import _ = require("lodash");
import XMLSchema = require("xml-schema");
import subjects = require("subjects-utils");

import schemas = require('./schemas');
import { Feed } from './core';

const opdsSchema = new XMLSchema(schemas.FEED);

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
