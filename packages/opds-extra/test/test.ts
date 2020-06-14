import { OPDSV1 } from '../';
import { Feed } from '../lib/v1/core';

import SymbolInspect from 'symbol.inspect';

import util from 'util';
import moment from "moment";

util.inspect.defaultOptions.colors = true;
util.inspect.defaultOptions.showHidden = true;

moment.fn[SymbolInspect] = function ()
{
	return `Moment<${this.format()}>`;
};

let k = Feed.deserialize({
	title: "My Catalog",
	subtitle: "My Catalog subtitle",
	authors: [
		{
			name: "Samy Pesse",
			uri: "https://www.gitbook.com",
		},
	],
	links: [
		{
			rel: "image",
			href: "/book/test.jpg",
			type: "image/jpeg",
		},
		{
			rel: "acquisition/buy",
			href: "/book/test.epub",
			type: "application/epub+zip",
			price: 10,
		},
	],
	books: [
		{
			title: "A book",
			summary: "This is a test book",
			updated: new Date(),
			authors: [
				{
					name: "Aaron O'Mullan",
					uri: "https://www.gitbook.com/@aaron",
				},
			],
			links: [
				{
					rel: "image",
					href: "/book/test.jpg",
					type: "image/jpeg",
				},
				{
					rel: "acquisition/buy",
					href: "/book/test.epub",
					type: "application/epub+zip",
					price: 10,
				},
			],
			categories: [
				"FIC020000",
			],
			content: {
				type: 'xhtml',
				value: "<b>Hello World</b>",
			},

			image: 'https://www.gitbook.com/@aaron',
		},
		{
			title: "A book 2",
			summary: "This is a test book",
			updated: new Date(),
			issued: new Date(),
			authors: [
				{
					name: "Aaron O'Mullan",
					uri: "https://www.gitbook.com/@aaron",
				},
				{
					name: "Aaron O'Mullan",
					uri: "https://www.gitbook.com/@aaron",
				},
				{
					name: "Aaron O'Mullan",
					uri: "https://www.gitbook.com/@aaron",
				},
			],
			links: [
				{
					rel: "image",
					href: "/book/test.jpg",
					type: "image/jpeg",
				},
				{
					rel: "acquisition/buy",
					href: "/book/test.epub",
					type: "application/epub+zip",
					price: {
						currencycode: 'TWD',
						value: 10,
					},
				},
			],
			categories: [
				"FIC020000",
				{
					term: '7777777',
					label: '8888',
				},
				{
					code: '7777777',
					label: '8888',
				},
			],
			content: {
				type: 'text',
				value: "Hello World",
			},
		},
	],
});

k.addAuthor('opop');

k.addAuthor(new OPDSV1.Author({
	name: 'kkkkkkkkkkkk',
}));

console.log(k);

console.dir(k.serialize(), {
	depth: null,
});

console.log(k.stringify());

console.log(k.toXML());
