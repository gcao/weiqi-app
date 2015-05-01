'use strict';

import React       from 'react';
import * as models from '../weiqi/models';

export default React.createClass({
  render: function() {
    var gameState = this.props.gameState;

    var markNodes = [];
    var marks = gameState.currentNode.marks;
    for (var i=0; marks && i<marks.length; i++) {
      var mark = marks[i];
      var x = mark[0], y = mark[1];
      var color = gameState.board[x][y];
      switch(mark[2]){
        case models.MARK_CROSS:
        case models.MARK_TRIANGLE:
        case models.MARK_SQUARE:
        case models.MARK_CIRCLE:
        case models.MARK_TERR_BLACK:
        case models.MARK_TERR_WHITE:
          markNodes.push(
            <div className={"gvmark gv" + mark[2] + " x" + x + " y" + y + " " + color}/>
          );
          break;
        case models.MARK_TEXT:
          markNodes.push(
            <div className={'gvtext-mark x' + x + " y" + y + " " + color}>
              <div className='gvtext-mark1'>{mark[3]}</div>
            </div>
          );
      }
    }
    return (
      <div className='gvmarks'>{markNodes}</div>
    );
  }

});

