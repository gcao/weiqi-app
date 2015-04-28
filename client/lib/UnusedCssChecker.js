'use strict';

import jQuery from '../lib/jquery';
import css    from 'css';

function checkSelector(selector) {
  return !!document.querySelector(selector);
}
export default function checkUnusedCss(url) {
  console.log('Checking for unused CSS selector');
  jQuery.get(url).then(function(resp) {
    var parsed = css.parse(resp);
    //console.log(parsed);
    parsed.stylesheet.rules.forEach(function(rule) {
      rule.selectors.forEach(function(selector) {
        selector = selector.replace(/:[^\s]+/g, '');
        if (selector.indexOf('gvsprite') >= 0) return;
        if (!checkSelector(selector)) {
          console.warn("Unused css selector: " + selector);
        }
      });
    });
  });
}

