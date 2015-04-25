'use strict';

import React       from 'react';
import * as models from '../weiqi/models';
import {xyToArea}  from './utils';

export default React.createClass({
  render: function() {
    var x = this.props.x;
    var y = this.props.y;
    var color = this.props.color;
    var moveNumber = this.props.moveNumber;

    var className = color === models.STONE_BLACK ? 'gvsprite-21-black' : 'gvsprite-21-white';

    var area = xyToArea(x,y,21);

    var moveNumberChild;
    if (moveNumber > 0) {
      var colorName = color == models.STONE_BLACK ? "white" : "black";
      var fontSize = "medium";
      var left = 0;
      if (moveNumber >= 10 && moveNumber < 100){
        fontSize = "small";
      }else if (moveNumber >= 100){
        fontSize = "x-small";
        left = 1;
      }
      moveNumberChild = (
        <div style={{display: 'table', width: area[2], height: area[3], overflow: 'hidden'}}>
          <div style={{display: 'table-cell', verticalAlign: 'middle', top: '50%'}}>
            <div style={{left: left, width: '100%', top: '-50%', textAlign: 'center', color: colorName, fontFamily: 'times', fontSize: fontSize}}>{moveNumber}</div>
          </div>
        </div>
      );
    } else {
      moveNumberChild = "\u00a0";
    }

    return (
      <div className={className} style={{position: 'absolute', left: area[0], top: area[1]}}>
        { moveNumberChild }
      </div>
    );
  }

});

