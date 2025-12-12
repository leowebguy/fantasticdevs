const fields = `
level
  uid
  type: typeHandle
  style: style_
  svg: svg_ {
    url
  }
`;

export const svg_ = `
... on comps_svg_BlockType {
  ${fields}
}
`;

// export const svgShort_ = `
// ... on compsShort_svg_BlockType {
//   ${fields}
// }
// `;

