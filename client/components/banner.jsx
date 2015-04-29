'use strict';

import React            from 'react';
import Weiqi            from '../weiqi';
import * as models      from '../weiqi/models';
import CustomEventMixin from './CustomEventMixin';
import {xyToLabel}      from './utils';

export default React.createClass({
  mixins: [CustomEventMixin],

  render: function() {
    var gameState  = this.props.gameState;
    var totalMoves = gameState.game.getMoves();

    return (
      <div className='gvbanner'>
        <div className='gvbanner-left'>
          {
            this.props.config.locale === Weiqi.ZH_CN
            ? '中文'
            : <a className='localization' href="javascript:void(0)" onClick={this.customEventTrigger('changeLocale', Weiqi.ZH_CN)}>中文</a>
          }
          &nbsp;|&nbsp;
          {
            this.props.config.locale === Weiqi.EN_US
            ? 'EN'
            : <a className='localization' href="javascript:void(0)" onClick={this.customEventTrigger('changeLocale', Weiqi.EN_US)}>EN</a>
          }
          &nbsp;&nbsp;&nbsp;&nbsp;
          {jsgvTranslations['whose_turn']}
          &nbsp;
          <div className={"gvnext-player " + gameState.getNextPlayer()}/>
        </div>
        <div className='gvbanner-move'>
          <a href="javascript:void(0)"
             onClick={this.customEventTrigger('goTo')}
             title='Jump to XX [Alt Shift G]'>
            &nbsp;
            <span className='gvcontrol-text'>{gameState.currentNode.moveNumber}</span>
            {totalMoves > 0 ? '/' + totalMoves : ''}
            &nbsp;
          </a>
        </div>
        <div className='gvbanner-overlay'>
          <div className='gvprisoners-outer'>
            <div className='gvblack-prisoners-outer gvbutton'>
              <a href='javascript:void(0)'
                 onMouseOver={this.customEventTrigger('toggleBlackPrisoners', true)}
                 onMouseOut={this.customEventTrigger('toggleBlackPrisoners', false)}
              >
                <div className='gvprisoner-img'/>
                &nbsp;
                <span className='gvcontrol-text'>{gameState.blackPrisoners}</span>
              </a>
            </div>
            <div className='gvwhite-prisoners-outer gvbutton'>
              <a href='javascript:void(0)'
                 onMouseOver={this.customEventTrigger('toggleWhitePrisoners', true)}
                 onMouseOut={this.customEventTrigger('toggleWhitePrisoners', false)}
              >
                <div className='gvprisoner-img'/>
                &nbsp;
                <span className='gvcontrol-text'>{gameState.whitePrisoners}</span>
              </a>
            </div>
          </div>
          <div className='gvbanner-overlay'>
            <div className='gvboard-label'>{xyToLabel(this.props.mouseX, this.props.mouseY)}</div>
          </div>
        </div>
      </div>
    );
  }

});

