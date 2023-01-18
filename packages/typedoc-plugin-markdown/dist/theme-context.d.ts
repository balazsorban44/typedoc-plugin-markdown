import { Options, Reflection } from 'typedoc';
import { TypedocPluginMarkdownOptions } from './models';
import { MarkdownTheme } from './theme';
export declare class MarkdownThemeRenderContext {
    theme: MarkdownTheme;
    options: Options;
    globalsFile: string;
    private _activeLocation;
    set activeLocation(activeLocation: string);
    get activeLocation(): string;
    constructor(theme: MarkdownTheme, options: Options);
    getOption<K extends keyof TypedocPluginMarkdownOptions>(name: K): TypedocPluginMarkdownOptions[K];
    getRelativeUrl(url: string | undefined): string | null;
    urlTo: (reflection: Reflection) => string | null;
    relativeURL: (url: string | undefined) => string | null;
    templates: import("./resources").Templates;
    partials: import("./resources").Partials;
}
