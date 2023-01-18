"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.declarationType = void 0;
const utils_1 = require("../support/utils");
function declarationType(context, declarationReflection, collapse = 'none') {
    if (collapse === 'object' || collapse === 'all') {
        return `\`object\``;
    }
    if (declarationReflection.indexSignature || declarationReflection.children) {
        let indexSignature = '';
        const declarationIndexSignature = declarationReflection.indexSignature;
        if (declarationIndexSignature) {
            const key = declarationIndexSignature.parameters
                ? declarationIndexSignature.parameters.map((param) => `\`[${param.name}: ${param.type}]\``)
                : '';
            const obj = context.partials.someType(declarationIndexSignature.type);
            indexSignature = `${key}: ${obj}; `;
        }
        const types = declarationReflection.children &&
            declarationReflection.children.map((obj) => {
                return `\`${obj.name}${obj.flags.isOptional ? '?' : ''}\`: ${context.partials.someType(obj.type)} ${obj.defaultValue && obj.defaultValue !== '...'
                    ? `= ${(0, utils_1.escapeChars)(obj.defaultValue)}`
                    : ''}`;
            });
        return `{ ${indexSignature ? indexSignature : ''}${types ? types.join('; ') : ''} }${declarationReflection.defaultValue &&
            declarationReflection.defaultValue !== '...'
            ? `= ${(0, utils_1.escapeChars)(declarationReflection.defaultValue)}`
            : ''}`;
    }
    return '{}';
}
exports.declarationType = declarationType;
