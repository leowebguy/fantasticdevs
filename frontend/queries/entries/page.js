import { section_ } from '../components/section';
import { div_ } from '../components/div';
import { static_ } from '../components/static';
import { modal_ } from '../components/modal';
import { clearfix_ } from '../components/clearfix';
import { heading_ } from '../components/heading';
import { copy_ } from '../components/copy';
import { form_ } from '../components/form';
import { img_ } from '../components/img';
import { link_ } from '../components/link';
import { markup_ } from '../components/markup';
import { svg_ } from '../components/svg';
import { accordion_ } from '../components/accordion';
import { hero_ } from '../components/hero';

const comps_ = `
${clearfix_}
${heading_}
${copy_}
${link_}
${img_}
${svg_}
${markup_}
${form_}
${accordion_}
`;

export const entry = `
... on page_Entry {
  level
  uid
  title
  css: css_ {
    value
  }
  js: js_ {
    value
  }
  comps {
    ${hero_}
    ${modal_}
    ${static_}
    ${section_}
      children {
        ${div_}
          children {
            ${div_}
              children {
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
                ${comps_}
              }
            }
            ${comps_}
          }
        }
      }
    }
  }
}
`;
