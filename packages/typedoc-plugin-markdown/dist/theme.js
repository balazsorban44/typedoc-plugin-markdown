"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownTheme = void 0;
const path = require("path");
const typedoc_1 = require("typedoc");
const constants_1 = require("./support/constants");
const utils_1 = require("./support/utils");
const theme_context_1 = require("./theme-context");
class MarkdownTheme extends typedoc_1.Theme {
    constructor(renderer) {
        super(renderer);
        this.readmeTemplate = (pageEvent) => {
            return this.getRenderContext().templates.readmeTemplate(pageEvent);
        };
        this.projectTemplate = (pageEvent) => {
            return this.getRenderContext().templates.projectTemplate(pageEvent);
        };
        this.reflectionTemplate = (pageEvent) => {
            return this.getRenderContext().templates.reflectionTemplate(pageEvent);
        };
        this.memberTemplate = (pageEvent) => {
            return this.getRenderContext().templates.memberTemplate(pageEvent);
        };
        this.anchors = {};
        this.listenTo(this.owner, {
            [typedoc_1.PageEvent.BEGIN]: this.onBeginPage,
        });
    }
    getRenderContext() {
        if (!this._renderContext) {
            this._renderContext = new theme_context_1.MarkdownThemeRenderContext(this, this.application.options);
        }
        return this._renderContext;
    }
    render(page) {
        return (0, utils_1.formatContents)(page.template(page));
    }
    getUrls(project) {
        var _a;
        const urls = [];
        const noReadmeFile = this.readme.endsWith('none');
        if (noReadmeFile) {
            project.url = this.entryDocument;
            urls.push(new typedoc_1.UrlMapping(this.entryDocument, project, this.projectTemplate));
        }
        else {
            project.url = this.getRenderContext().globalsFile;
            urls.push(new typedoc_1.UrlMapping(this.getRenderContext().globalsFile, project, this.projectTemplate));
            urls.push(new typedoc_1.UrlMapping(this.entryDocument, project, this.readmeTemplate));
        }
        (_a = project.children) === null || _a === void 0 ? void 0 : _a.forEach((child) => {
            if (child instanceof typedoc_1.DeclarationReflection) {
                if (this.fileStructure === 'modules') {
                    this.buildModuleUrls(child, urls);
                }
                else {
                    this.buildUrls(child, urls);
                }
            }
        });
        return urls;
    }
    buildUrls(reflection, urls) {
        const mapping = this.mappings[reflection.kind];
        if (mapping) {
            if (!reflection.url || !constants_1.URL_PREFIX.test(reflection.url)) {
                let url = [mapping.directory, this.getUrl(reflection) + '.md'].join('/');
                if (this.flattenOutput) {
                    url = url.replace(/\//g, '.');
                }
                urls.push(new typedoc_1.UrlMapping(url, reflection, mapping.template));
                reflection.url = url;
                reflection.hasOwnDocument = true;
            }
            reflection.traverse((child) => {
                if (child instanceof typedoc_1.DeclarationReflection) {
                    this.buildUrls(child, urls);
                }
                else {
                    this.applyAnchorUrl(child, reflection);
                }
                return true;
            });
        }
        else if (reflection.parent) {
            this.applyAnchorUrl(reflection, reflection.parent);
        }
        return urls;
    }
    getUrl(reflection, relative, separator = '.') {
        let url = reflection.getAlias();
        if (reflection.parent &&
            reflection.parent !== relative &&
            !(reflection.parent instanceof typedoc_1.ProjectReflection)) {
            url =
                this.getUrl(reflection.parent, relative, separator) + separator + url;
        }
        return url;
    }
    buildModuleUrls(reflection, urls, parentFragments) {
        const mapping = this.mappings[reflection.kind];
        let fragments;
        if (mapping) {
            const isModuleOrNamespace = reflection.kindOf([
                typedoc_1.ReflectionKind.Module,
                typedoc_1.ReflectionKind.Namespace,
            ]);
            let fragment;
            if (this.symbolsWithOwnFile[0] === 'none') {
                fragment = reflection.getAlias();
            }
            else {
                fragment = !isModuleOrNamespace
                    ? `${mapping.directory}/${reflection.getAlias()}`
                    : reflection.getAlias();
            }
            const entryDoc = path.parse(this.entryDocument).name;
            if (!reflection.url || !constants_1.URL_PREFIX.test(reflection.url)) {
                fragments = [fragment];
                if (parentFragments) {
                    fragments.unshift(parentFragments.join('/'));
                }
                if (isModuleOrNamespace && this.symbolsWithOwnFile[0] !== 'none') {
                    fragments.push(fragment);
                }
                let url = fragments.join('/') + '.md';
                if (this.flattenOutput) {
                    url = url.replace(/\//g, '.');
                }
                urls.push(new typedoc_1.UrlMapping(url, reflection, mapping.template));
                reflection.url = url;
                reflection.hasOwnDocument = true;
            }
            for (const child of reflection.children || []) {
                if (mapping.isLeaf) {
                    this.applyAnchorUrl(child, reflection);
                }
                else {
                    if (fragments[fragments.length - 1] === fragments[fragments.length - 2]) {
                        fragments.pop();
                    }
                    this.buildModuleUrls(child, urls, fragments);
                }
            }
        }
        else if (reflection.parent) {
            this.applyAnchorUrl(reflection, reflection.parent);
        }
        return urls;
    }
    applyAnchorUrl(reflection, container, isSymbol = false) {
        var _a, _b;
        if (container.url &&
            (!reflection.url || !constants_1.URL_PREFIX.test(reflection.url))) {
            const reflectionId = this.preserveAnchorCasing
                ? reflection.name
                : reflection.name.toLowerCase();
            if (isSymbol) {
                this.anchors[container.url]
                    ? this.anchors[container.url].push(reflectionId)
                    : (this.anchors[container.url] = [reflectionId]);
            }
            const count = (_b = (_a = this.anchors[container.url]) === null || _a === void 0 ? void 0 : _a.filter((id) => id === reflectionId)) === null || _b === void 0 ? void 0 : _b.length;
            const anchor = reflectionId + (count > 1 ? '-' + (count - 1).toString() : '');
            reflection.url = container.url + '#' + anchor;
            reflection.anchor = anchor;
            reflection.hasOwnDocument = false;
        }
        reflection.traverse((child) => {
            if (child instanceof typedoc_1.DeclarationReflection) {
                this.applyAnchorUrl(child, container);
            }
        });
    }
    get mappings() {
        const isAll = this.symbolsWithOwnFile.includes('all');
        const mappings = {
            [typedoc_1.ReflectionKind.Module]: {
                isLeaf: false,
                template: this.reflectionTemplate,
                directory: 'modules',
                kind: typedoc_1.ReflectionKind.Module,
                labelSingular: 'Module',
                labelPlural: 'Modules',
            },
            [typedoc_1.ReflectionKind.Namespace]: {
                isLeaf: false,
                template: this.reflectionTemplate,
                directory: 'namespaces',
                kind: typedoc_1.ReflectionKind.Namespace,
                labelSingular: 'Namespace',
                labelPlural: 'Namespaces',
            },
        };
        if (isAll || this.symbolsWithOwnFile.includes('class')) {
            mappings[typedoc_1.ReflectionKind.Class] = {
                isLeaf: false,
                template: this.reflectionTemplate,
                directory: 'classes',
                kind: typedoc_1.ReflectionKind.Class,
                labelSingular: 'Class',
                labelPlural: 'Classes',
            };
        }
        if (isAll || this.symbolsWithOwnFile.includes('interface')) {
            mappings[typedoc_1.ReflectionKind.Interface] = {
                isLeaf: false,
                template: this.reflectionTemplate,
                directory: 'interfaces',
                kind: typedoc_1.ReflectionKind.Interface,
                labelSingular: 'Interface',
                labelPlural: 'Interfaces',
            };
        }
        if (isAll || this.symbolsWithOwnFile.includes('enum')) {
            mappings[typedoc_1.ReflectionKind.Enum] = {
                isLeaf: false,
                template: this.reflectionTemplate,
                directory: 'enums',
                kind: typedoc_1.ReflectionKind.Enum,
                labelSingular: 'Enum',
                labelPlural: 'Enums',
            };
        }
        if (isAll || this.symbolsWithOwnFile.includes('function')) {
            mappings[typedoc_1.ReflectionKind.Function] = {
                isLeaf: true,
                template: this.memberTemplate,
                directory: 'functions',
                kind: typedoc_1.ReflectionKind.Function,
                labelSingular: 'Function',
                labelPlural: 'Functions',
            };
        }
        if (isAll || this.symbolsWithOwnFile.includes('type')) {
            mappings[typedoc_1.ReflectionKind.TypeAlias] = {
                isLeaf: true,
                template: this.memberTemplate,
                directory: 'types',
                kind: typedoc_1.ReflectionKind.TypeAlias,
                labelSingular: 'Type Aliases',
                labelPlural: 'Type Alias',
            };
        }
        if (isAll || this.symbolsWithOwnFile.includes('var')) {
            mappings[typedoc_1.ReflectionKind.Variable] = {
                isLeaf: true,
                template: this.memberTemplate,
                directory: 'variables',
                kind: typedoc_1.ReflectionKind.Variable,
                labelSingular: 'Variable',
                labelPlural: 'Variables',
            };
        }
        return mappings;
    }
    onBeginPage(page) {
        this.getRenderContext().activeLocation = page.url;
    }
}
__decorate([
    (0, typedoc_1.BindOption)('entryDocument')
], MarkdownTheme.prototype, "entryDocument", void 0);
__decorate([
    (0, typedoc_1.BindOption)('entryPoints')
], MarkdownTheme.prototype, "entryPoints", void 0);
__decorate([
    (0, typedoc_1.BindOption)('readme')
], MarkdownTheme.prototype, "readme", void 0);
__decorate([
    (0, typedoc_1.BindOption)('preserveAnchorCasing')
], MarkdownTheme.prototype, "preserveAnchorCasing", void 0);
__decorate([
    (0, typedoc_1.BindOption)('symbolsWithOwnFile')
], MarkdownTheme.prototype, "symbolsWithOwnFile", void 0);
__decorate([
    (0, typedoc_1.BindOption)('fileStructure')
], MarkdownTheme.prototype, "fileStructure", void 0);
__decorate([
    (0, typedoc_1.BindOption)('flattenOutput')
], MarkdownTheme.prototype, "flattenOutput", void 0);
exports.MarkdownTheme = MarkdownTheme;
