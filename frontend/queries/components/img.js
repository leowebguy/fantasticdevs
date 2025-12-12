const fields = `
level
  uid
  type: typeHandle
  class: class_
  width: width_
  height: height_
  img: img_ {
    alt
    url
    small: url @transform(width: 300, height: 200, mode: "crop", position: "center-center", immediately: true, format: "webp")
    medium: url @transform(width: 600, height: 400, mode: "crop", position: "center-center", immediately: true, format: "webp")
    large: url @transform(width: 900, height: 600, mode: "crop", position: "center-center", immediately: true, format: "webp")
  }
`;

export const img_ = `
... on comps_img_BlockType {
  ${fields}
}
`;

export const imgShort_ = `
... on compsShort_img_BlockType {
  ${fields}
}
`;

