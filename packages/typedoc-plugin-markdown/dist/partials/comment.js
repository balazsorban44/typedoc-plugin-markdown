"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comment = void 0;
const utils_1 = require("../support/utils");
function comment(context, comment) {
    var _a, _b;
    const md = [];
    if (((_a = comment.summary) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        md.push(context.partials.commentParts(comment.summary));
    }
    if ((_b = comment.blockTags) === null || _b === void 0 ? void 0 : _b.length) {
        const tags = comment.blockTags
            .filter((tag) => tag.tag !== '@returns')
            .map((tag) => `**\`${(0, utils_1.camelToTitleCase)(tag.tag.substring(1))}\`**\n\n${context.partials.commentParts(tag.content)}`);
        md.push(tags.join('\n\n'));
    }
    return md.join('\n\n');
}
exports.comment = comment;
