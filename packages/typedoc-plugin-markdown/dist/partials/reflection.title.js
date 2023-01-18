"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reflectionTitle = void 0;
const utils_1 = require("../support/utils");
function reflectionTitle(context, reflection, shouldEscape = true) {
    const md = [];
    md.push(shouldEscape ? (0, utils_1.escapeChars)(reflection.name) : reflection.name);
    if (reflection.typeParameters) {
        const typeParameters = reflection.typeParameters
            .map((typeParameter) => typeParameter.name)
            .join(', ');
        md.push(`<${typeParameters}${shouldEscape ? '\\>' : '>'}`);
    }
    return md.join('');
}
exports.reflectionTitle = reflectionTitle;
