'use strict';

import React    from 'react';
import Info     from './Info';
import Comments from './Comments';

export default React.createClass({
  render: function() {
    return (
      <div className='gvreset gvright-pane'>
        <Info ref="info" game={this.props.gameState.game}/>
        <Comments ref="comment" node={this.props.gameState.currentNode}/>
      </div>
    );
  }

});

