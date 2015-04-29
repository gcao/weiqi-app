'use strict';

import React            from 'react';
import CustomEventMixin from './CustomEventMixin';
import * as models      from '../weiqi/models';
import {getBranch}      from './utils';

export default React.createClass({
  mixins: [CustomEventMixin],

  render: function() {
    var branchNodes = [];
    var node = this.props.node;
    if (node.hasChildren() && node.children.length >= 2){
      var n = node.children.length;
      var s = "";
      for(var i=0; i<node.children.length; i++){
        var child = node.children[i];
        if (child.type == models.NODE_MOVE){
          var x = child.x, y = child.y;
          var {name, label} = getBranch(node.children, i);

          var clickHandler = (function(n){
            return this.customEventTrigger('goToBranch', n);
          }.call(this, i));

          branchNodes.push(
            <div className="gvbranch-link">
              <span><a href='javascript:void(0)' onClick={clickHandler}>{name}: {label}</a>&nbsp;&nbsp; </span>
            </div>
          );
        }
      }
    }

    return (
      <div className="gvbranch-links">{branchNodes}</div>
    );
  }

});

