import { DeclarationReflection, PageEvent, Renderer, RendererEvent } from 'typedoc';
import { MarkdownTheme } from 'typedoc-plugin-markdown';
import { FrontMatter, SidebarOptions } from './types';
export declare class DocusaurusTheme extends MarkdownTheme {
    sidebar: SidebarOptions;
    readmeTitle: string;
    indexSlug: string;
    includeExtension: string;
    frontmatter: FrontMatter;
    constructor(renderer: Renderer);
    onPageEnd(page: PageEvent<DeclarationReflection>): void;
    onRendererEnd(renderer: RendererEvent): void;
    loopAndWriteCategories(path: string): void;
    writeCategoryYaml: (categoryPath: string, label: string, position: number | null, collapsed: boolean) => void;
    getYamlItems(page: PageEvent<DeclarationReflection>): FrontMatter;
    getSidebarLabel(page: PageEvent<DeclarationReflection>): string | undefined;
    getSidebarPosition(page: PageEvent<DeclarationReflection>): "0.5" | "0" | null;
    get globalsFile(): string;
}
