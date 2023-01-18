"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partials = exports.templates = void 0;
const member_1 = require("./templates/member");
const project_1 = require("./templates/project");
const readme_1 = require("./templates/readme");
const reflection_1 = require("./templates/reflection");
const breadcrumbs_1 = require("./partials/breadcrumbs");
const comment_parts_1 = require("./partials/comment.parts");
const comment_1 = require("./partials/comment");
const header_1 = require("./partials/header");
const hierarchy_1 = require("./partials/hierarchy");
const member_constructor_1 = require("./partials/member.constructor");
const member_declaration_title_1 = require("./partials/member.declaration.title");
const member_declaration_1 = require("./partials/member.declaration");
const member_indexsignature_title_1 = require("./partials/member.indexsignature.title");
const member_reference_1 = require("./partials/member.reference");
const member_signature_title_1 = require("./partials/member.signature.title");
const member_signature_1 = require("./partials/member.signature");
const member_2 = require("./partials/member");
const member_typedeclaration_list_1 = require("./partials/member.typedeclaration.list");
const member_typedeclaration_table_1 = require("./partials/member.typedeclaration.table");
const member_typeparameters_1 = require("./partials/member.typeparameters");
const members_1 = require("./partials/members");
const reflection_title_1 = require("./partials/reflection.title");
const reflection_2 = require("./partials/reflection");
const sources_1 = require("./partials/sources");
const table_parameters_1 = require("./partials/table.parameters");
const toc_1 = require("./partials/toc");
const type_array_1 = require("./partials/type.array");
const type_conditional_1 = require("./partials/type.conditional");
const type_declaration_1 = require("./partials/type.declaration");
const type_function_1 = require("./partials/type.function");
const type_indexAccess_1 = require("./partials/type.indexAccess");
const type_inferred_1 = require("./partials/type.inferred");
const type_intersection_1 = require("./partials/type.intersection");
const type_intrinsic_1 = require("./partials/type.intrinsic");
const type_literal_1 = require("./partials/type.literal");
const type_query_1 = require("./partials/type.query");
const type_reference_1 = require("./partials/type.reference");
const type_reflection_1 = require("./partials/type.reflection");
const type_some_1 = require("./partials/type.some");
const type_tuple_1 = require("./partials/type.tuple");
const type_typeOperator_1 = require("./partials/type.typeOperator");
const type_union_1 = require("./partials/type.union");
const type_unknown_1 = require("./partials/type.unknown");
function bind(fn, first) {
    return (...r) => fn(first, ...r);
}
const templates = (context) => ({
    memberTemplate: bind(member_1.memberTemplate, context),
    projectTemplate: bind(project_1.projectTemplate, context),
    readmeTemplate: bind(readme_1.readmeTemplate, context),
    reflectionTemplate: bind(reflection_1.reflectionTemplate, context),
});
exports.templates = templates;
const partials = (context) => ({
    breadcrumbs: bind(breadcrumbs_1.breadcrumbs, context),
    commentParts: bind(comment_parts_1.commentParts, context),
    comment: bind(comment_1.comment, context),
    header: bind(header_1.header, context),
    hierarchy: bind(hierarchy_1.hierarchy, context),
    constructorMember: bind(member_constructor_1.constructorMember, context),
    declarationMemberTitle: bind(member_declaration_title_1.declarationMemberTitle, context),
    declarationMember: bind(member_declaration_1.declarationMember, context),
    indexSignatureTitle: bind(member_indexsignature_title_1.indexSignatureTitle, context),
    referenceMember: bind(member_reference_1.referenceMember, context),
    signatureTitle: bind(member_signature_title_1.signatureTitle, context),
    signatureMember: bind(member_signature_1.signatureMember, context),
    member: bind(member_2.member, context),
    typeDeclarationList: bind(member_typedeclaration_list_1.typeDeclarationList, context),
    typeDeclarationTable: bind(member_typedeclaration_table_1.typeDeclarationTable, context),
    typeParameters: bind(member_typeparameters_1.typeParameters, context),
    members: bind(members_1.members, context),
    reflectionTitle: bind(reflection_title_1.reflectionTitle, context),
    reflection: bind(reflection_2.reflection, context),
    sources: bind(sources_1.sources, context),
    parametersTable: bind(table_parameters_1.parametersTable, context),
    toc: bind(toc_1.toc, context),
    arrayType: bind(type_array_1.arrayType, context),
    conditionalType: bind(type_conditional_1.conditionalType, context),
    declarationType: bind(type_declaration_1.declarationType, context),
    functionType: bind(type_function_1.functionType, context),
    indexAccessType: bind(type_indexAccess_1.indexAccessType, context),
    inferredType: bind(type_inferred_1.inferredType, context),
    intersectionType: bind(type_intersection_1.intersectionType, context),
    intrinsicType: bind(type_intrinsic_1.intrinsicType, context),
    literalType: bind(type_literal_1.literalType, context),
    queryType: bind(type_query_1.queryType, context),
    referenceType: bind(type_reference_1.referenceType, context),
    reflectionType: bind(type_reflection_1.reflectionType, context),
    someType: bind(type_some_1.someType, context),
    tupleType: bind(type_tuple_1.tupleType, context),
    typeOperatorType: bind(type_typeOperator_1.typeOperatorType, context),
    unionType: bind(type_union_1.unionType, context),
    unknownType: bind(type_unknown_1.unknownType, context),
});
exports.partials = partials;
