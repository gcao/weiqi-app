'use strict';

import React       from 'react';
import * as models from '../weiqi/models';

export default React.createClass({
  render: function() {
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
      <div className="gvmove-number cell">
        <div className="gvmove-number2">
          <div className="gvmove-number3"
               style={{
                       left: left,
                       color: this.props.color === models.STONE_BLACK ? 'white' : 'black',
                       fontSize: fontSize
                     }}
          >{moveNumber}</div>
        </div>
      </div>
    );
  }

});

