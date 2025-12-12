const fields = `
level
uid
type: typeHandle
class: class_
div: div_
`;

/**
 * Don't add closing brackets, as it inherits children comps
 */

export const div_ = `
... on comps_div_BlockType {
  ${fields}
`;

export const divShort_ = `
... on compsShort_div_BlockType {
  ${fields}
`;

