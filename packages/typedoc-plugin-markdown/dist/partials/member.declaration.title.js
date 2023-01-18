"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.declarationMemberTitle = void 0;
const typedoc_1 = require("typedoc");
const els_1 = require("../support/els");
const utils_1 = require("../support/utils");
function declarationMemberTitle(context, reflection) {
    var _a;
    const md = [];
    if (reflection.flags &&
        reflection.flags.length > 0 &&
        !reflection.flags.isRest) {
        md.push(reflection.flags.map((flag) => `\`${flag}\``).join(' '));
    }
    md.push(`${reflection.flags.isRest ? '... ' : ''} **${(0, utils_1.escapeChars)(reflection.name)}**`);
    if (reflection instanceof typedoc_1.DeclarationReflection &&
        reflection.typeParameters) {
        md.push(`<${(_a = reflection.typeParameters) === null || _a === void 0 ? void 0 : _a.map((typeParameter) => (0, els_1.backTicks)(typeParameter.name)).join(', ')}\\>`);
    }
    md.push(getType(context, reflection));
    if (!(reflection.type instanceof typedoc_1.LiteralType) &&
        reflection.defaultValue &&
        reflection.defaultValue !== '...') {
        md.push(` = \`${(0, utils_1.stripLineBreaks)((0, utils_1.stripComments)(reflection.defaultValue))}\``);
    }
    return md.join('');
}
exports.declarationMemberTitle = declarationMemberTitle;
function getType(context, reflection) {
    var _a, _b;
    const reflectionType = reflection.type;
    if (reflectionType && ((_a = reflectionType.declaration) === null || _a === void 0 ? void 0 : _a.children)) {
        return ': `object`';
    }
    return ((((_b = reflection.parent) === null || _b === void 0 ? void 0 : _b.kindOf(typedoc_1.ReflectionKind.Enum)) ? ' = ' : ': ') +
        context.partials.someType(reflectionType));
}
