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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocusaurusTheme = void 0;
const fs = __importStar(require("fs"));
const typedoc_1 = require("typedoc");
const typedoc_plugin_markdown_1 = require("typedoc-plugin-markdown");
const front_matter_1 = require("./front-matter");
const navigation_1 = require("./navigation");
class DocusaurusTheme extends typedoc_plugin_markdown_1.MarkdownTheme {
    constructor(renderer) {
        super(renderer);
        this.writeCategoryYaml = (categoryPath, label, position, collapsed) => {
            const yaml = [`label: "${label}"`];
            if (position !== null) {
                yaml.push(`position: ${position}`);
            }
            if (!collapsed) {
                yaml.push(`collapsed: false`);
            }
            if (fs.existsSync(categoryPath)) {
                fs.writeFileSync(categoryPath + '/_category_.yml', yaml.join('\n'));
            }
        };
        this.listenTo(this.application.renderer, {
            [typedoc_1.PageEvent.END]: this.onPageEnd,
            [typedoc_1.RendererEvent.END]: this.onRendererEnd,
        });
    }
    onPageEnd(page) {
        if (page.contents) {
            page.contents = (0, front_matter_1.prependYAML)(page.contents, this.getYamlItems(page));
        }
    }
    onRendererEnd(renderer) {
        if (this.sidebar.autoConfiguration) {
            this.writeCategoryYaml(renderer.outputDirectory, this.sidebar.categoryLabel, this.sidebar.position, this.sidebar.collapsed);
            this.loopAndWriteCategories(renderer.outputDirectory);
        }
    }
    loopAndWriteCategories(path) {
        const directory = fs.readdirSync(path);
        directory.forEach((segment) => {
            const fullPath = `${path}/${segment}`;
            const isDirectory = fs.lstatSync(fullPath).isDirectory();
            if (isDirectory) {
                const mapping = Object.entries(this.mappings)
                    .filter((entry) => {
                    return entry[1].directory === segment;
                })
                    .map((entry) => entry[1])[0];
                if (mapping) {
                    this.writeCategoryYaml(fullPath, (0, navigation_1.getKindPlural)(mapping.kind), navigation_1.CATEGORY_POSITION[mapping.kind], true);
                }
                this.loopAndWriteCategories(fullPath);
            }
        });
    }
    getYamlItems(page) {
        const sidebarLabel = this.getSidebarLabel(page);
        const sidebarPosition = this.getSidebarPosition(page);
        let items = {};
        if (page.url === this.entryDocument && this.indexSlug) {
            items = { ...items, slug: this.indexSlug };
        }
        if (this.sidebar.autoConfiguration) {
            if (sidebarLabel) {
                items = { ...items, sidebar_label: sidebarLabel };
            }
            if (sidebarPosition) {
                items = { ...items, sidebar_position: parseFloat(sidebarPosition) };
            }
        }
        if (page.url === page.project.url && this.entryPoints.length > 1) {
            items = { ...items, hide_table_of_contents: true };
        }
        items = { ...items, custom_edit_url: null };
        if (this.frontmatter) {
            items = { ...items, ...this.frontmatter };
        }
        return {
            ...items,
        };
    }
    getSidebarLabel(page) {
        const indexLabel = this.sidebar.indexLabel ||
            (this.entryPoints.length > 1 ? 'Table of Contents' : 'Exports');
        if (page.url === this.entryDocument) {
            return page.url === page.project.url
                ? indexLabel
                : this.sidebar.readmeLabel;
        }
        if (page.url === this.globalsFile) {
            return indexLabel;
        }
        return this.sidebar.fullNames ? page.model.getFullName() : page.model.name;
    }
    getSidebarPosition(page) {
        if (page.url === this.entryDocument) {
            return page.url === page.project.url ? '0.5' : '0';
        }
        if (page.url === this.globalsFile) {
            return '0.5';
        }
        if (page.model.getFullName().split('.').length === 1) {
            return '0';
        }
        return null;
    }
    get globalsFile() {
        return 'modules.md';
    }
}
__decorate([
    (0, typedoc_1.BindOption)('sidebar')
], DocusaurusTheme.prototype, "sidebar", void 0);
__decorate([
    (0, typedoc_1.BindOption)('readmeTitle')
], DocusaurusTheme.prototype, "readmeTitle", void 0);
__decorate([
    (0, typedoc_1.BindOption)('indexSlug')
], DocusaurusTheme.prototype, "indexSlug", void 0);
__decorate([
    (0, typedoc_1.BindOption)('includeExtension')
], DocusaurusTheme.prototype, "includeExtension", void 0);
__decorate([
    (0, typedoc_1.BindOption)('frontmatter')
], DocusaurusTheme.prototype, "frontmatter", void 0);
exports.DocusaurusTheme = DocusaurusTheme;
