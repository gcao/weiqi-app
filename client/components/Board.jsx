'use strict';

import React       from 'react';
import Stones      from './Stones';
import Marks       from './Marks';
import BranchMarks from './BranchMarks';
import MoveMark    from './MoveMark';
import Prisoners   from './Prisoners';

export default React.createClass({
  render: function() {
    var blackPrisoners = this.props.gameState.blackPrisonerPoints;
    var whitePrisoners = this.props.gameState.whitePrisonerPoints;

    return (
      <div className='gvreset gvboard-outer gvsprite-21-board'>
        <div className='gvreset gvboard'
        >
          <Stones gameState={this.props.gameState}/>
          <Marks  gameState={this.props.gameState}/>
          <BranchMarks gameState={this.props.gameState}/>
          <MoveMark ctx={this.props.ctx}/>
          <Prisoners
            showBlackPrisoners={this.props.config.showBlackPrisoners}
            showWhitePrisoners={this.props.config.showWhitePrisoners}
            blackPrisoners={blackPrisoners}
            whitePrisoners={whitePrisoners}
          />
          <div className='gvreset gvboard-overlay gvboard-fascade'
          >
            <div className='gvreset gvsprite-21-blankboard'/>
          </div>
        </div>
      </div>
    );
  }
});

