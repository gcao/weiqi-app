'use strict';

import React       from 'react';
import * as models from '../weiqi/models';
import MoveNumber  from './MoveNumber';

export default React.createClass({
  render: function() {
    var x = this.props.x, y = this.props.y, color = this.props.color, moveNumber=this.props.moveNumber;

    return (
      <div className={"gvstone x" + x + " y" + y + " " + color}>
        { moveNumber > 0 && <MoveNumber x={x} y={y} color={color} moveNumber={moveNumber}/> }
      </div>
    );
  }

});

