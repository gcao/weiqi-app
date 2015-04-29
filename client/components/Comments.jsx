'use strict';

import React       from 'react';
import PlaceHolder from './PlaceHolder';
import BranchLinks from './BranchLinks';

export default React.createClass({
  render: function() {
    var node = this.props.node;
    if (node.comment) {
      return (
        <div className='gvcomments'>
          <BranchLinks node={node}/>
          <strong>{jsgvTranslations['comment_for'].replace(/MOVE/,node.moveNumber)}</strong><br/>
          {node.comment}
        </div>
      );
    } else {
      return PlaceHolder;
    }
  }

});

