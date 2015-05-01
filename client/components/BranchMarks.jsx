'use strict';

import React       from 'react';
import * as models from '../weiqi/models';
import {getBranch} from './utils';

export default React.createClass({
  render: function() {
    var branchNodes = [];
    var node = this.props.gameState.currentNode;
    if (node.hasChildren() && node.children.length >= 2){
      var n = node.children.length;
      var s = "";
      for(var i=0; i<node.children.length; i++){
        var child = node.children[i];
        if (child.type == models.NODE_MOVE){
          var x = child.x, y = child.y;
          var color = this.props.gameState.board[x][y];
          var {label} = getBranch(node.children, i);
          branchNodes.push(
            <div className={"gvbranch-mark x" + x + " y" + y + ' ' + color}>
              <div className="gvbranch-mark1">{label}</div>
            </div>
          );
        }
      }
    }

    return (
      <div className="gvbranch-marks">{branchNodes}</div>
    );
  }

});

