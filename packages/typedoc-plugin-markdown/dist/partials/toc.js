"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toc = void 0;
const els_1 = require("../support/els");
const helpers_1 = require("../support/helpers");
const utils_1 = require("../support/utils");
function toc(context, reflection) {
    var _a, _b;
    const md = [];
    const hideInPageTOC = context.getOption('hideInPageTOC');
    const isVisible = (_a = reflection.groups) === null || _a === void 0 ? void 0 : _a.some((group) => group.allChildrenHaveOwnDocument());
    function pushGroup(group, md) {
        const children = group.children.map((child) => `- [${(0, utils_1.escapeChars)(child.name)}](${context.relativeURL(child.url)})`);
        md.push(children.join('\n'));
    }
    if ((!hideInPageTOC && reflection.groups) ||
        (isVisible && reflection.groups)) {
        const headingLevel = (0, helpers_1.getIndexHeadingLevel)(reflection);
        const subHeadingLevel = headingLevel + 1;
        if (!hideInPageTOC) {
            md.push((0, els_1.heading)(headingLevel, 'Index') + '\n\n');
        }
        (_b = reflection.groups) === null || _b === void 0 ? void 0 : _b.forEach((group) => {
            const groupTitle = group.title;
            if (group.categories) {
                group.categories.forEach((category) => {
                    md.push((0, els_1.heading)(subHeadingLevel, `${category.title} ${groupTitle}`) +
                        '\n\n');
                    pushGroup(category, md);
                    md.push('\n');
                });
            }
            else {
                if (!hideInPageTOC || group.allChildrenHaveOwnDocument()) {
                    md.push((0, els_1.heading)(subHeadingLevel, groupTitle) + '\n\n');
                    pushGroup(group, md);
                    md.push('\n');
                }
            }
        });
    }
    return md.length > 0 ? md.join('\n') : '';
}
exports.toc = toc;
