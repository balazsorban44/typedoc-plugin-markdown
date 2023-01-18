"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reflection = void 0;
const els_1 = require("../support/els");
const helpers_1 = require("../support/helpers");
function reflection(context, reflection) {
    var _a;
    const md = [];
    const headingLevel = (0, helpers_1.getReflectionHeadingLevel)(reflection) + 1;
    if (reflection.comment) {
        md.push(context.partials.comment(reflection.comment));
    }
    if (reflection.typeParameters) {
        md.push((0, els_1.heading)(headingLevel, 'Type parameters'));
        md.push(context.partials.typeParameters(reflection.typeParameters));
    }
    if (reflection.typeHierarchy) {
        if ((_a = reflection.typeHierarchy) === null || _a === void 0 ? void 0 : _a.next) {
            md.push((0, els_1.heading)(headingLevel, 'Hierarchy'));
            md.push(context.partials.hierarchy(reflection.typeHierarchy));
        }
    }
    if (reflection.implementedTypes) {
        md.push((0, els_1.heading)(headingLevel, 'Implements'));
        md.push((0, els_1.unorderedList)(reflection.implementedTypes.map((implementedType) => context.partials.someType(implementedType))));
    }
    if ('signatures' in reflection && reflection.signatures) {
        md.push((0, els_1.heading)(headingLevel, 'Callable'));
        reflection.signatures.forEach((signature) => {
            md.push((0, els_1.heading)(headingLevel + 1, signature.name));
            md.push(context.partials.signatureMember(signature));
        });
    }
    if ('indexSignature' in reflection && reflection.indexSignature) {
        md.push((0, els_1.heading)(headingLevel, 'Indexable'));
        md.push(context.partials.indexSignatureTitle(reflection.indexSignature));
    }
    md.push(context.partials.toc(reflection));
    md.push(context.partials.members(reflection));
    return md.join('\n\n');
}
exports.reflection = reflection;
