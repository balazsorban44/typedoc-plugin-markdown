export interface FrontMatterVars {
    [key: string]: string | number | boolean;
}
export declare const prependYAML: (contents: string, vars: FrontMatterVars) => string;
