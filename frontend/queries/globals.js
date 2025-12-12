export const globals = `
query Globals {
  header: globalSet(handle: "header") {
    ... on header_GlobalSet {
      id
      logo: logo_ {
        url
        filename
      }
      css: css_ {
        value
      }
      js: js_ {
        value
      }
    }
  }
  footer: globalSet(handle: "footer") {
    ... on footer_GlobalSet {
      id
      js: js_ {
        value
      }
    }
  }
  json: globalSet(handle: "json") {
    ... on json_GlobalSet {
      id
      json: json_ {
        value
      }
    }
  }
}
`;
