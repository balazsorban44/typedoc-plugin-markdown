"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reflectionType = void 0;
const typedoc_1 = require("typedoc");
function reflectionType(context, reflectionType, collapse) {
    const root = reflectionType instanceof typedoc_1.ReflectionType
        ? reflectionType.declaration
        : reflectionType;
    if (root.signatures) {
        return collapse === 'function' || collapse === 'all'
            ? `\`fn\``
            : context.partials.functionType(root.signatures);
    }
    return (collapse === 'object' && !root.indexSignature) || collapse === 'all'
        ? `\`object\``
        : context.partials.declarationType(root);
}
exports.reflectionType = reflectionType;
