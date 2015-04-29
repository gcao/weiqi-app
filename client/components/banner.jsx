'use strict';

import React            from 'react';
import Weiqi            from '../weiqi';
import * as models      from '../weiqi/models';
import CustomEventMixin from './CustomEventMixin';
import {xyToLabel}      from './utils';

export default React.createClass({
  mixins: [CustomEventMixin],

  render: function() {
    var gameState = this.props.gameState;

    var nextPlayerClass = "gvreset next-player-img " + gameState.getNextPlayer();
    var moveNumber = gameState.currentNode.moveNumber;
    var totalMoves = gameState.game.getMoves();
    var blackPrisoners = gameState.blackPrisoners;
    var whitePrisoners = gameState.whitePrisoners;

    return (
      <div className='gvbanner'>
        <div className='gvbanner-overlay'></div>
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
          <div className={nextPlayerClass}/>
        </div>
        <div className='gvmove-outer gvbutton'>
          <a href="javascript:void(0)"
             onClick={this.customEventTrigger('goTo')}
             title='Jump to XX [Alt Shift G]'>
            &nbsp;
            <span className='gvcontrol-text'>{moveNumber}</span>
            {totalMoves > 0 ? '/' + totalMoves : ''}
            &nbsp;
          </a>
        </div>
        <div className='gvbanner-overlay'>
          <div className='gvprisoners-outer'>
            <div className='gvblack-prisoners-outer'>
              <span className='gvbutton'>
                <a href='javascript:void(0)'
                   onMouseOver={this.customEventTrigger('toggleBlackPrisoners', true)}
                   onMouseOut={this.customEventTrigger('toggleBlackPrisoners', false)}
                >
                  <div className='gvprisoner-img gvsprite-15-black_dead'></div>
                  &nbsp;
                  <span className='gvcontrol-text'>{blackPrisoners}</span>
                </a>
              </span>
            </div>
            <div className='gvwhite-prisoners-outer'>
              <span className='gvbutton'>
                <a href='javascript:void(0)'
                   onMouseOver={this.customEventTrigger('toggleWhitePrisoners', true)}
                   onMouseOut={this.customEventTrigger('toggleWhitePrisoners', false)}
                >
                  <div className='gvprisoner-img gvsprite-15-white_dead'></div>
                  &nbsp;
                  <span className='gvcontrol-text'>{whitePrisoners}</span>
                </a>
              </span>
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

