'use strict';

import React       from 'react';
import * as models from '../weiqi/models';

export default React.createClass({
  render: function() {
    var x = this.props.x, y = this.props.y, color = this.props.color;
    return (
      <div className={"gvboard-prisoner-outer cell x" + x + " y" + y}>
        <div className={"gvboard-prisoner " + color}/>
      </div>
    );
  }

});

