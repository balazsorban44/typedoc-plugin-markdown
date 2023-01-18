"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readmeTemplate = void 0;
function readmeTemplate(context, page) {
    const md = [];
    if (page.model.readme) {
        md.push(context.partials.commentParts(page.model.readme));
    }
    return md.join('\n\n');
}
exports.readmeTemplate = readmeTemplate;
