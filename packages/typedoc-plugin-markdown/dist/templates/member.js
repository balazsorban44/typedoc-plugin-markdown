"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberTemplate = void 0;
function memberTemplate(context, page) {
    const md = [];
    md.push(context.partials.header(page));
    md.push(context.partials.member(page.model));
    return md.join('\n\n');
}
exports.memberTemplate = memberTemplate;
