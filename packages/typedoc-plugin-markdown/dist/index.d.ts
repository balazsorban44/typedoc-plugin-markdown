import { Application } from 'typedoc';
import { MarkdownTheme } from './theme';
import { MarkdownThemeRenderContext } from './theme-context';
export declare function load(app: Application): void;
export * from './models';
export * from './options-reader';
export { MarkdownTheme, MarkdownThemeRenderContext };
