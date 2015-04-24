'use strict';

import React       from 'react';
import * as models from '../weiqi/models';
import {xyToArea}  from './utils';

export default React.createClass({
  render: function() {
    var x = this.props.x, y = this.props.y, color = this.props.color;
    var gridSize = 21;
    var boardColor = "#EECD7A";
    var cssClass = color === models.STONE_BLACK? "gvsprite-15-black_dead" : "gvsprite-15-white_dead";
    var area = xyToArea(x,y,gridSize);
    var left = area[0], top = area[1];
    return (
      <div style={{
        position: 'absolute',
        left: left,
        top: top,
        width: gridSize,
        height: gridSize,
        backgroundColor: boardColor
      }}>
        <div className={cssClass} style={{
          marginLeft: 3,
          marginTop: 3
        }}/>
      </div>
    );
  }

});

