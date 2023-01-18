"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hierarchy = void 0;
const els_1 = require("../support/els");
function hierarchy(context, declarationHierarchy) {
    const level = 0;
    const md = [];
    md.push(getHierarchy(context, declarationHierarchy, level).join('\n'));
    return md.join('\n');
}
exports.hierarchy = hierarchy;
function getHierarchy(context, props, level) {
    level = level + 1;
    let md = props.types.map((hierarchyType) => {
        return (getSymbol(level) +
            (props.isTarget
                ? (0, els_1.bold)(hierarchyType.toString())
                : context.partials.someType(hierarchyType, undefined, true)));
    });
    if (props.next) {
        md = [...md, ...getHierarchy(context, props.next, level)];
    }
    return md;
}
function getSymbol(level) {
    if (level === 1) {
        return '- ';
    }
    return level > 1
        ? `${[...Array(level - 1)].map(() => '  ').join('')} - `
        : '';
}
