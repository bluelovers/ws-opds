"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const ta_json_x_1 = require("ta-json-x");
const class_1 = require("../class");
require("../debug");
const const_1 = require("../const");
const util_1 = require("../util");
const moment = require("moment");
const opds = require("../..");
class Price extends class_1.Schema.Base {
}
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", String)
], Price.prototype, "currencycode", void 0);
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", Number)
], Price.prototype, "value", void 0);
exports.Price = Price;
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
        let r = util_1.hrefURL(value);
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
        let r = util_1.typedOrObjectList(value, 'number', Price);
        if (r != null) {
            this._price = r;
        }
    }
    getRelFullURL() {
        if (this.rel) {
            return util_1.getOPDSRel(this.rel);
            //return new URL(this.rel, REL_BASE_URL).href
        }
    }
}
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Link.prototype, "href", null);
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", String)
], Link.prototype, "rel", void 0);
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", String)
], Link.prototype, "title", void 0);
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", String)
], Link.prototype, "type", void 0);
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Link.prototype, "price", null);
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Link.prototype, "prices", null);
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", String)
], Link.prototype, "hreflang", void 0);
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", Number)
], Link.prototype, "length", void 0);
exports.Link = Link;
class Author extends class_1.Schema.Base {
}
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", String)
], Author.prototype, "name", void 0);
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", String)
], Author.prototype, "uri", void 0);
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", String)
], Author.prototype, "email", void 0);
exports.Author = Author;
class EntryContent extends class_1.Schema.Base {
}
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", String)
], EntryContent.prototype, "type", void 0);
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", String)
], EntryContent.prototype, "value", void 0);
exports.EntryContent = EntryContent;
class EntryCategory extends class_1.Schema.Base {
}
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", String)
], EntryCategory.prototype, "term", void 0);
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", String)
], EntryCategory.prototype, "label", void 0);
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", String)
], EntryCategory.prototype, "scheme", void 0);
exports.EntryCategory = EntryCategory;
class Entry extends class_1.Schema.Base {
    get updated() {
        if (this._updated) {
            return this._updated.toDate();
        }
    }
    set updated(_updated) {
        this._updated = moment.isMoment(_updated) ? _updated : moment(_updated);
    }
    get published() {
        if (this._published) {
            return this._published.toDate();
        }
    }
    set published(_updated) {
        this._published = moment.isMoment(_updated) ? _updated : moment(_updated);
    }
    get issued() {
        if (this._issued) {
            return this._issued.toDate();
        }
    }
    set issued(_updated) {
        this._issued = moment.isMoment(_updated) ? _updated : moment(_updated);
    }
    get categories() {
        if (Array.isArray(this._categories) && this._categories.length) {
            return this._categories;
        }
    }
    set categories(value) {
        let r = util_1.typedOrObjectList(value, 'string', EntryCategory);
        if (r != null) {
            this._categories = r;
        }
    }
    set image(url) {
        let r = util_1.hrefURL(url);
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
}
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", String)
], Entry.prototype, "id", void 0);
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", String)
], Entry.prototype, "identifier", void 0);
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", String)
], Entry.prototype, "title", void 0);
__decorate([
    ta_json_x_1.JsonProperty(),
    ta_json_x_1.JsonElementType(Author),
    __metadata("design:type", Array)
], Entry.prototype, "authors", void 0);
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Entry.prototype, "updated", null);
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Entry.prototype, "published", null);
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Entry.prototype, "issued", null);
__decorate([
    ta_json_x_1.JsonProperty(),
    ta_json_x_1.JsonElementType(Link),
    __metadata("design:type", Array)
], Entry.prototype, "links", void 0);
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", String)
], Entry.prototype, "summary", void 0);
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", EntryContent)
], Entry.prototype, "content", void 0);
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Entry.prototype, "categories", null);
__decorate([
    ta_json_x_1.JsonProperty(),
    ta_json_x_1.JsonElementType(URL),
    ta_json_x_1.JsonWriteonly(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Entry.prototype, "image", null);
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", String)
], Entry.prototype, "publisher", void 0);
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", String)
], Entry.prototype, "language", void 0);
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", String)
], Entry.prototype, "rights", void 0);
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", String)
], Entry.prototype, "source", void 0);
exports.Entry = Entry;
class Feed extends class_1.Schema.Base {
    BeforeDeserialized() {
        this._updated = moment();
    }
    get updated() {
        return (this._updated).toDate();
    }
    set updated(_updated) {
        this._updated = moment.isMoment(_updated) ? _updated : moment(_updated);
    }
    toOPDS() {
        return opds.create(this.serialize());
    }
}
__decorate([
    ta_json_x_1.BeforeDeserialized(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Feed.prototype, "BeforeDeserialized", null);
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", String)
], Feed.prototype, "id", void 0);
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", String)
], Feed.prototype, "title", void 0);
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", String)
], Feed.prototype, "subtitle", void 0);
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", String)
], Feed.prototype, "icon", void 0);
__decorate([
    ta_json_x_1.JsonProperty('updated'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], Feed.prototype, "updated", null);
__decorate([
    ta_json_x_1.JsonProperty(),
    ta_json_x_1.JsonElementType(Author),
    __metadata("design:type", Array)
], Feed.prototype, "authors", void 0);
__decorate([
    ta_json_x_1.JsonProperty(),
    ta_json_x_1.JsonElementType(Link),
    __metadata("design:type", Array)
], Feed.prototype, "links", void 0);
__decorate([
    ta_json_x_1.JsonProperty(),
    ta_json_x_1.JsonElementType(Entry),
    __metadata("design:type", Array)
], Feed.prototype, "books", void 0);
__decorate([
    ta_json_x_1.JsonProperty(),
    __metadata("design:type", String)
], Feed.prototype, "source", void 0);
exports.Feed = Feed;
exports.default = exports;
//# sourceMappingURL=index.js.map