"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKindString = exports.getKindPlural = exports.camelToTitleCase = exports.stripLineBreaks = exports.stripComments = exports.escapeChars = exports.formatContents = void 0;
const typedoc_1 = require("typedoc");
const constants_1 = require("./constants");
function formatContents(contents) {
    return (contents
        .replace(/[\r\n]{3,}/g, '\n\n')
        .replace(/!spaces/g, '')
        .replace(/^\s+|\s+$/g, '') + '\n');
}
exports.formatContents = formatContents;
function escapeChars(str) {
    return str
        .replace(/</g, '<')
        .replace(/_/g, '\\_')
        .replace(/`/g, '\\`')
        .replace(/\|/g, '\\|');
}
exports.escapeChars = escapeChars;
function stripComments(str) {
    return str
        .replace(/(?:\/\*(?:[\s\S]*?)\*\/)|(?:^\s*\/\/(?:.*)$)/g, ' ')
        .replace(/\n/g, '')
        .replace(/^\s+|\s+$|(\s)+/g, '$1');
}
exports.stripComments = stripComments;
function stripLineBreaks(str) {
    return str
        ? str.replace(/\n/g, ' ').replace(/\r/g, ' ').replace(/\t/g, ' ').trim()
        : '';
}
exports.stripLineBreaks = stripLineBreaks;
function camelToTitleCase(text) {
    return (text.substring(0, 1).toUpperCase() +
        text.substring(1).replace(/[a-z][A-Z]/g, (x) => `${x[0]} ${x[1]}`));
}
exports.camelToTitleCase = camelToTitleCase;
function getKindPlural(kind) {
    if (kind in constants_1.PLURALS) {
        return constants_1.PLURALS[kind];
    }
    else {
        return getKindString(kind) + 's';
    }
}
exports.getKindPlural = getKindPlural;
function getKindString(kind) {
    let str = typedoc_1.ReflectionKind[kind];
    str = str.replace(/(.)([A-Z])/g, (_m, a, b) => a + ' ' + b.toLowerCase());
    return str;
}
exports.getKindString = getKindString;
