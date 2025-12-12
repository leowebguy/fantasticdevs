const fields = `
level
  uid
  type: typeHandle
  markup: markup_ {
    language,
    value
  }
`;

export const markup_ = `
... on comps_markup_BlockType {
  ${fields}
}
`;

export const markupShort_ = `
... on compsShort_markup_BlockType {
  ${fields}
}
`;

