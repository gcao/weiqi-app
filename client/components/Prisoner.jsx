'use strict';

import React       from 'react';
import * as models from '../weiqi/models';

export default React.createClass({
  render: function() {
    var x = this.props.x, y = this.props.y, color = this.props.color;
    var cssClass = color === models.STONE_BLACK? "gvsprite-15-black_dead" : "gvsprite-15-white_dead";
    return (
      <div className={"gvboard-prisoner-outer cell x" + x + " y" + y}>
        <div className={"gvboard-prisoner " + cssClass}/>
      </div>
    );
  }

});

