"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayType = void 0;
function arrayType(context, arrayType, emphasis) {
    const theType = context.partials.someType(arrayType.elementType, 'none', emphasis);
    return arrayType.elementType.type === 'union'
        ? `(${theType})[]`
        : `${theType}[]`;
}
exports.arrayType = arrayType;
