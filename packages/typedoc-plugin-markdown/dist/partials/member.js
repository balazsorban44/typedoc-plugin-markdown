"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.member = void 0;
const typedoc_1 = require("typedoc");
const els_1 = require("../support/els");
const helpers_1 = require("../support/helpers");
function member(context, reflection) {
    const md = [];
    const headingLevel = (0, helpers_1.getReflectionHeadingLevel)(reflection);
    if (context.getOption('namedAnchors')) {
        md.push(`<a id="${reflection.anchor}" name="${reflection.anchor}"></a>`);
    }
    const title = context.partials.reflectionTitle(reflection, false);
    md.push((0, els_1.heading)(headingLevel, (0, els_1.backTicks)(title)));
    if ([
        typedoc_1.ReflectionKind.Class,
        typedoc_1.ReflectionKind.Interface,
        typedoc_1.ReflectionKind.Enum,
    ].includes(reflection.kind)) {
        md.push(context.partials.reflection(reflection));
    }
    else {
        if (reflection.signatures) {
            reflection.signatures.forEach((signature) => {
                if ((0, helpers_1.isConstructor)(signature)) {
                    md.push(context.partials.constructorMember(signature));
                }
                else {
                    md.push(context.partials.signatureMember(signature));
                }
            });
        }
        else {
            if (reflection.hasGetterOrSetter()) {
                if (reflection.getSignature) {
                    md.push(context.partials.signatureMember(reflection.getSignature));
                }
                if (reflection.setSignature) {
                    md.push(context.partials.signatureMember(reflection.setSignature));
                }
            }
            else {
                if (reflection instanceof typedoc_1.ReferenceReflection) {
                    md.push(context.partials.referenceMember(reflection));
                }
                else if (reflection instanceof typedoc_1.DeclarationReflection) {
                    md.push(context.partials.declarationMember(reflection));
                }
            }
        }
    }
    return md.join('\n\n');
}
exports.member = member;
