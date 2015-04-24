'use strict';

import React from 'react';

// http://jsfiddle.net/gcao/20ga1aLn/
if (window.navigator.appName.indexOf("Internet Explorer") >= 0) {
  (function(){

    window.CustomEvent = function(event, params) {
      var evt;
      params = params || {
        bubbles    : false,
        cancelable : false,
        detail     : undefined
      };
      evt = document.createEvent("CustomEvent");
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    };

    window.CustomEvent.prototype = window.Event.prototype;

  })();
}

export default {
  fireCustomEvent: function(type, detail) {
    var el    = React.findDOMNode(this);
    var event = new CustomEvent(type, {bubbles: true, detail: detail});
    el.dispatchEvent(event);
  },

  /**
   * Returns a function that fires custom event when invoked.
   * The returned function can serve as handler for click or other
   * DOM events.
   */
  customEventTrigger: function(type, detail) {
    var self = this;
    return function() {
      self.fireCustomEvent(type, detail);
    };
  },

  componentDidMount: function() {
    var self = this;
    if (self.customEvents) {
      var el = React.findDOMNode(self);
      for (var type in self.customEvents) {
        var handler = self.customEvents[type];
        (function(handler){
          el.addEventListener(type, function(e) {
            handler.call(self, e);
          }, false);
        })(handler);
      }
    }
  }

};
