import opds from "../lib/v1/xml";
import { outputFileSync } from "fs-extra";

let xml = opds.create({
	title: "My Catalog",
	authors: [
		{
			name: "Samy Pesse",
			uri: "https://www.gitbook.com",
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
					price: {
						currencycode: 'USD',
						value: 10,
					},
				},
			],
			categories: [
				"FIC020000",
			],
			content: {
				type: 'xhtml',
				value: "<b>Hello World</b>",
			},
		},
		{
			title: "A book 2",
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
					price: {
						currencycode: 'TWD',
						value: 10,
					},
				},
			],
			categories: [
				"FIC020000",
			],
			content: {
				type: 'text',
				value: "Hello World",
			},
		},
	],
});

console.log(xml);

let data = opds.parse(xml)

console.dir(data, {
	depth: null,
	colors: true,
});

let xml2 = opds.create(data);

//console.log(xml2);

console.log(xml2 === xml);

outputFileSync('./temp/xml1.xml', xml);
outputFileSync('./temp/xml2.xml', xml2);
