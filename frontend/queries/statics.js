/**
 * https://github.com/spicywebau/craft-neo/blob/5.x/docs/graphql.md
 */

import { entry } from './entries/page';

export const statics = `
query Static($slug: [String]!) {
  entry(slug: $slug) {
    ${entry}
  }
}
`;
