'use strict';

import React       from 'react';
import * as models from '../weiqi/models';
import Stone       from './Stone';

export default React.createClass({
  render: function() {
    var gameState = this.props.gameState;
    var board     = gameState.board;
    var stones    = [];
    for(var i=0; i<board.size; i++) {
      for (var j=0; j<board.size; j++) {
        var color = board[i][j];
        if (color === models.STONE_BLACK || color === models.STONE_WHITE) {
          var moveNumber = gameState.getMoveNumber(i, j);
          stones.push(
            <Stone x={i} y={j} color={color} moveNumber={moveNumber}/>
          );
        }
      }
    }
    return (
      <div className='gvreset gvboard-overlay'>{stones}</div>
    );
  }

});

