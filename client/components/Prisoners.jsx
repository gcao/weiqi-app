'use strict';

import React       from 'react';
import PlaceHolder from './PlaceHolder';

export default class extends React.Component {
  render() {
    var prisoners = [];
    if (this.props.showBlackPrisoners) {
      var blackPrisoners = this.props.gameState.blackPrisonerPoints;
      for (var i=0; i<blackPrisoners.length; i++) {
        var prisoner = blackPrisoners[i];
        prisoners.push(<Prisoner x={prisoner[0]} y={prisoner[1]} color={prisoner[2]}/>);
      }
    } else if (this.props.showWhitePrisoners) {
      var whitePrisoners = this.props.gameState.whitePrisonerPoints;
      for (var i=0; i<whitePrisoners.length; i++) {
        var prisoner = whitePrisoners[i];
        prisoners.push(<Prisoner x={prisoner[0]} y={prisoner[1]} color={prisoner[2]}/>);
      }
    } else {
      return PlaceHolder;
    }

    return (
      <div className='gvreset gvboard-overlay'>
        {prisoners}
      </div>
    );
  }
}

