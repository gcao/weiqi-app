'use strict';

import React from 'react';

export default class extends React.Component {
  render() {
    var toggleNumberClass = 'gvreset';
    if (this.props.ctx.showMoveNumber)
      toggleNumberClass += " gvsprite-hidenumber";
    else
      toggleNumberClass += " gvsprite-shownumber";

    var isFirst = true, isLast = true;
    var gameState = this.props.ctx.gameState;
    if (gameState) {
      isFirst = gameState.isFirst();
      isLast = gameState.isLast();
    }
    var backClass = isFirst ? ' disabled' : '';
    var forwardClass = isLast ? ' disabled' : '';

    return (
      <div className='gvreset gvtoolbar'>
        <div className='gvreset gvtb-item'>
          <a className='gvreset toggleopacity' onClick={this.props.ctx.refresh} title='Refresh game/board [Alt Shift R]'>
            <div className='gvreset gvsprite-refresh'/>
          </a>
        </div>
        <div className='gvreset gvtb-item'>
          <a className='gvreset toggleopacity' onClick={this.props.ctx.toggleNumber} title='Show/hide move number [Alt Shift M]'>
            <div className={toggleNumberClass}/>
          </a>
        </div>
        <div className='gvreset gvtb-item'>
          <a className='gvreset toggleopacity' onClick={this.props.ctx.backAll} title='Back to beginning [Ctrl Alt &#8592;]'>
            <div className={'gvreset gvsprite-backall' + backClass}/>
          </a>
        </div>
        <div className='gvreset gvtb-item'>
          <a className='gvreset toggleopacity' onClick={this.props.ctx.backToComment} title='Previous comment or variation [Alt Shift &#8592;]'>
            <div className={'gvreset gvsprite-backc' + backClass}/>
          </a>
        </div>
        <div className='gvreset gvtb-item'>
          <a className='gvreset toggleopacity' onClick={this.props.ctx.backN} title='Fast back [Ctrl &#8592;]'>
            <div className={'gvreset gvsprite-backn' + backClass}/>
          </a>
        </div>
        <div className='gvreset gvtb-item'>
          <a className='gvreset toggleopacity' onClick={this.props.ctx.back} title='Back [&#8592;]'>
            <div className={'gvreset gvsprite-back' + backClass}/>
          </a>
        </div>
        <div className='gvreset gvtb-item'>
          <a className='gvreset toggleopacity' onClick={this.props.ctx.forward} title='Forward [&#8594;]'>
            <div className={'gvreset gvsprite-forward' + forwardClass}/>
          </a>
        </div>
        <div className='gvreset gvtb-item'>
          <a className='gvreset toggleopacity' onClick={this.props.ctx.forwardN} title='Fast forward [Ctrl &#8594;]'>
            <div className={'gvreset gvsprite-forwardn' + forwardClass}/>
          </a>
        </div>
        <div className='gvreset gvtb-item'>
          <a className='gvreset toggleopacity' onClick={this.props.ctx.forwardToComment} title='Next comment or variation [Alt Shift &#8594;]'>
            <div className={'gvreset gvsprite-forwardc' + forwardClass}/>
          </a>
        </div>
        <div className='gvreset gvtb-item'>
          <a className='gvreset toggleopacity' onClick={this.props.ctx.forwardAll} title='Forward to end [Ctrl Alt &#8594;]'>
            <div className={'gvreset gvsprite-forwardall' + forwardClass}/>
          </a>
        </div>
        <div className='gvreset gvtb-branches'></div>
      </div>
    );
  }
}

