"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signatureMember = void 0;
const els_1 = require("../support/els");
const helpers_1 = require("../support/helpers");
function signatureMember(context, signature, parentHeadingLevel) {
    var _a, _b, _c, _d;
    const md = [];
    const headingLevel = parentHeadingLevel || (0, helpers_1.getReflectionHeadingLevel)(signature.parent) + 1;
    const typeDeclaration = (_a = signature.type) === null || _a === void 0 ? void 0 : _a.declaration;
    md.push(context.partials.signatureTitle(signature));
    if (signature.comment) {
        md.push(context.partials.comment(signature.comment));
    }
    if ((_b = signature.typeParameters) === null || _b === void 0 ? void 0 : _b.length) {
        md.push((0, els_1.heading)(headingLevel, 'Type parameters'));
        md.push(context.partials.typeParameters(signature.typeParameters));
    }
    if ((_c = signature.parameters) === null || _c === void 0 ? void 0 : _c.length) {
        md.push((0, els_1.heading)(headingLevel, 'Parameters'));
        md.push(context.partials.parametersTable(signature.parameters));
    }
    if (signature.type) {
        md.push((0, els_1.heading)(headingLevel, 'Returns'));
        md.push(context.partials.someType(signature.type, 'all'));
        if ((_d = signature.comment) === null || _d === void 0 ? void 0 : _d.blockTags.length) {
            const tags = signature.comment.blockTags
                .filter((tag) => tag.tag === '@returns')
                .map((tag) => context.partials.commentParts(tag.content));
            md.push(tags.join('\n\n'));
        }
        if (typeDeclaration === null || typeDeclaration === void 0 ? void 0 : typeDeclaration.signatures) {
            typeDeclaration.signatures.forEach((signature) => {
                md.push(context.partials.signatureMember(signature, headingLevel));
            });
        }
        if (typeDeclaration === null || typeDeclaration === void 0 ? void 0 : typeDeclaration.children) {
            if (context.getOption('typeDeclarationStyle') === 'table') {
                md.push(context.partials.typeDeclarationTable(typeDeclaration.children));
            }
            else {
                md.push(context.partials.typeDeclarationList(typeDeclaration.children));
            }
        }
    }
    md.push(context.partials.sources(signature));
    return md.join('\n\n');
}
exports.signatureMember = signatureMember;
