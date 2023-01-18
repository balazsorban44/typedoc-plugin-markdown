"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.referenceType = void 0;
const els_1 = require("../support/els");
function referenceType(context, referenceType) {
    var _a;
    if (referenceType.reflection ||
        (referenceType.name && referenceType.typeArguments)) {
        const reflection = [];
        if ((_a = referenceType.reflection) === null || _a === void 0 ? void 0 : _a.url) {
            reflection.push(`[${(0, els_1.backTicks)(referenceType.reflection.name)}](${context.relativeURL(referenceType.reflection.url)})`);
        }
        else {
            reflection.push(referenceType.externalUrl
                ? `[${(0, els_1.backTicks)(referenceType.name)}]( ${referenceType.externalUrl} )`
                : (0, els_1.backTicks)(referenceType.name));
        }
        if (referenceType.typeArguments && referenceType.typeArguments.length > 0) {
            reflection.push(`<${referenceType.typeArguments
                .map((typeArgument) => context.partials.someType(typeArgument))
                .join(', ')}\\>`);
        }
        return reflection.join('');
    }
    return referenceType.externalUrl
        ? `[${(0, els_1.backTicks)(referenceType.name)}]( ${referenceType.externalUrl} )`
        : (0, els_1.backTicks)(referenceType.name);
}
exports.referenceType = referenceType;
