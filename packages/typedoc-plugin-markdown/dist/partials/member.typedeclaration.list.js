"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDeclarationList = void 0;
const typedoc_1 = require("typedoc");
const els_1 = require("../support/els");
const utils_1 = require("../support/utils");
function typeDeclarationList(context, props) {
    const comments = props.map((param) => { var _a; return !!((_a = param.comment) === null || _a === void 0 ? void 0 : _a.hasVisibleComponent()); });
    const hasComments = !comments.every((value) => !value);
    const flattenParams = (current) => {
        var _a, _b, _c;
        return (_c = (_b = (_a = current.type) === null || _a === void 0 ? void 0 : _a.declaration) === null || _b === void 0 ? void 0 : _b.children) === null || _c === void 0 ? void 0 : _c.reduce((acc, child) => {
            const childObj = {
                ...child,
                name: `${current.name}.${child.name}`,
            };
            return parseParams(childObj, acc);
        }, []);
    };
    const parseParams = (current, acc) => {
        var _a, _b;
        const shouldFlatten = (_b = (_a = current.type) === null || _a === void 0 ? void 0 : _a.declaration) === null || _b === void 0 ? void 0 : _b.children;
        return shouldFlatten
            ? [...acc, current, ...flattenParams(current)]
            : [...acc, current];
    };
    const properties = props.reduce((acc, current) => parseParams(current, acc), []);
    const items = properties.map((property) => {
        var _a;
        const propertyType = getPropertyType(property);
        const md = [];
        const name = property.name.match(/[\\`\\|]/g) !== null
            ? (0, utils_1.escapeChars)(getName(context, property))
            : getName(context, property);
        const isParent = ((_a = name.split('.')) === null || _a === void 0 ? void 0 : _a.length) === 1;
        if (hasComments) {
            const comments = getComments(property);
            if (comments) {
                md.push((isParent ? '' : '  ') + context.partials.comment(comments));
            }
            md.push('\n\n');
        }
        md.push(`${isParent ? '' : '  '}- ${(0, els_1.backTicks)(name)}: ${context.partials.someType(propertyType, isParent ? 'object' : 'none')}`);
        return md.join('\n');
    });
    const output = items.join('\n\n');
    return output;
}
exports.typeDeclarationList = typeDeclarationList;
function getPropertyType(property) {
    if (property.getSignature) {
        return property.getSignature.type;
    }
    if (property.setSignature) {
        return property.setSignature.type;
    }
    return property.type ? property.type : property;
}
function getName(context, property) {
    var _a;
    const md = [];
    if (property.flags.isRest) {
        md.push('...');
    }
    if (property.getSignature) {
        md.push(`get ${property.getSignature.name}()`);
    }
    else if (property.setSignature) {
        md.push(`set ${property.setSignature.name}(${(_a = property.setSignature.parameters) === null || _a === void 0 ? void 0 : _a.map((parameter) => {
            return parameter.type
                ? `${parameter.name}:${context.partials.someType(parameter.type, 'all', false)}`
                : '';
        })})`);
    }
    else {
        md.push(property.name);
    }
    if (property.flags.isOptional) {
        md.push('?');
    }
    return md.join('');
}
function getComments(property) {
    var _a, _b, _c;
    if (property.type instanceof typedoc_1.ReflectionType) {
        if ((_b = (_a = property.type) === null || _a === void 0 ? void 0 : _a.declaration) === null || _b === void 0 ? void 0 : _b.signatures) {
            return (_c = property.type) === null || _c === void 0 ? void 0 : _c.declaration.signatures[0].comment;
        }
    }
    if (property.signatures) {
        return property.signatures[0].comment;
    }
    return property.comment;
}
