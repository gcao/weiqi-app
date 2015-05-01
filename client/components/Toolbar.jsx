'use strict';

import React            from 'react';
import CustomEventMixin from './CustomEventMixin';

export default React.createClass({
  mixins: [CustomEventMixin],

  render: function() {
    var annotation = "";
    if (this.props.gameState.isFirst()) annotation += " gvmove-is-first";
    if (this.props.gameState.isLast())  annotation += " gvmove-is-last";

    return (
      <div className={'gvtoolbar' + annotation}>
        <div className='gvtb-item'>
          <a className='gvtoggleopacity' onClick={this.customEventTrigger('toggleNumber')} title='        Show/hide move number [Alt Shift M]'>
            <div className={this.props.config.showMoveNumber ? " gvsprite-hidenumber" : " gvsprite-shownumber"}/>
          </a>
        </div>
        <div className='gvtb-item'>
          <a className='gvtoggleopacity' onClick={this.customEventTrigger('backAll')} title='        Back to beginning [Ctrl Alt &#8592;]'>
            <div className='gvdisable-if-first gvsprite-backall'/>
          </a>
        </div>
        <div className='gvtb-item'>
          <a className='gvtoggleopacity' onClick={this.customEventTrigger('backToComment')} title='        Previous comment or variation [Alt Shift &#8592;]'>
            <div className='gvdisable-if-first gvsprite-backc'/>
          </a>
        </div>
        <div className='gvtb-item'>
          <a className='gvtoggleopacity' onClick={this.customEventTrigger('backN')} title='        Fast back [Ctrl &#8592;]'>
            <div className='gvdisable-if-first gvsprite-backn'/>
          </a>
        </div>
        <div className='gvtb-item'>
          <a className='gvtoggleopacity' onClick={this.customEventTrigger('back')} title='        Back [&#8592;]'>
            <div className='gvdisable-if-first gvsprite-back'/>
          </a>
        </div>
        <div className='gvtb-item'>
          <a className='gvtoggleopacity' onClick={this.customEventTrigger('forward')} title='        Forward [&#8594;]'>
            <div className='gvdisable-if-last gvsprite-forward'/>
          </a>
        </div>
        <div className='gvtb-item'>
          <a className='gvtoggleopacity' onClick={this.customEventTrigger('forwardN')} title='        Fast forward [Ctrl &#8594;]'>
            <div className='gvdisable-if-last gvsprite-forwardn'/>
          </a>
        </div>
        <div className='gvtb-item'>
          <a className='gvtoggleopacity' onClick={this.customEventTrigger('forwardToComment')} title='        Next comment or variation [Alt Shift &#8594;]'>
            <div className='gvdisable-if-last gvsprite-forwardc'/>
          </a>
        </div>
        <div className='gvtb-item'>
          <a className='gvtoggleopacity' onClick={this.customEventTrigger('forwardAll')} title='        Forward to end [Ctrl Alt &#8594;]'>
            <div className='gvdisable-if-last gvsprite-forwardall'/>
          </a>
        </div>
      </div>
    );
  }

});

