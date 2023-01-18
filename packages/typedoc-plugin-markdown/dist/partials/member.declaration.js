"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.declarationMember = void 0;
const els_1 = require("../support/els");
const helpers_1 = require("../support/helpers");
function declarationMember(context, declaration) {
    var _a;
    const md = [];
    const headingLevel = (0, helpers_1.getMemberHeadingLevel)(declaration);
    md.push(context.partials.declarationMemberTitle(declaration));
    const typeDeclaration = (_a = declaration.type) === null || _a === void 0 ? void 0 : _a.declaration;
    if (declaration.comment) {
        md.push(context.partials.comment(declaration.comment));
    }
    if (declaration.typeParameters) {
        md.push((0, els_1.heading)(headingLevel, 'Type parameters'));
        md.push(context.partials.typeParameters(declaration.typeParameters));
    }
    if (typeDeclaration === null || typeDeclaration === void 0 ? void 0 : typeDeclaration.indexSignature) {
        md.push(context.partials.indexSignatureTitle(typeDeclaration.indexSignature));
    }
    if (typeDeclaration === null || typeDeclaration === void 0 ? void 0 : typeDeclaration.signatures) {
        md.push((0, els_1.heading)(headingLevel, typeDeclaration.children ? 'Call signature' : 'Type declaration'));
        typeDeclaration.signatures.forEach((signature) => {
            md.push(context.partials.signatureMember(signature, headingLevel + 1));
        });
    }
    if (typeDeclaration === null || typeDeclaration === void 0 ? void 0 : typeDeclaration.children) {
        md.push((0, els_1.heading)(headingLevel, 'Type declaration'));
        if (context.getOption('typeDeclarationStyle') === 'table') {
            md.push(context.partials.typeDeclarationTable(typeDeclaration.children));
        }
        else {
            md.push(context.partials.typeDeclarationList(typeDeclaration.children));
        }
    }
    md.push(context.partials.sources(declaration));
    return md.join('\n\n');
}
exports.declarationMember = declarationMember;
