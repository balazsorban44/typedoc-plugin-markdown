"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unionType = void 0;
function unionType(context, unionType, emphasis) {
    return unionType.types
        .map((unionType) => context.partials.someType(unionType, 'none', emphasis))
        .join(` \\| `);
}
exports.unionType = unionType;
