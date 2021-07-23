"use strict";
/**
 * Created by user on 2019/3/7.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = void 0;
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
    (0, tslib_1.__decorate)([
        (0, ta_json_x_1.JsonConstructor)(),
        (0, tslib_1.__metadata)("design:type", Function),
        (0, tslib_1.__metadata)("design:paramtypes", [Object]),
        (0, tslib_1.__metadata)("design:returntype", void 0)
    ], Base.prototype, "_init", null);
    (0, tslib_1.__decorate)([
        (0, ta_json_x_1.BeforeDeserialized)(),
        (0, tslib_1.__metadata)("design:type", Function),
        (0, tslib_1.__metadata)("design:paramtypes", [Object]),
        (0, tslib_1.__metadata)("design:returntype", void 0)
    ], Base.prototype, "BeforeDeserialized", null);
    Base = (0, tslib_1.__decorate)([
        (0, ta_json_x_1.JsonObject)(),
        (0, tslib_1.__metadata)("design:paramtypes", [Object])
    ], Base);
    Schema.Base = Base;
})(Schema = exports.Schema || (exports.Schema = {}));
exports.default = exports;
//# sourceMappingURL=class.js.map