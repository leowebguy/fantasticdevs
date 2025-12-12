const fields = `
level
  uid
  type: typeHandle
`;

export const form_ = `
... on comps_form_BlockType {
  ${fields}
}
`;

export const formShort_ = `
... on compsShort_form_BlockType {
  ${fields}
}
`;

