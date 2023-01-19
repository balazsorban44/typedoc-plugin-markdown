"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prependYAML = void 0;
const prependYAML = (contents, vars) => {
    return contents
        .replace(/^/, toYAML(vars) + '\n\n')
        .replace(/[\r\n]{3,}/g, '\n\n');
};
exports.prependYAML = prependYAML;
const toYAML = (vars) => {
    const yaml = `---
${Object.entries(vars)
        .map(([key, value]) => `${key}: ${typeof value === 'string' ? `"${escapeString(value)}"` : value}`)
        .join('\n')}
---`;
    return yaml;
};
const escapeString = (str) => str.replace(/"/g, '\\"');
