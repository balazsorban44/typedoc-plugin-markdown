"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.breadcrumbs = void 0;
const els_1 = require("../support/els");
function breadcrumbs(context, page) {
    var _a, _b, _c, _d;
    if (page.model) {
        if (page.model.kind) {
            const md = [];
            md.push(page.url === context.globalsFile
                ? page.project.name
                : (0, els_1.link)(page.project.name, context.relativeURL(context.getOption('readme').endsWith('none')
                    ? context.getOption('entryDocument')
                    : context.globalsFile)));
            if (page.model.parent && page.model.parent.parent) {
                if ((_b = (_a = page === null || page === void 0 ? void 0 : page.model) === null || _a === void 0 ? void 0 : _a.parent) === null || _b === void 0 ? void 0 : _b.parent.parent) {
                    md.push(`[${page.model.parent.parent.name}](${context.relativeURL((_d = (_c = page.model) === null || _c === void 0 ? void 0 : _c.parent) === null || _d === void 0 ? void 0 : _d.parent.url)})`);
                }
                md.push(`[${page.model.parent.name}](${context.relativeURL(page.model.parent.url)})`);
            }
            md.push(page.model.name);
            return md.length > 1 ? `${md.join(' / ')}` : '';
        }
    }
    return '';
}
exports.breadcrumbs = breadcrumbs;
