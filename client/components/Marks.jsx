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
      var styleClass = "";
      switch(mark[2]){
        case models.MARK_CROSS:
          styleClass = "gvsprite-21-markcross";
          break;
        case models.MARK_TRIANGLE:
          styleClass = "gvsprite-21-marktriangle";
          break;
        case models.MARK_SQUARE:
          styleClass = "gvsprite-21-marksquare";
          break;
        case models.MARK_CIRCLE:
          styleClass = "gvsprite-21-markcircle";
          break;
        case models.MARK_TERR_BLACK:
          styleClass = "gvsprite-21-markblack";
          break;
        case models.MARK_TERR_WHITE:
          styleClass = "gvsprite-21-markwhite";
          break;
        case models.MARK_TEXT:
          markNodes.push(
            <div className={'gvtext-mark cell x' + x + " y" + y + " " + color}>{mark[3]}</div>
          );
          continue; // skip logic below
      }
      markNodes.push(
        <div className={"gvmark " + styleClass + " x" + x + " y" + y + " " + color}/>
      );
    }
    return (
      <div className='gvmarks gvboard-overlay'>{markNodes}</div>
    );
  }

});

