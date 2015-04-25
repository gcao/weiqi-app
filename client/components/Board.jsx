'use strict';

import React            from 'react';
import Stones           from './Stones';
import Marks            from './Marks';
import BranchMarks      from './BranchMarks';
import MoveMark         from './MoveMark';
import Prisoners        from './Prisoners';
import CustomEventMixin from './CustomEventMixin';

export default React.createClass({
  mixins: [CustomEventMixin],

  mouseMoveHandler: function(e){
    var e = e.nativeEvent;
    var layerX = e.layerX || e.offsetX || e.clientX;
    var layerY = e.layerY || e.offsetY || e.clientY;

    var gridSize = 21;
    var x = parseInt(layerX/gridSize);
    var y = parseInt(layerY/gridSize);

    this.fireCustomEvent('showMousePosition', {x: x, y: y});
  },

  render: function() {
    var blackPrisoners = this.props.gameState.blackPrisonerPoints;
    var whitePrisoners = this.props.gameState.whitePrisonerPoints;

    return (
      <div className='gvreset gvboard-outer gvsprite-21-board'>
        <div className='gvreset gvboard'
        >
          <Stones gameState={this.props.gameState} showMoveNumber={this.props.config.showMoveNumber}/>
          <Marks  gameState={this.props.gameState}/>
          <BranchMarks gameState={this.props.gameState}/>
          <MoveMark node={this.props.gameState.currentNode}/>
          <Prisoners
            showBlackPrisoners={this.props.config.showBlackPrisoners}
            showWhitePrisoners={this.props.config.showWhitePrisoners}
            blackPrisoners={blackPrisoners}
            whitePrisoners={whitePrisoners}
          />
          <div className='gvreset gvboard-overlay gvboard-fascade'
               onMouseMove={this.mouseMoveHandler}
               onMouseOut={this.customEventTrigger('hideMousePosition')}
          >
            <div className='gvreset gvsprite-21-blankboard'/>
          </div>
        </div>
      </div>
    );
  }
});

