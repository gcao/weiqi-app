'use strict';

import React            from 'react';
import CustomEventMixin from './CustomEventMixin';

export default React.createClass({
  mixins: [CustomEventMixin],

  render: function() {
    var toggleNumberClass = 'gvreset';
    if (this.props.config.showMoveNumber)
      toggleNumberClass += " gvsprite-hidenumber";
    else
      toggleNumberClass += " gvsprite-shownumber";

    var isFirst = true, isLast = true;
    var gameState = this.props.gameState;
    if (gameState) {
      isFirst = gameState.isFirst();
      isLast = gameState.isLast();
    }
    var backClass = isFirst ? ' disabled' : '';
    var forwardClass = isLast ? ' disabled' : '';

    return (
      <div className='gvreset gvtoolbar'>
        <div className='gvreset gvtb-item'>
          <a className='gvreset toggleopacity' onClick={this.customEventTrigger('refresh')} title='Refresh game/board [Alt Shift R]'>
            <div className='gvreset gvsprite-refresh'/>
          </a>
        </div>
        <div className='gvreset gvtb-item'>
          <a className='gvreset toggleopacity' onClick={this.customEventTrigger('toggleNumber')} title='Show/hide move number [Alt Shift M]'>
            <div className={toggleNumberClass}/>
          </a>
        </div>
        <div className='gvreset gvtb-item'>
          <a className='gvreset toggleopacity' onClick={this.customEventTrigger('backAll')} title='Back to beginning [Ctrl Alt &#8592;]'>
            <div className={'gvreset gvsprite-backall' + backClass}/>
          </a>
        </div>
        <div className='gvreset gvtb-item'>
          <a className='gvreset toggleopacity' onClick={this.customEventTrigger('backToComment')} title='Previous comment or variation [Alt Shift &#8592;]'>
            <div className={'gvreset gvsprite-backc' + backClass}/>
          </a>
        </div>
        <div className='gvreset gvtb-item'>
          <a className='gvreset toggleopacity' onClick={this.customEventTrigger('backN')} title='Fast back [Ctrl &#8592;]'>
            <div className={'gvreset gvsprite-backn' + backClass}/>
          </a>
        </div>
        <div className='gvreset gvtb-item'>
          <a className='gvreset toggleopacity' onClick={this.customEventTrigger('back')} title='Back [&#8592;]'>
            <div className={'gvreset gvsprite-back' + backClass}/>
          </a>
        </div>
        <div className='gvreset gvtb-item'>
          <a className='gvreset toggleopacity' onClick={this.customEventTrigger('forward')} title='Forward [&#8594;]'>
            <div className={'gvreset gvsprite-forward' + forwardClass}/>
          </a>
        </div>
        <div className='gvreset gvtb-item'>
          <a className='gvreset toggleopacity' onClick={this.customEventTrigger('forwardN')} title='Fast forward [Ctrl &#8594;]'>
            <div className={'gvreset gvsprite-forwardn' + forwardClass}/>
          </a>
        </div>
        <div className='gvreset gvtb-item'>
          <a className='gvreset toggleopacity' onClick={this.customEventTrigger('forwardToComment')} title='Next comment or variation [Alt Shift &#8594;]'>
            <div className={'gvreset gvsprite-forwardc' + forwardClass}/>
          </a>
        </div>
        <div className='gvreset gvtb-item'>
          <a className='gvreset toggleopacity' onClick={this.customEventTrigger('forwardAll')} title='Forward to end [Ctrl Alt &#8594;]'>
            <div className={'gvreset gvsprite-forwardall' + forwardClass}/>
          </a>
        </div>
        <div className='gvreset gvtb-branches'></div>
      </div>
    );
  }

});

