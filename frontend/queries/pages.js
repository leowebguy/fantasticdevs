/**
 * https://github.com/spicywebau/craft-neo/blob/5.x/docs/graphql.md
 */

import { entry } from './entries/page';

export const pages = `
query Page($uri: [String]!) {
  entry(uri: $uri) {
    ${entry}
  }
}
`;
