'use strict';

import React       from 'react';
import * as models from '../weiqi/models';

export default React.createClass({
  render: function() {
    var moveNumber = this.props.moveNumber;
    var moveRangeClass = " gvmove0-9";

    if (moveNumber >= 10 && moveNumber < 100){
      moveRangeClass = " gvmove10-99";
    }else if (moveNumber >= 100){
      moveRangeClass = " gvmove100-up";
    }

    return (
      <div className={"gvmove-number " + this.props.color + moveRangeClass}>
        <div className="gvmove-number2">
          <div className="gvmove-number3">{moveNumber}</div>
        </div>
      </div>
    );
  }

});

