'use strict';

import React                 from 'react';
import * as models           from '../weiqi/models';
import {xyToArea, getBranch} from './utils';

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
          var area = xyToArea(x,y,21);
          var left = area[0], top = area[1], width = area[2], height = area[3];
          var {label} = getBranch(node.children, i);
          branchNodes.push(
            <div style={{
              position: 'absolute',
              left: left,
              top: top + 1,
              width: width,
              height: height,
              textAlign: 'center',
              verticalAlign: 'middle',
              color: 'red',
              fontWeight: 'bolder',
              fontSize: 15,
              backgroundColor: color === models.STONE_NONE ? "#EECD7A" : ''
            }}>{label}</div>
          );
        }
      }
    }

    return (
      <div>{branchNodes}</div>
    );
  }

});

