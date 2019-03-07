import _ = require("lodash");
import XMLSchema = require("xml-schema");
import subjects = require("subjects-utils");

import schemas = require('./lib/schemas');

const opdsSchema = new XMLSchema(schemas.FEED);

// Create an opds feed
export function create(feed): string
{
	return opdsSchema.generate(feed, {
		//version: '1.0',
		//encoding: 'UTF-8',
		standalone: true,
		pretty: true,
	});
}

export function parse(xml)
{
	return opdsSchema.parse(xml);
}


