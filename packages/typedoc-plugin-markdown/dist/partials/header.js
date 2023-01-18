"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.header = void 0;
const typedoc_1 = require("typedoc");
const els_1 = require("../support/els");
function header(context, page) {
    const md = [];
    if (!context.getOption('hideBreadcrumbs')) {
        md.push(context.partials.breadcrumbs(page));
    }
    if (!context.getOption('hidePageTitle')) {
        const prefix = !page.model.kindOf(typedoc_1.ReflectionKind.SomeModule)
            ? `${page.model.kindString}: `
            : '';
        md.push((0, els_1.heading)(1, prefix + context.partials.reflectionTitle(page.model, true)));
    }
    return md.join('\n\n');
}
exports.header = header;
