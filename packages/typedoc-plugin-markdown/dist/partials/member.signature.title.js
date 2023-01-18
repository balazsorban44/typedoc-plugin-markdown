"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signatureTitle = void 0;
function signatureTitle(context, signature, accessor) {
    var _a;
    const md = [];
    if (signature.parent && ((_a = signature.parent.flags) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        md.push(signature.parent.flags.map((flag) => `\`${flag}\``).join(' ') + ' ');
    }
    if (accessor) {
        md.push(accessor + ' ');
    }
    if (!['__call', '__type'].includes(signature.name)) {
        md.push(`**${signature.name}**`);
    }
    if (signature.typeParameters) {
        md.push(`<${signature.typeParameters
            .map((typeParameter) => `\`${typeParameter.name}\``)
            .join(', ')}\\>`);
    }
    const getParameters = (parameters = []) => {
        return parameters
            .map((param) => {
            const isDestructuredParam = param.name == '__namedParameters';
            const paramsmd = [];
            if (param.flags.isRest) {
                paramsmd.push('...');
            }
            const paramItem = `\`${isDestructuredParam ? '«destructured»' : param.name}${param.flags.isOptional || param.defaultValue ? '?' : ''}\`: ${context.partials.someType(param.type, 'all')}`;
            paramsmd.push(paramItem);
            return paramsmd.join('');
        })
            .join(', ');
    };
    md.push(`(${getParameters(signature.parameters)})`);
    if (signature.type) {
        md.push(`: ${context.partials.someType(signature.type, 'object')}`);
    }
    return md.join('');
}
exports.signatureTitle = signatureTitle;
