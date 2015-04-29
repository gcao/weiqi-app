'use strict';

import React       from 'react';
import * as models from '../weiqi/models';
import PlaceHolder from './PlaceHolder';

export default React.createClass({
  render: function() {
    var node = this.props.node;
    if (node.type === models.NODE_MOVE) {
      return (
        <div className={'gvmove-mark x' + node.x + ' y' + node.y}/>
      );
    } else {
      return PlaceHolder;
    }
  }

});

