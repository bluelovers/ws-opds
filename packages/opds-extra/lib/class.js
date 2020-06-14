"use strict";
/**
 * Created by user on 2019/3/7.
 */
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
exports.Schema = void 0;
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
    __decorate([
        ta_json_x_1.JsonConstructor(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Base.prototype, "_init", null);
    __decorate([
        ta_json_x_1.BeforeDeserialized(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Base.prototype, "BeforeDeserialized", null);
    Base = __decorate([
        ta_json_x_1.JsonObject(),
        __metadata("design:paramtypes", [Object])
    ], Base);
    Schema.Base = Base;
})(Schema = exports.Schema || (exports.Schema = {}));
exports.default = exports;
//# sourceMappingURL=class.js.map