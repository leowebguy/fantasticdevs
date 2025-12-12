const fields = `
level
  uid
  type: typeHandle
  class: class_
  copy: copy_
`;

export const copy_ = `
... on comps_copy_BlockType {
  ${fields}
}
`;

export const copyShort_ = `
... on compsShort_copy_BlockType {
  ${fields}
}
`;

