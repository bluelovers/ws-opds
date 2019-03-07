/**
 * Created by user on 2019/3/7.
 */
if (process.env && process.env.NODE_ENV !== 'production') {
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