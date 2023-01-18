"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intersectionType = void 0;
function intersectionType(context, model) {
    return model.types
        .map((intersectionType) => context.partials.someType(intersectionType))
        .join(' & ');
}
exports.intersectionType = intersectionType;
