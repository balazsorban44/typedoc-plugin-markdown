"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.someType = void 0;
const typedoc_1 = require("typedoc");
const els_1 = require("../support/els");
function someType(context, someType, collapse = 'none', emphasis = true) {
    if (!someType) {
        return '';
    }
    if (someType instanceof typedoc_1.ArrayType) {
        return '' + context.partials.arrayType(someType, emphasis);
    }
    if (someType instanceof typedoc_1.ConditionalType) {
        return '' + context.partials.conditionalType(someType);
    }
    if (someType instanceof typedoc_1.IndexedAccessType) {
        return '' + context.partials.indexAccessType(someType);
    }
    if (someType instanceof typedoc_1.InferredType) {
        return '' + context.partials.inferredType(someType);
    }
    if (someType instanceof typedoc_1.IntersectionType && someType.types) {
        return '' + context.partials.intersectionType(someType);
    }
    if (someType instanceof typedoc_1.IntrinsicType && someType.name) {
        return '' + context.partials.intrinsicType(someType, emphasis);
    }
    if (someType instanceof typedoc_1.QueryType) {
        return '' + context.partials.queryType(someType);
    }
    if (someType instanceof typedoc_1.ReferenceType) {
        return '' + context.partials.referenceType(someType);
    }
    if (someType instanceof typedoc_1.ReflectionType) {
        return '' + context.partials.reflectionType(someType, collapse);
    }
    if (someType instanceof typedoc_1.TypeOperatorType) {
        return '' + context.partials.typeOperatorType(someType);
    }
    if (someType instanceof typedoc_1.TupleType && someType.elements) {
        return '' + context.partials.tupleType(someType);
    }
    if (someType instanceof typedoc_1.UnionType && someType.types) {
        return '' + context.partials.unionType(someType, emphasis);
    }
    if (someType instanceof typedoc_1.UnknownType) {
        return '' + context.partials.unknownType(someType);
    }
    return (0, els_1.backTicks)(someType === null || someType === void 0 ? void 0 : someType.toString());
}
exports.someType = someType;
