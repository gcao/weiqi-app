'use strict';

import React    from 'react';
import Info     from './Info';
import Comments from './Comments';

export default React.createClass({
  componentDidUpdate: function() {
    var node = this.getDOMNode();

    if (this.props.gameState.isFirst()) {
      node.scrollTop = 0;
      return;
    }

    var infoNode = React.findDOMNode(this.refs.info);
    node.scrollTop = infoNode.offsetHeight + 5;
  },

  render: function() {
    return (
      <div className='gvright-pane'>
        <div className='gvright-pane1'>
          <div className='gvright-pane2'>
            <Info ref="info" game={this.props.gameState.game}/>
            <Comments node={this.props.gameState.currentNode}/>
          </div>
        </div>
      </div>
    );
  }

});

