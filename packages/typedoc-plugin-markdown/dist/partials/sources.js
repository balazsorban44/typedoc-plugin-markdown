"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sources = void 0;
const typedoc_1 = require("typedoc");
const els_1 = require("../support/els");
const utils_1 = require("../support/utils");
function sources(context, reflection) {
    const md = [];
    if (reflection.implementationOf) {
        md.push(`${'Implementation of'}: ${typeAndParent(context, reflection.implementationOf)}`);
    }
    if (reflection.inheritedFrom) {
        md.push(`${'Inherited from'}: ${typeAndParent(context, reflection.inheritedFrom)}`);
    }
    if (reflection.overwrites) {
        md.push(`${'Overrides'}:  ${typeAndParent(context, reflection.overwrites)}`);
    }
    if (reflection.sources) {
        const definedInMd = [`${'Defined in'}:`];
        reflection.sources.forEach((source) => {
            if (source.url) {
                definedInMd.push((0, els_1.link)(`${(0, utils_1.escapeChars)(source.fileName)}:${source.line}`, source.url));
            }
            else {
                definedInMd.push(`${(0, utils_1.escapeChars)(source.fileName)}:${source.line}`);
            }
        });
        md.push(definedInMd.join(' '));
    }
    return md.join('\n\n');
}
exports.sources = sources;
const typeAndParent = (context, props) => {
    var _a, _b, _c;
    const getUrl = (name, url) => `[${name}](${context.relativeURL(url)})`;
    if (props) {
        if ('elementType' in props) {
            return typeAndParent(context, props.elementType) + '[]';
        }
        else {
            if (props.reflection) {
                const md = [];
                if (props.reflection instanceof typedoc_1.SignatureReflection) {
                    if ((_b = (_a = props.reflection.parent) === null || _a === void 0 ? void 0 : _a.parent) === null || _b === void 0 ? void 0 : _b.url) {
                        md.push(getUrl(props.reflection.parent.parent.name, props.reflection.parent.parent.url));
                        if (props.reflection.parent.url) {
                            md.push(getUrl(props.reflection.parent.name, props.reflection.parent.url));
                        }
                    }
                }
                else {
                    if ((_c = props.reflection.parent) === null || _c === void 0 ? void 0 : _c.url) {
                        md.push(getUrl(props.reflection.parent.name, props.reflection.parent.url));
                        if (props.reflection.url) {
                            md.push(getUrl(props.reflection.name, props.reflection.url));
                        }
                    }
                }
                return md.length > 0 ? md.join('.') : props.name;
            }
            else {
                return (0, utils_1.escapeChars)(props.toString());
            }
        }
    }
    return 'void';
};
