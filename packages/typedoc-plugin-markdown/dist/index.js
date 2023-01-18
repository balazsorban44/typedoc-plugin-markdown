"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownThemeRenderContext = exports.MarkdownTheme = exports.load = void 0;
const typedoc_1 = require("typedoc");
const theme_1 = require("./theme");
Object.defineProperty(exports, "MarkdownTheme", { enumerable: true, get: function () { return theme_1.MarkdownTheme; } });
const theme_context_1 = require("./theme-context");
Object.defineProperty(exports, "MarkdownThemeRenderContext", { enumerable: true, get: function () { return theme_context_1.MarkdownThemeRenderContext; } });
function load(app) {
    app.renderer.defineTheme('markdown', theme_1.MarkdownTheme);
    app.options.addReader(new (class {
        constructor() {
            this.priority = 1000;
            this.name = 'markdown-theme-reader';
        }
        read(container) {
            if (container.getValue('theme') === 'default') {
                container.setValue('theme', 'markdown');
            }
        }
    })());
    app.options.addDeclaration({
        name: 'hidePageTitle',
        help: '[Markdown Plugin] Do not render page title.',
        type: typedoc_1.ParameterType.Boolean,
        defaultValue: false,
    });
    app.options.addDeclaration({
        name: 'hideBreadcrumbs',
        help: '[Markdown Plugin] Do not render breadcrumbs in template.',
        type: typedoc_1.ParameterType.Boolean,
        defaultValue: false,
    });
    app.options.addDeclaration({
        name: 'namedAnchors',
        help: '[Markdown Plugin] Use HTML named anchors as fragment identifiers for engines that do not automatically assign header ids. Should be set for Bitbucket Server docs.',
        type: typedoc_1.ParameterType.Boolean,
        defaultValue: false,
    });
    app.options.addDeclaration({
        name: 'entryDocument',
        help: '[Markdown Plugin] The file name of the entry document.',
        type: typedoc_1.ParameterType.String,
        defaultValue: 'README.md',
    });
    app.options.addDeclaration({
        name: 'hideInPageTOC',
        help: '[Markdown Plugin] Do not render in-page table of contents items.',
        type: typedoc_1.ParameterType.Boolean,
        defaultValue: false,
    });
    app.options.addDeclaration({
        name: 'fileStructure',
        help: '[Markdown Plugin] Specifies how the filesystem should be standard. Hierarchical builds directories as per file system.',
        type: typedoc_1.ParameterType.String,
        defaultValue: 'groups',
        validate: (option) => {
            const availableValues = ['modules', 'symbols', 'flat'];
            if (!availableValues.includes(option)) {
                throw new Error(`Unexpected value for fileStructure, the expected value is one of 'modules', 'symbols', 'flat'`);
            }
        },
    });
    app.options.addDeclaration({
        name: 'symbolsWithOwnFile',
        help: "[Markdown Plugin] Specifies which symbols are contained in their own file. Values 'none', 'all' OR Array of ['class', 'interface', 'enum', 'function', 'variable', 'type']",
        type: typedoc_1.ParameterType.String | typedoc_1.ParameterType.Array,
        defaultValue: 'all',
    });
    app.options.addDeclaration({
        name: 'preserveAnchorCasing',
        help: '[Markdown Plugin] Preserve anchor casing when generating links.',
        type: typedoc_1.ParameterType.Boolean,
        defaultValue: false,
    });
    app.options.addDeclaration({
        name: 'flattenOutput',
        help: '[Markdown Plugin] Flatten output files.',
        type: typedoc_1.ParameterType.Boolean,
        defaultValue: false,
    });
    app.options.addDeclaration({
        name: 'typeDeclarationStyle',
        help: '[Markdown Plugin] Specify the Type Declaration Render Style',
        type: typedoc_1.ParameterType.String,
        defaultValue: 'list',
        validate: (option) => {
            const availableValues = ['table', 'list'];
            if (!availableValues.includes(option)) {
                throw new Error(`Unexpected value for typeDeclarationStyle, the expected value is one of 'table', 'list'`);
            }
        },
    });
}
exports.load = load;
__exportStar(require("./models"), exports);
__exportStar(require("./options-reader"), exports);
