"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringEnum = void 0;
function stringEnum(list) {
    return list.reduce((item, key) => {
        item[key] = key;
        return item;
    }, Object.create(null));
}
exports.stringEnum = stringEnum;
