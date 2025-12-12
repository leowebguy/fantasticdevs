const fields = `
level
  uid
  type: typeHandle
  class: class_
  tag: tag_
  text: text_
`;

export const heading_ = `
... on comps_heading_BlockType {
  ${fields}
}
`;

export const headingShort_ = `
... on compsShort_heading_BlockType {
  ${fields}
}
`;

