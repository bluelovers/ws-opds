"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Feed = exports.Entry = exports.EntryCategory = exports.EntryContent = exports.Author = exports.Link = exports.Price = void 0;
const tslib_1 = require("tslib");
const ta_json_x_1 = require("ta-json-x");
const class_1 = require("../class");
require("../debug");
const const_1 = require("../const");
const util_1 = require("../util");
const moment_1 = (0, tslib_1.__importDefault)(require("moment"));
const xml_1 = (0, tslib_1.__importDefault)(require("./xml"));
// @ts-ignore
class Price extends class_1.Schema.Base {
}
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], Price.prototype, "currencycode", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, tslib_1.__metadata)("design:type", Number)
], Price.prototype, "value", void 0);
exports.Price = Price;
// @ts-ignore
class Link extends class_1.Schema.Base {
    get href() {
        if (typeof this._href === 'string') {
            return this._href;
        }
        else if (this._href && typeof this._href.href === 'string') {
            return this._href.href;
        }
    }
    set href(value) {
        let r = (0, util_1.hrefURL)(value);
        if (r != null) {
            this._href = r;
        }
    }
    get price() {
        if (this._price != null) {
            if (!Array.isArray(this._price)) {
                return this._price;
            }
            else if (this._price.length == 1) {
                return this._price[0];
            }
        }
        return;
    }
    get prices() {
        if (Array.isArray(this._price) && this._price.length > 1) {
            return this._price;
        }
    }
    /**
     * @alias price
     */
    set prices(value) {
        this.price = value;
    }
    set price(value) {
        let r = (0, util_1.typedOrObjectList)(value, 'number', Price);
        if (r != null) {
            this._price = r;
        }
    }
    getRelFullURL() {
        if (this.rel) {
            return (0, util_1.getOPDSRel)(this.rel);
            //return new URL(this.rel, REL_BASE_URL).href
        }
    }
}
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, tslib_1.__metadata)("design:type", Object),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], Link.prototype, "href", null);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], Link.prototype, "rel", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], Link.prototype, "title", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], Link.prototype, "type", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, tslib_1.__metadata)("design:type", Object),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], Link.prototype, "price", null);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, tslib_1.__metadata)("design:type", Object),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], Link.prototype, "prices", null);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], Link.prototype, "hreflang", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, tslib_1.__metadata)("design:type", Number)
], Link.prototype, "length", void 0);
exports.Link = Link;
// @ts-ignore
class Author extends class_1.Schema.Base {
    constructor(value) {
        super();
        if (typeof value === 'string') {
            this.name = value;
        }
        else if (value != null) {
            let u;
            u = Author.deserialize(value);
            if (u._isvaild()) {
                Object.keys(u).forEach(k => {
                    this[k] = u[k];
                });
            }
        }
    }
}
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], Author.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], Author.prototype, "uri", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], Author.prototype, "email", void 0);
exports.Author = Author;
// @ts-ignore
class EntryContent extends class_1.Schema.Base {
}
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], EntryContent.prototype, "type", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], EntryContent.prototype, "value", void 0);
exports.EntryContent = EntryContent;
class EntryCategory extends class_1.Schema.Base {
    set code(value) {
        this.term = value;
    }
}
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], EntryCategory.prototype, "term", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], EntryCategory.prototype, "label", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], EntryCategory.prototype, "scheme", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, ta_json_x_1.JsonElementType)(String),
    (0, ta_json_x_1.JsonWriteonly)(),
    (0, tslib_1.__metadata)("design:type", String),
    (0, tslib_1.__metadata)("design:paramtypes", [String])
], EntryCategory.prototype, "code", null);
exports.EntryCategory = EntryCategory;
// @ts-ignore
class Entry extends class_1.Schema.Base {
    get updated() {
        if (this._updated) {
            return this._updated.toDate();
        }
    }
    set updated(_updated) {
        this._updated = moment_1.default.isMoment(_updated) ? _updated : (0, moment_1.default)(_updated);
    }
    get published() {
        if (this._published) {
            return this._published.toDate();
        }
    }
    set published(_updated) {
        this._published = moment_1.default.isMoment(_updated) ? _updated : (0, moment_1.default)(_updated);
    }
    get issued() {
        if (this._issued) {
            return this._issued.toDate();
        }
    }
    set issued(_updated) {
        this._issued = moment_1.default.isMoment(_updated) ? _updated : (0, moment_1.default)(_updated);
    }
    get categories() {
        if (Array.isArray(this._categories) && this._categories.length) {
            return this._categories;
        }
    }
    set categories(value) {
        let r = (0, util_1.typedOrObjectList)(value, 'string', EntryCategory);
        if (r != null) {
            this._categories = r;
        }
    }
    set image(url) {
        let r = (0, util_1.hrefURL)(url);
        if (r != null) {
            this.links = (this.links || [])
                .filter(v => v.rel != const_1.EnumLinkRel.IMAGE);
            let u = new Link();
            u.href = r;
            u.rel = const_1.EnumLinkRel.IMAGE;
            u.type = const_1.EnumMIME.jpg;
            this.links.push(u);
        }
    }
    addAuthor(value) {
        let u = new Author(value);
        if (u && u._isvaild()) {
            this.authors = this.authors || [];
            this.authors.push(u);
            return u;
        }
    }
}
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], Entry.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], Entry.prototype, "identifier", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], Entry.prototype, "title", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], Entry.prototype, "subtitle", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, ta_json_x_1.JsonElementType)(Author),
    (0, tslib_1.__metadata)("design:type", Array)
], Entry.prototype, "authors", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, tslib_1.__metadata)("design:type", Object),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], Entry.prototype, "updated", null);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, tslib_1.__metadata)("design:type", Object),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], Entry.prototype, "published", null);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, tslib_1.__metadata)("design:type", Object),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], Entry.prototype, "issued", null);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, ta_json_x_1.JsonElementType)(Link),
    (0, tslib_1.__metadata)("design:type", Array)
], Entry.prototype, "links", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], Entry.prototype, "summary", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, tslib_1.__metadata)("design:type", EntryContent)
], Entry.prototype, "content", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, tslib_1.__metadata)("design:type", Object),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], Entry.prototype, "categories", null);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, ta_json_x_1.JsonElementType)(URL),
    (0, ta_json_x_1.JsonWriteonly)(),
    (0, tslib_1.__metadata)("design:type", Object),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], Entry.prototype, "image", null);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], Entry.prototype, "publisher", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], Entry.prototype, "language", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], Entry.prototype, "rights", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], Entry.prototype, "source", void 0);
