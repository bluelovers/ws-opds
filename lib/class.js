"use strict";
/**
 * Created by user on 2019/3/7.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ta_json_x_1 = require("ta-json-x");
require("reflect-metadata");
var Schema;
(function (Schema) {
    let Base = class Base {
        constructor(...argv) {
            this._init(...argv);
        }
        _init(...argv) {
            if (this.BeforeDeserialized) {
                this.BeforeDeserialized(...argv);
            }
        }
        BeforeDeserialized(...argv) { }
        ;
        stringify(pretty) {
            if (pretty === false) {
                pretty = '';
            }
            if (typeof pretty !== 'string') {
                pretty = '\t';
            }
            return JSON.stringify(this.serialize(), null, pretty);
        }
        serialize() {
            return ta_json_x_1.TaJson.serialize(this);
        }
        static deserialize(json, options) {
            return ta_json_x_1.TaJson.deserialize(json, this, options);
        }
        static parse(json, options) {
            return ta_json_x_1.TaJson.parse(json, this, options);
        }
        _isvaild() {
            let ls = Object.entries(this.serialize()).filter(r => r[1] != null);
            return ls.length > 0;
        }
    };
    tslib_1.__decorate([
        ta_json_x_1.JsonConstructor()
    ], Base.prototype, "_init", null);
    tslib_1.__decorate([
        ta_json_x_1.BeforeDeserialized()
    ], Base.prototype, "BeforeDeserialized", null);
    Base = tslib_1.__decorate([
        ta_json_x_1.JsonObject()
    ], Base);
    Schema.Base = Base;
})(Schema = exports.Schema || (exports.Schema = {}));
exports.default = exports;
//# sourceMappingURL=class.js.map