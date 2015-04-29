'use strict';

import React       from 'react';
import * as models from '../weiqi/models';

export default React.createClass({
  render: function() {
    var color = this.props.color;
    var moveNumber = this.props.moveNumber;

    var fontSize = "medium";
    var left = 0;
    if (moveNumber >= 10 && moveNumber < 100){
      fontSize = "small";
    }else if (moveNumber >= 100){
      fontSize = "x-small";
      left = 1;
    }

    return (
      <div className="gvmove-number cell" style={{display: 'table', overflow: 'hidden'}}>
        <div style={{display: 'table-cell', verticalAlign: 'middle', top: '50%'}}>
          <div style={{left: left,
                       width: '100%',
                       top: '-50%',
                       textAlign: 'center',
                       color: color === models.STONE_BLACK ? 'white' : 'black',
                       fontFamily: 'times',
                       fontSize: fontSize}}
          >{moveNumber}</div>
        </div>
      </div>
    );
  }

});

