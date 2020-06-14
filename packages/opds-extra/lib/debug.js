/**
 * Created by user on 2019/3/7.
 */
var _a;
if (((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.NODE_ENV) !== 'production') {
    const SymbolInspect = require('symbol.inspect');
    const util = require('util');
    const moment = require("moment");
    util.inspect.defaultOptions.colors = true;
    util.inspect.defaultOptions.showHidden = true;
    moment.fn[SymbolInspect] = function () {
        return `Moment<${this.format()}>`;
    };
}
//# sourceMappingURL=debug.js.map