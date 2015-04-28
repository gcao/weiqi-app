'use strict';

import React       from 'react';
import Prisoner    from './Prisoner';
import PlaceHolder from './PlaceHolder';

export default React.createClass({
  render: function() {
    var children = [];
    if (this.props.showBlackPrisoners) {
      var blackPrisoners = this.props.blackPrisoners;
      for (var i=0; i<blackPrisoners.length; i++) {
        var prisoner = blackPrisoners[i];
        children.push(<Prisoner x={prisoner[0]} y={prisoner[1]} color={prisoner[2]}/>);
      }
    } else if (this.props.showWhitePrisoners) {
      var whitePrisoners = this.props.whitePrisoners;
      for (var i=0; i<whitePrisoners.length; i++) {
        var prisoner = whitePrisoners[i];
        children.push(<Prisoner x={prisoner[0]} y={prisoner[1]} color={prisoner[2]}/>);
      }
    } else {
      return PlaceHolder;
    }

    return (
      <div className='gvboard-prisoners gvboard-overlay'>{children}</div>
    );
  }

});

