'use strict';

import React       from 'react';
import * as models from '../weiqi/models';
import {xyToArea}  from './utils';

export default React.createClass({
  render: function() {
    var x = this.props.x, y = this.props.y, color = this.props.color;
    var gridSize = 21;
    var cssClass = color === models.STONE_BLACK? "gvsprite-15-black_dead" : "gvsprite-15-white_dead";
    var area = xyToArea(x,y,gridSize);
    var left = area[0], top = area[1];
    return (
      <div className="gvboard-prisoner-outer" style={{
        left: left,
        top: top,
        width: gridSize,
        height: gridSize,
      }}>
        <div className={"gvboard-prisoner " + cssClass}/>
      </div>
    );
  }

});

