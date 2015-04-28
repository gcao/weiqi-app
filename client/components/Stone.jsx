'use strict';

import React       from 'react';
import * as models from '../weiqi/models';
import {xyToArea}  from './utils';
import MoveNumber  from './MoveNumber';

export default React.createClass({
  render: function() {
    var x = this.props.x, y = this.props.y, color = this.props.color, moveNumber=this.props.moveNumber;
    var className = color === models.STONE_BLACK ? 'gvsprite-21-black' : 'gvsprite-21-white';
    var area = xyToArea(x, y, 21);

    return (
      <div className={'gvstone ' + className} style={{left: area[0], top: area[1]}}>
        { moveNumber > 0 && <MoveNumber x={x} y={y} color={color} moveNumber={moveNumber}/> }
      </div>
    );
  }

});

