'use strict';

import React    from 'react';
import Info     from './Info';
import Comments from './Comments';

export default class extends React.Component {
  render() {
    if (!this.props.gameState)
      return (<div className='gvreset gvright-pane'></div>);

    return (
      <div className='gvreset gvright-pane'>
        <Info ref="info" game={this.props.game}/>
        <Comments ref="comment" ctx={this.props.ctx}/>
      </div>
    );
  }
}

