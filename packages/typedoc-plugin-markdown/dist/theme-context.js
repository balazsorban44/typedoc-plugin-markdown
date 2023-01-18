"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownThemeRenderContext = void 0;
const path = require("path");
const resources_1 = require("./resources");
const constants_1 = require("./support/constants");
class MarkdownThemeRenderContext {
    set activeLocation(activeLocation) {
        this._activeLocation = activeLocation;
    }
    get activeLocation() {
        return this._activeLocation;
    }
    constructor(theme, options) {
        this.theme = theme;
        this.options = options;
        this.globalsFile = 'Modules.md';
        this.urlTo = (reflection) => this.getRelativeUrl(reflection.url);
        this.relativeURL = (url) => this.getRelativeUrl(url);
        this.templates = (0, resources_1.templates)(this);
        this.partials = (0, resources_1.partials)(this);
    }
    getOption(name) {
        return this.options.getValue(name);
    }
    getRelativeUrl(url) {
        if (!url) {
            return null;
        }
        if (constants_1.URL_PREFIX.test(url)) {
            return url;
        }
        else {
            const relative = path.relative(path.dirname(this.activeLocation), path.dirname(url));
            return path.join(relative, path.basename(url)).replace(/\\/g, '/');
        }
    }
}
exports.MarkdownThemeRenderContext = MarkdownThemeRenderContext;
