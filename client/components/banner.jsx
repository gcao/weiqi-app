'use strict';

import React            from 'react';
import Weiqi            from '../weiqi';
import * as models      from '../weiqi/models';
import CustomEventMixin from './CustomEventMixin';
import {xyToLabel}      from './utils';

export default React.createClass({
  mixins: [CustomEventMixin],

  render: function() {
    var moveNumber = 0;
    var totalMoves = 0;
    var nextPlayerClass = "gvreset next-player-img";
    var blackPrisoners = 0, whitePrisoners = 0;

    var gameState = this.props.gameState;
    if (gameState) {
      moveNumber = gameState.currentNode.moveNumber;
      totalMoves = gameState.game.getMoves();
      if (gameState.getNextPlayer() === models.STONE_WHITE)
        nextPlayerClass += " gvsprite-15-white";
      else
        nextPlayerClass += " gvsprite-15-black";

      blackPrisoners = gameState.blackPrisoners;
      whitePrisoners = gameState.whitePrisoners;
    }

    return (
      <div className='gvreset gvbanner'>
        <div className='gvreset gvbanner-overlay'></div>
        <div className='gvreset gvbanner-left'>
          {
            this.props.config.locale === Weiqi.ZH_CN
            ? '中文'
            : <a className='gvreset localization' href="javascript:void(0)" onClick={this.customEventTrigger('changeLocale', Weiqi.ZH_CN)}>中文</a>
          }
          &nbsp;|&nbsp;
          {
            this.props.config.locale === Weiqi.EN_US
            ? 'EN'
            : <a className='gvreset localization' href="javascript:void(0)" onClick={this.customEventTrigger('changeLocale', Weiqi.EN_US)}>EN</a>
          }
          &nbsp;&nbsp;&nbsp;&nbsp;
          {jsgvTranslations['whose_turn']}
          &nbsp;
          <div className={nextPlayerClass} style={{display: 'inline-block'}}/>
        </div>
        <div className='gvreset gvmove-outer gvbutton'>
          <a className='gvreset'
             style={{verticalAlign: 'middle'}}
             href="javascript:void(0)"
             onClick={this.customEventTrigger('goTo')}
             title='Jump to XX [Alt Shift G]'>
            &nbsp;
            <span className='gvreset gvcontrol-text'>{moveNumber}</span>
            {totalMoves > 0 ? <span className='gvreset' style={{verticalAlign: 'middle'}}>/{totalMoves}</span> : ''}
            &nbsp;
          </a>
        </div>
        <div className='gvreset gvbanner-overlay'>
          <div className='gvreset gvprisoners-outer'>
            <div className='gvreset gvblack-prisoners-outer'>
              <span className='gvreset gvbutton'>
                <a href='javascript:void(0)'
                   onMouseOver={this.customEventTrigger('toggleBlackPrisoners', true)}
                   onMouseOut={this.customEventTrigger('toggleBlackPrisoners', false)}
                >
                  <div className='gvreset gvsprite-15-black_dead'
                       style={{display: 'inline-block', margin: -2, marginRight: 2}}>
                  </div>
                  &nbsp;
                  <span className='gvreset gvcontrol-text' style={{fontWeight: "normal"}}>{blackPrisoners}</span>
                </a>
              </span>
            </div>
            <div className='gvreset gvwhite-prisoners-outer'>
              <span className='gvreset gvbutton'>
                <a href='javascript:void(0)'
                   onMouseOver={this.customEventTrigger('toggleWhitePrisoners', true)}
                   onMouseOut={this.customEventTrigger('toggleWhitePrisoners', false)}
                >
                  <div className='gvreset gvsprite-15-white_dead'
                       style={{display: 'inline-block', margin: -2, marginRight: 2}}>
                  </div>
                  &nbsp;
                  <span className='gvreset gvcontrol-text' style={{fontWeight: "normal"}}>{whitePrisoners}</span>
                </a>
              </span>
            </div>
          </div>
          <div className='gvreset gvbanner-overlay'>
            <div style={{float: 'right', width: 45, marginTop: 3, textAlign: 'center', color: '#555'}}>{xyToLabel(this.props.mouseX, this.props.mouseY)}</div>
          </div>
        </div>
      </div>
    );
  }

});

