import { divShort_ as div_ } from '../components/div';
import { clearfixShort_ } from '../components/clearfix';
import { headingShort_ } from '../components/heading';
import { copyShort_ } from '../components/copy';
import { formShort_ } from '../components/form';
import { linkShort_ } from '../components/link';
import { markupShort_ } from '../components/markup';

const comps_ = `
${clearfixShort_}
${headingShort_}
${copyShort_}
${linkShort_}
${markupShort_}
${formShort_}
`;

export const entry = `
... on modal_Entry {
  level
  uid
  slug
  comps: compsShort {
    ${div_}
      children {
        ${div_}
          children {
            ${div_}
              children {
                ${div_}
                }
                ${comps_}
              }
            }
            ${comps_}
          }
        }
        ${comps_}
      }
    }
  }
}
`;


