'use strict';

import React       from 'react';
import * as models from '../weiqi/models';
import Stone       from './Stone';

export default React.createClass({
  render: function() {
    var showMoveNumber = this.props.showMoveNumber;
    var gameState = this.props.gameState;
    var board     = gameState.board;
    var stones    = [];
    for(var i=0; i<board.size; i++) {
      for (var j=0; j<board.size; j++) {
        var color = board[i][j];
        if (color === models.STONE_BLACK || color === models.STONE_WHITE) {
          var moveNumber = gameState.getMoveNumber(i, j);
          if (showMoveNumber === 0 ||
              (showMoveNumber > 0 && moveNumber < showMoveNumber) ||
              (showMoveNumber < 0 && gameState.currentNode.moveNumber >= moveNumber - showMoveNumber)
          ) {
            moveNumber = 0;
          }

          stones.push(
            <Stone x={i} y={j} color={color} moveNumber={moveNumber}/>
          );
        }
      }
    }
    return (
      <div className='gvstones'>{stones}</div>
    );
  }

});

