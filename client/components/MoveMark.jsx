'use strict';

import React       from 'react';
import * as models from '../weiqi/models';
import PlaceHolder from './PlaceHolder';

export default React.createClass({
  render: function() {
    var node = this.props.node;
    if (node.type === models.NODE_MOVE) {
      return (
        <div className='gvmove-mark gvsprite-21-markmove'
          style={{
            left: node.x * 21,
            top: node.y * 21,
            width: 21,
            height: 21
          }}/>
      );
    } else {
      return PlaceHolder;
    }
  }

});

