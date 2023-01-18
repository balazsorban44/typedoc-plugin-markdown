"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMemberHeadingLevel = exports.getReflectionHeadingLevel = exports.getGroupHeadingLevel = exports.getIndexHeadingLevel = exports.isConstructor = void 0;
const typedoc_1 = require("typedoc");
const isConstructor = (signature) => {
    var _a;
    return (_a = signature.parent) === null || _a === void 0 ? void 0 : _a.kindOf(typedoc_1.ReflectionKind.Constructor);
};
exports.isConstructor = isConstructor;
function getIndexHeadingLevel(reflection) {
    if (!reflection.kindString) {
        return 2;
    }
    return reflection.hasOwnDocument ? 2 : 3;
}
exports.getIndexHeadingLevel = getIndexHeadingLevel;
function getGroupHeadingLevel(container) {
    if (container.kindOf(typedoc_1.ReflectionKind.Module)) {
        return 1;
    }
    return container.hasOwnDocument ? 2 : 3;
}
exports.getGroupHeadingLevel = getGroupHeadingLevel;
function getReflectionHeadingLevel(reflection) {
    var _a, _b;
    if (reflection.kindOf(typedoc_1.ReflectionKind.Constructor)) {
        return ((_a = reflection.parent) === null || _a === void 0 ? void 0 : _a.hasOwnDocument) ? 3 : 4;
    }
    if (reflection.kindOf([
        typedoc_1.ReflectionKind.Class,
        typedoc_1.ReflectionKind.Interface,
        typedoc_1.ReflectionKind.Function,
        typedoc_1.ReflectionKind.TypeAlias,
        typedoc_1.ReflectionKind.Variable,
    ])) {
        return 2;
    }
    return ((_b = reflection.parent) === null || _b === void 0 ? void 0 : _b.hasOwnDocument) ? 3 : 4;
}
exports.getReflectionHeadingLevel = getReflectionHeadingLevel;
function getMemberHeadingLevel(reflection) {
    return getReflectionHeadingLevel(reflection) + 1;
}
exports.getMemberHeadingLevel = getMemberHeadingLevel;
