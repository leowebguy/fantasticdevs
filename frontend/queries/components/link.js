const fields = `
level
  uid
  type: typeHandle
  link: link_ {
    type
    label
    url
    target
    class
  }
`;

export const link_ = `
... on comps_link_BlockType {
  ${fields}
}
`;

export const linkShort_ = `
... on compsShort_link_BlockType {
  ${fields}
}
`;

