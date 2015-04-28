'use strict';

import React       from 'react';
import * as models from '../weiqi/models';
import MoveNumber  from './MoveNumber';

export default React.createClass({
  render: function() {
    var x = this.props.x, y = this.props.y, color = this.props.color, moveNumber=this.props.moveNumber;
    var className = "gvstone x" + x + " y" + y + " ";
    className += color === models.STONE_BLACK ? 'gvsprite-21-black' : 'gvsprite-21-white';

    return (
      <div className={className}>
        { moveNumber > 0 && <MoveNumber x={x} y={y} color={color} moveNumber={moveNumber}/> }
      </div>
    );
  }

});

