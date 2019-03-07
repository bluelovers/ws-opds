"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("./const");
function typedOrObjectList(inputList, typeA, typeB) {
    if (inputList != null) {
        if (!Array.isArray(inputList)) {
            inputList = [inputList];
        }
        let typeFn;
        if (typeof typeA === 'string') {
            typeFn = (v) => typeof v === typeA;
        }
        else {
            // @ts-ignore
            typeFn = (v) => (v instanceof typeA);
        }
        return inputList.reduce(function (a, v) {
            if (typeFn(v)) {
                a.push(v);
            }
            else if (v != null) {
                let r = typeB.deserialize(v);
                let ls = Object.entries(r.serialize()).filter(r => r[1] != null);
                if (ls.length > 0) {
                    a.push(r);
                }
            }
            return a;
        }, []);
    }
}
exports.typedOrObjectList = typedOrObjectList;
function hrefURL(value) {
    if (typeof value === 'string') {
        return value;
    }
    else if (value && typeof value.href === 'string') {
        return value.href;
    }
}
exports.hrefURL = hrefURL;
function getOPDSRel(value) {
    let v = hrefURL(value);
    if (v != null) {
        let lc = v.toLowerCase();
        if (lc in const_1.EnumLinkRel) {
            return const_1.EnumLinkRel[lc];
        }
        lc = lc.replace('_', '/');
        if (lc in const_1.EnumLinkRel) {
            return const_1.EnumLinkRel[lc];
        }
        lc = lc.replace('/', '_');
        if (lc in const_1.EnumLinkRel) {
            return const_1.EnumLinkRel[lc];
        }
        if (v in const_1.EnumLinkRel) {
            return const_1.EnumLinkRel[v];
        }
        else {
            return v;
        }
    }
}
exports.getOPDSRel = getOPDSRel;
exports.default = exports;
//# sourceMappingURL=util.js.map