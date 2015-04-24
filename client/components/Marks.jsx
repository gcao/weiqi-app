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
      var area = xyToArea(x,y,21);
      var left = area[0], top = area[1], width = area[2], height = area[3];
      var styleClass = "";
      switch(mark[2]){
        case jsGameViewer.model.MARK_CROSS:
          styleClass = "gvsprite-21-markcross";
          break;
        case jsGameViewer.model.MARK_TRIANGLE:
          styleClass = "gvsprite-21-marktriangle";
          break;
        case jsGameViewer.model.MARK_SQUARE:
          styleClass = "gvsprite-21-marksquare";
          break;
        case jsGameViewer.model.MARK_CIRCLE:
          styleClass = "gvsprite-21-markcircle";
          break;
        case jsGameViewer.model.MARK_TERR_BLACK:
          styleClass = "gvsprite-21-markblack";
          break;
        case jsGameViewer.model.MARK_TERR_WHITE:
          styleClass = "gvsprite-21-markwhite";
          break;
        case jsGameViewer.model.MARK_TEXT:
          markNodes.push(
            <div style={{
              position: 'absolute',
              left: left,
              top: top + 1,
              width: width,
              height: height,
              textAlign: 'center',
              verticalAlign: 'middle',
              color: 'red',
              fontWeight: 'bolder',
              fontSize: 15,
              backgroundColor: color === models.STONE_NONE ? "#EECD7A" : ''
            }}>{mark[3]}</div>
          );
          continue; // skip logic below
      }
      markNodes.push(
        <div className={styleClass}
             style={{
               position: 'absolute',
               left: left,
               top: top,
               backgroundColor: color === models.STONE_NONE ? "#EECD7A" : ''
             }}/>
      );
    }
    return (
      <div className='gvreset gvboard-overlay'>{markNodes}</div>
    );
  }

});

