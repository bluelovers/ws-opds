"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const DATE = {
    transform: function (d) {
        return (new Date(d)).toISOString();
    },
};
const AUTHOR = {
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
const PRICE = {
    tag: 'opds:price',
    inner: 'value',
    attributes: {
        currencycode: {},
    },
    map: {
        to: 'value',
    },
};
const LINK = {
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
        price: PRICE,
    },
    map: {
        href: 'name',
    },
};
const CATEGORY = {
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
const CONTENT = {
    tag: 'content',
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
const ENTRY = {
    tag: 'entry',
    array: true,
    fields: {
        id: {},
        title: {},
        updated: DATE,
        summary: {},
        links: LINK,
        authors: AUTHOR,
        categories: CATEGORY,
        issued: {
            tag: "dc:issued",
            transform: function (d) {
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
        content: CONTENT,
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
        icon: {},
        updated: DATE,
        links: LINK,
        authors: AUTHOR,
        books: ENTRY,
    },
};
exports.default = exports.FEED;
//# sourceMappingURL=schemas.js.map