"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryType = void 0;
function queryType(context, queryType) {
    return `typeof ${context.partials.someType(queryType.queryType)}`;
}
exports.queryType = queryType;
