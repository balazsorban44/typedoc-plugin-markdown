"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reflectionTemplate = void 0;
const els_1 = require("../support/els");
const helpers_1 = require("../support/helpers");
function reflectionTemplate(context, page) {
    var _a, _b, _c, _d;
    const md = [];
    md.push(context.partials.header(page));
    const headingLevel = (0, helpers_1.getReflectionHeadingLevel)(page.model);
    if (page.model.comment) {
        md.push(context.partials.comment(page.model.comment));
    }
    if (page.model.typeParameters) {
        md.push((0, els_1.heading)(headingLevel, 'Type parameters'));
        md.push(context.partials.typeParameters(page.model.typeParameters));
    }
    if (page.model.typeHierarchy) {
        if ((_b = (_a = page.model) === null || _a === void 0 ? void 0 : _a.typeHierarchy) === null || _b === void 0 ? void 0 : _b.next) {
            md.push((0, els_1.heading)(headingLevel, 'Hierarchy'));
            md.push(context.partials.hierarchy(page.model.typeHierarchy));
        }
    }
    if ((_c = page.model) === null || _c === void 0 ? void 0 : _c.implementedTypes) {
        md.push((0, els_1.heading)(headingLevel, 'Implements'));
        md.push((0, els_1.unorderedList)(page.model.implementedTypes.map((implementedType) => context.partials.someType(implementedType))));
    }
    if ('signatures' in page.model && ((_d = page.model) === null || _d === void 0 ? void 0 : _d.signatures)) {
        md.push((0, els_1.heading)(headingLevel, 'Callable'));
        page.model.signatures.forEach((signature) => {
            md.push((0, els_1.heading)(headingLevel + 1, signature.name));
            md.push(context.partials.signatureMember(signature));
        });
    }
    if ('indexSignature' in page.model && page.model.indexSignature) {
        md.push((0, els_1.heading)(headingLevel, 'Indexable'));
        md.push(context.partials.indexSignatureTitle(page.model.indexSignature));
    }
    md.push(context.partials.toc(page.model));
    md.push(context.partials.members(page.model));
    return md.join('\n\n');
}
exports.reflectionTemplate = reflectionTemplate;
