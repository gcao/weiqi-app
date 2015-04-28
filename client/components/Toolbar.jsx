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
    var backClass = isFirst ? ' gvdisabled' : '';
    var forwardClass = isLast ? ' gvdisabled' : '';

    return (
      <div className='gvtoolbar'>
        <div className='gvtb-item'>
          <a className='gvtoggleopacity' onClick={this.customEventTrigger('toggleNumber')} title='Show/hide move number [Alt Shift M]'>
            <div className={toggleNumberClass}/>
          </a>
        </div>
        <div className='gvtb-item'>
          <a className='gvtoggleopacity' onClick={this.customEventTrigger('backAll')} title='Back to beginning [Ctrl Alt &#8592;]'>
            <div className={'gvsprite-backall' + backClass}/>
          </a>
        </div>
        <div className='gvtb-item'>
          <a className='gvtoggleopacity' onClick={this.customEventTrigger('backToComment')} title='Previous comment or variation [Alt Shift &#8592;]'>
            <div className={'gvsprite-backc' + backClass}/>
          </a>
        </div>
        <div className='gvtb-item'>
          <a className='gvtoggleopacity' onClick={this.customEventTrigger('backN')} title='Fast back [Ctrl &#8592;]'>
            <div className={'gvsprite-backn' + backClass}/>
          </a>
        </div>
        <div className='gvtb-item'>
          <a className='gvtoggleopacity' onClick={this.customEventTrigger('back')} title='Back [&#8592;]'>
            <div className={'gvsprite-back' + backClass}/>
          </a>
        </div>
        <div className='gvtb-item'>
          <a className='gvtoggleopacity' onClick={this.customEventTrigger('forward')} title='Forward [&#8594;]'>
            <div className={'gvsprite-forward' + forwardClass}/>
          </a>
        </div>
        <div className='gvtb-item'>
          <a className='gvtoggleopacity' onClick={this.customEventTrigger('forwardN')} title='Fast forward [Ctrl &#8594;]'>
            <div className={'gvsprite-forwardn' + forwardClass}/>
          </a>
        </div>
        <div className='gvtb-item'>
          <a className='gvtoggleopacity' onClick={this.customEventTrigger('forwardToComment')} title='Next comment or variation [Alt Shift &#8594;]'>
            <div className={'gvsprite-forwardc' + forwardClass}/>
          </a>
        </div>
        <div className='gvtb-item'>
          <a className='gvtoggleopacity' onClick={this.customEventTrigger('forwardAll')} title='Forward to end [Ctrl Alt &#8594;]'>
            <div className={'gvsprite-forwardall' + forwardClass}/>
          </a>
        </div>
      </div>
    );
  }

});

