'use strict';

import jQuery from '../lib/jquery';

var SiteHandlers = [];

SiteHandlers.register = function(handler) {
  console.log('SiteHandlers.register()')
  this.push(handler);
}

SiteHandlers.invoke = function() {
  console.log('SiteHandlers.invoke()');
  for (var i = 0; i < this.length; i++){
    var handler = this[i];
    if (handler()) {
      break;
    }
  }
}

SiteHandlers.invokeWhenDomIsReady = function() {
  console.log('SiteHandlers.invokeWhenDomIsReady()');
  jQuery(document).ready(invoke);
}

export default SiteHandlers;

