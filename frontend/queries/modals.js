/**
 * https://github.com/spicywebau/craft-neo/blob/5.x/docs/graphql.md
 */

import { entry } from './entries/modal';

export const modals = `
query Modal($slug: [String]!) {
  entry(slug: $slug) {
    ${entry}
  }
}
`;
