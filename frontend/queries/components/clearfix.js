const fields = `
level
uid
type: typeHandle
class: class_
`;

export const clearfix_ = `
... on comps_clearfix_BlockType {
  ${fields}
}
`;

export const clearfixShort_ = `
... on compsShort_clearfix_BlockType {
  ${fields}
}
`;

