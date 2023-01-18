"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructorMember = void 0;
const els_1 = require("../support/els");
const helpers_1 = require("../support/helpers");
function constructorMember(context, signature) {
    var _a, _b;
    const md = [];
    const headingLevel = (0, helpers_1.getReflectionHeadingLevel)(signature);
    md.push(context.partials.signatureTitle(signature));
    if (signature.comment) {
        md.push(context.partials.comment(signature.comment));
    }
    if ((_a = signature.typeParameters) === null || _a === void 0 ? void 0 : _a.length) {
        md.push((0, els_1.heading)(headingLevel, 'Type parameters'));
        md.push(context.partials.typeParameters(signature.typeParameters));
    }
    if ((_b = signature.parameters) === null || _b === void 0 ? void 0 : _b.length) {
        md.push((0, els_1.heading)(headingLevel, 'Parameters'));
        md.push(context.partials.parametersTable(signature.parameters));
    }
    md.push(context.partials.sources(signature));
    return md.join('\n\n');
}
exports.constructorMember = constructorMember;
