"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.members = void 0;
const els_1 = require("../support/els");
const helpers_1 = require("../support/helpers");
function members(context, container) {
    var _a;
    const md = [];
    if (container.categories && container.categories.length) {
        container.categories
            .filter((category) => !category.allChildrenHaveOwnDocument())
            .forEach((item) => item.children
            .filter((item) => !item.hasOwnDocument)
            .forEach((item) => {
            md.push(context.partials.member(item));
        }));
    }
    else {
        (_a = container.groups) === null || _a === void 0 ? void 0 : _a.filter((group) => !group.allChildrenHaveOwnDocument()).forEach((group, groupIndex) => {
            const headingLevel = (0, helpers_1.getGroupHeadingLevel)(container);
            if (group.categories) {
                group.categories.forEach((groupItem) => groupItem.children.forEach((item) => {
                    md.push(context.partials.member(item));
                }));
            }
            else {
                md.push((0, els_1.heading)(headingLevel, group.title));
                group.children
                    .filter((item) => !item.hasOwnDocument)
                    .forEach((groupChild, index) => {
                    md.push(context.partials.member(groupChild));
                    if (index !== group.children.length - 1) {
                    }
                });
            }
        });
    }
    return md.join('\n\n');
}
exports.members = members;
