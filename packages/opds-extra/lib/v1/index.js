"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by user on 2019/3/8.
 */
var core_1 = require("./core");
exports.Feed = core_1.Feed;
exports.Entry = core_1.Entry;
exports.Link = core_1.Link;
exports.Author = core_1.Author;
exports.Price = core_1.Price;
exports.EntryCategory = core_1.EntryCategory;
exports.EntryContent = core_1.EntryContent;
const core_2 = require("./core");
exports.parseXML = core_2.Feed.parseXML.bind(core_2.Feed);
exports.parseJSON = core_2.Feed.parseJSON.bind(core_2.Feed);
exports.parseJSONObject = core_2.Feed.deserialize.bind(core_2.Feed);
exports.default = exports;
//# sourceMappingURL=index.js.map