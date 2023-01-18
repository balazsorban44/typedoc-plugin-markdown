"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table = exports.horizontalRule = exports.unorderedList = exports.backTicks = exports.italic = exports.bold = exports.link = exports.heading = void 0;
const heading = (level, text) => `${[...Array(level)].map(() => '#').join('')} ${text}`;
exports.heading = heading;
const link = (label, url) => url ? `[${label}](${url})` : '';
exports.link = link;
const bold = (text) => `**${text}**`;
exports.bold = bold;
const italic = (text) => `*${text}*`;
exports.italic = italic;
const backTicks = (text) => `\`${text}\``;
exports.backTicks = backTicks;
const unorderedList = (items) => items.map((item) => `- ${item}`).join('\n');
exports.unorderedList = unorderedList;
const horizontalRule = () => '\n\n---';
exports.horizontalRule = horizontalRule;
const table = (headers, rows) => `\n| ${headers.join(' | ')} |\n| ${headers
    .map(() => ':------')
    .join(' | ')} |\n${rows.map((row) => `| ${row.join(' | ')} \n`).join('')}`;
exports.table = table;
