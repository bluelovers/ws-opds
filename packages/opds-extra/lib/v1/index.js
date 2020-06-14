"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJSONObject = exports.parseJSON = exports.parseXML = void 0;
/**
 * Created by user on 2019/3/8.
 */
var core_1 = require("./core");
Object.defineProperty(exports, "Feed", { enumerable: true, get: function () { return core_1.Feed; } });
Object.defineProperty(exports, "Entry", { enumerable: true, get: function () { return core_1.Entry; } });
Object.defineProperty(exports, "Link", { enumerable: true, get: function () { return core_1.Link; } });
Object.defineProperty(exports, "Author", { enumerable: true, get: function () { return core_1.Author; } });
Object.defineProperty(exports, "Price", { enumerable: true, get: function () { return core_1.Price; } });
Object.defineProperty(exports, "EntryCategory", { enumerable: true, get: function () { return core_1.EntryCategory; } });
Object.defineProperty(exports, "EntryContent", { enumerable: true, get: function () { return core_1.EntryContent; } });
const core_2 = require("./core");
exports.parseXML = core_2.Feed.parseXML.bind(core_2.Feed);
exports.parseJSON = core_2.Feed.parseJSON.bind(core_2.Feed);
exports.parseJSONObject = core_2.Feed.deserialize.bind(core_2.Feed);
exports.default = exports;
//# sourceMappingURL=index.js.map