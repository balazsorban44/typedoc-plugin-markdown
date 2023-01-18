import { ContainerReflection, DeclarationReflection, ProjectReflection, SignatureReflection } from 'typedoc';
export declare const isConstructor: (signature: DeclarationReflection | SignatureReflection) => boolean | undefined;
export declare function getIndexHeadingLevel(reflection: DeclarationReflection | ProjectReflection): 2 | 3;
export declare function getGroupHeadingLevel(container: ContainerReflection): 1 | 2 | 3;
export declare function getReflectionHeadingLevel(reflection: DeclarationReflection | SignatureReflection): 2 | 3 | 4;
export declare function getMemberHeadingLevel(reflection: DeclarationReflection | SignatureReflection): number;
