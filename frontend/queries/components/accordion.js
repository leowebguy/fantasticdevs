const fields = `
level
  uid
  type: typeHandle
  active: active_
  title: title_
  children {
    ... on comps_copy_BlockType {
      level
      uid
      type: typeHandle
      class: class_
      copy: copy_
    }
  }
`;

export const accordion_ = `
... on comps_accordion_BlockType {
  ${fields}
}
`;

// export const accordionShort_ = `
// ... on compsShort_accordion_BlockType {
//   ${fields}
// }
// `;