exports.Entry = Entry;
// @ts-ignore
class Feed extends class_1.Schema.Base {
    BeforeDeserialized() {
        this._updated = (0, moment_1.default)();
    }
    get updated() {
        return (this._updated).toDate();
    }
    set updated(_updated) {
        this._updated = moment_1.default.isMoment(_updated) ? _updated : (0, moment_1.default)(_updated);
    }
    addAuthor(value) {
        let u = new Author(value);
        if (u && u._isvaild()) {
            this.authors = this.authors || [];
            this.authors.push(u);
            return u;
        }
    }
    toXML() {
        return xml_1.default.create(this.serialize());
    }
    static parseXML(data) {
        return this.deserialize(xml_1.default.parse(data));
    }
    static deserialize(json, options) {
        // @ts-ignore
        return ta_json_x_1.TaJson.deserialize(json, this, options);
    }
    static parseJSON(json, options) {
        // @ts-ignore
        return ta_json_x_1.TaJson.parse(json, this, options);
    }
}
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.BeforeDeserialized)(),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", void 0)
], Feed.prototype, "BeforeDeserialized", null);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, ta_json_x_1.JsonElementType)(String),
    (0, tslib_1.__metadata)("design:type", String)
], Feed.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, ta_json_x_1.JsonElementType)(String),
    (0, tslib_1.__metadata)("design:type", String)
], Feed.prototype, "title", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, ta_json_x_1.JsonElementType)(String),
    (0, tslib_1.__metadata)("design:type", String)
], Feed.prototype, "subtitle", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, ta_json_x_1.JsonElementType)(String),
    (0, tslib_1.__metadata)("design:type", String)
], Feed.prototype, "icon", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, ta_json_x_1.JsonElementType)(String),
    (0, tslib_1.__metadata)("design:type", String)
], Feed.prototype, "logo", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)('updated'),
    (0, ta_json_x_1.JsonElementType)(Number),
    (0, tslib_1.__metadata)("design:type", Object),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], Feed.prototype, "updated", null);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, ta_json_x_1.JsonElementType)(Author),
    (0, tslib_1.__metadata)("design:type", Array)
], Feed.prototype, "authors", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, ta_json_x_1.JsonElementType)(Link),
    (0, tslib_1.__metadata)("design:type", Array)
], Feed.prototype, "links", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, ta_json_x_1.JsonElementType)(Entry),
    (0, tslib_1.__metadata)("design:type", Array)
], Feed.prototype, "books", void 0);
(0, tslib_1.__decorate)([
    (0, ta_json_x_1.JsonProperty)(),
    (0, ta_json_x_1.JsonElementType)(String),
    (0, tslib_1.__metadata)("design:type", String)
], Feed.prototype, "source", void 0);
exports.Feed = Feed;
//# sourceMappingURL=core.js.map