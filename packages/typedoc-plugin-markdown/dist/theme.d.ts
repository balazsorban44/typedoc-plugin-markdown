import { DeclarationReflection, PageEvent, ProjectReflection, Reflection, Renderer, Theme, UrlMapping } from 'typedoc';
import { TemplateMapping } from './models';
import { MarkdownThemeRenderContext } from './theme-context';
export declare class MarkdownTheme extends Theme {
    entryDocument: string;
    entryPoints: string[];
    readme: string;
    preserveAnchorCasing: boolean;
    symbolsWithOwnFile: string | string[];
    fileStructure: string;
    flattenOutput: string;
    private _renderContext?;
    private anchors;
    constructor(renderer: Renderer);
    getRenderContext(): MarkdownThemeRenderContext;
    readmeTemplate: (pageEvent: PageEvent<ProjectReflection>) => string;
    projectTemplate: (pageEvent: PageEvent<ProjectReflection>) => string;
    reflectionTemplate: (pageEvent: PageEvent<DeclarationReflection>) => string;
    memberTemplate: (pageEvent: PageEvent<DeclarationReflection>) => string;
    render(page: PageEvent<Reflection>): string;
    getUrls(project: ProjectReflection): UrlMapping<any>[];
    buildUrls(reflection: DeclarationReflection, urls: UrlMapping[]): UrlMapping[];
    getUrl(reflection: Reflection, relative?: Reflection, separator?: string): string;
    buildModuleUrls(reflection: DeclarationReflection, urls: UrlMapping[], parentFragments?: string[]): UrlMapping[];
    applyAnchorUrl(reflection: Reflection, container: Reflection, isSymbol?: boolean): void;
    get mappings(): Record<number, TemplateMapping>;
    protected onBeginPage(page: PageEvent): void;
}
