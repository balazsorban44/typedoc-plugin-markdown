import { ReflectionKind } from 'typedoc';
export declare function formatContents(contents: string): string;
export declare function escapeChars(str: string): string;
export declare function stripComments(str: string): string;
export declare function stripLineBreaks(str: string): string;
export declare function camelToTitleCase(text: string): string;
export declare function getKindPlural(kind: ReflectionKind): string;
export declare function getKindString(kind: ReflectionKind): string;
