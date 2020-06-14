"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEED = exports.ENTRY = exports.CONTENT = exports.CONTENT_BASE = exports.CATEGORY = exports.LINK = exports.PRICE = exports.AUTHOR = exports.DATE = void 0;
const util_1 = require("../util");
exports.DATE = {
    transform(d) {
        return (new Date(d)).toISOString();
    },
};
exports.AUTHOR = {
    tag: 'author',
    array: true,
    fields: {
        name: {},
        uri: {},
        email: {},
    },
    map: {
        to: 'name',
    },
};
exports.PRICE = {
    tag: 'opds:price',
    inner: 'value',
    attributes: {
        currencycode: {},
    },
    map: {
        to: 'value',
    },
};
exports.LINK = {
    tag: 'link',
    array: true,
    attributes: {
        href: {},
        title: {},
        rel: {
            transform(v) {
                return util_1.getOPDSRel(v);
                //return new URL(v, "http://opds-spec.org/").href;
            },
        },
        type: {},
    },
    fields: {
        price: exports.PRICE,
    },
    map: {
        href: 'name',
    },
};
exports.CATEGORY = {
    tag: 'category',
    array: true,
    attributes: {
        code: {
            name: 'term',
        },
        label: {},
        scheme: {
            default: "http://www.bisg.org/standards/bisac_subject/index.html",
        },
    },
    map: {
        to: 'code',
    },
};
exports.CONTENT_BASE = {
    inner: 'value',
    cdata: true,
    raw: true,
    /*
    raw(s)
    {
        console.log(s, this, this.value.type);

        if (this.value.type === 'xhtml')
        {
            return true;
        }

        //return !!(this.value.type && this.value.type != 'text');
        return true;
    },
    */
    attributes: {
        type: {
            default: "text",
        },
    },
    map: {
        to: 'value',
    },
};
exports.CONTENT = {
    ...exports.CONTENT_BASE,
    tag: 'content',
};
exports.ENTRY = {
    tag: 'entry',
    array: true,
    fields: {
        id: {},
        title: {},
        subtitle: {},
        published: {
            ...exports.DATE,
            tag: 'published',
        },
        updated: {
            ...exports.DATE,
            tag: 'updated',
        },
        summary: {
            ...exports.CONTENT_BASE,
            tag: 'summary',
        },
        links: exports.LINK,
        authors: exports.AUTHOR,
        categories: exports.CATEGORY,
        issued: {
            tag: "dc:issued",
            transform(d) {
                return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
            },
        },
        publisher: {
            tag: "dc:publisher",
        },
        language: {
            tag: "dc:language",
        },
        rights: {},
        content: exports.CONTENT,
        identifier: {
            tag: "dc:identifier",
        },
    },
};
exports.FEED = {
    tag: 'feed',
    attributes: {
        xmlns: {
            default: "http://www.w3.org/2005/Atom",
        },
        xmlnsdc: {
            name: "xmlns:dc",
            default: "http://purl.org/dc/terms/",
        },
        xmlnsopds: {
            name: "xmlns:opds",
            default: "http://opds-spec.org/2010/catalog",
        },
    },
    fields: {
        id: {},
        title: {},
        subtitle: {},
        icon: {},
        logo: {},
        updated: exports.DATE,
        links: exports.LINK,
        authors: exports.AUTHOR,
        books: exports.ENTRY,
    },
};
exports.default = exports.FEED;
//# sourceMappingURL=schemas.js.map