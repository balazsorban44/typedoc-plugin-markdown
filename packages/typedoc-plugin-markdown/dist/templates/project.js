"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectTemplate = void 0;
const els_1 = require("../support/els");
function projectTemplate(context, page) {
    const md = [];
    md.push((0, els_1.heading)(1, page.project.name));
    md.push(context.partials.toc(page.model));
    md.push(context.partials.members(page.model));
    return md.join('\n\n');
}
exports.projectTemplate = projectTemplate;
