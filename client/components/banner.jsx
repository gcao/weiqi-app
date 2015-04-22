'use strict';

var React = require('react');

import * as models from '../weiqi/models';

export default class Banner extends React.Component {
  render() {
    var moveNumber = 0;
    var totalMoves = 0;
    var nextPlayerClass = "gvreset nextPlayerImg";
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
            this.props.locale === 'zh_cn'
            ? '中文'
            : <a className='gvreset localization'>中文</a>
          }
          &nbsp;|&nbsp;
          {
            this.props.locale === 'en_us'
            ? 'EN'
            : <a className='gvreset localization'>EN</a>
          }
          &nbsp;&nbsp;&nbsp;&nbsp;
          {jsgvTranslations['whose_turn']}
          &nbsp;
          <div className={nextPlayerClass} style={{display: 'inline-block'}}/>
        </div>
        <div className='gvreset gvmove-outer gvbutton'>
          <a className='gvreset'
             style={{verticalAlign: 'middle'}}
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
                <a href='javascript:void(0)'>
                  <div className='gvreset gvsprite-15-black_dead' style={{display: 'inline-block', margin: -2, marginRight: 2}} onMouseEnter={this.showBlackPrisoners}/>
                  &nbsp;
                  <span className='gvreset gvcontrol-text' style={{fontWeight: "normal"}}>{blackPrisoners}</span>
                </a>
              </span>
            </div>
            <div className='gvreset gvwhite-prisoners-outer'>
              <span className='gvreset gvbutton'>
                <a href='javascript:void(0)'>
                  <div className='gvreset gvsprite-15-white_dead' style={{display: 'inline-block', margin: -2, marginRight: 2}}/>
                  &nbsp;
                  <span className='gvreset gvcontrol-text' style={{fontWeight: "normal"}}>{whitePrisoners}</span>
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

