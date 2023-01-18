import { DeclarationReflection, PageEvent, ProjectReflection } from 'typedoc';
import { MarkdownThemeRenderContext } from '../theme-context';
export declare function breadcrumbs(context: MarkdownThemeRenderContext, page: PageEvent<ProjectReflection | DeclarationReflection>): string;
