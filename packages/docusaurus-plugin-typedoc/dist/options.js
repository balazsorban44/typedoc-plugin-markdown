"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPluginOptions = void 0;
const DEFAULT_PLUGIN_OPTIONS = {
    id: 'default',
    docsRoot: 'docs',
    out: 'api',
    cleanOutputDir: true,
    sidebar: {
        fullNames: false,
        categoryLabel: 'API',
        collapsed: true,
        indexLabel: undefined,
        readmeLabel: 'Readme',
        position: null,
        autoConfiguration: true,
    },
    hideInPageTOC: true,
    hideBreadcrumbs: true,
    hidePageTitle: false,
    entryDocument: 'index.md',
    plugin: ['none'],
    watch: false,
    includeExtension: true,
    indexSlug: undefined,
    theme: 'docusaurus',
    frontmatter: undefined,
};
const getPluginOptions = (opts) => {
    const options = {
        ...DEFAULT_PLUGIN_OPTIONS,
        ...opts,
        sidebar: {
            ...DEFAULT_PLUGIN_OPTIONS.sidebar,
            ...opts.sidebar,
        },
    };
    return options;
};
exports.getPluginOptions = getPluginOptions;
