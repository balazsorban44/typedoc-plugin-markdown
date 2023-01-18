"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intrinsicType = void 0;
const utils_1 = require("../support/utils");
function intrinsicType(context, model, emphasis) {
    return emphasis ? `\`${model.name}\`` : (0, utils_1.escapeChars)(model.name);
}
exports.intrinsicType = intrinsicType;
