'use strict';

import jQuery      from '../lib/jquery';
import React       from 'react';
import Weiqi       from '../weiqi';
import * as models from '../weiqi/models';
import SGFParser   from '../weiqi/SGFParser';
import Banner      from './Banner';
import Board       from './Board';
import Toolbar     from './Toolbar';
import RightPane   from './RightPane';

require('../stylesheets/WeiqiBoard.css');

export default class extends React.Component {
  componentWillMount() {
    var self = this;

    // Load game
    jQuery.ajax({
      url:this.props.url,
      success:function(response){
        var game = new SGFParser(Weiqi.WEIQI).parse(response);
        self.setState({
          game: game,
          gameState: new models.GameState(game)
        });
        self.forwardAll();
      }
    });
  }

  changeLocale(newLocale) {
    if (this.config.locale === newLocale)
      return;

    if (!Weiqi.LOCALES.indexOf(newLocale) < 0){
      alert("WeiqiBoard WARNING: Invalid locale '" + newLocale + "'");
      return;
    }

    this.config.locale = newLocale;
    window.jsgvTranslations = window["jsgv_" + newLocale];
    this.render();
  }

  changeLocaleToEnglish() {
    this.changeLocale('en_us');
  }

  changeLocaleToChinese() {
    this.changeLocale('zh_cn');
  }

  setShowBlackPrisoners(flag) {
    if (this.showBlackPrisoners !== flag) {
      this.showBlackPrisoners = flag;
      this.render();
    }
  }

  setShowWhitePrisoners(flag) {
    if (this.showWhitePrisoners !== flag) {
      this.showWhitePrisoners = flag;
      this.render();
    }
  }

  setMousePosition(x, y) {
    this.mouseX = x;
    this.mouseY = y;
    this.render();
  }

  refresh(){
    this.refresh();
  }

  toggleNumber(){
    this.config.showMoveNumber = !this.config.showMoveNumber;
    this.render();
  }

  forward(){
    if (!this.gameState) return;

    if (this.gameState.forward())
      this.render();
  }

  forwardN(){
    if (!this.gameState) return;

    var changed = false;
    for(var i=0; i<this.config.fastMode; i++){
      if (!this.gameState.forward())
        break;
      changed = true;
    }
    if (changed)
      this.render();
  }

  forwardToComment(){
    if (!this.gameState) return;

    var changed = false;
    for(;;){
      if (!this.gameState.forward())
        break;
      changed = true;
      // stop at move that has comments or branches
      var node = this.gameState.currentNode;
      if (node.hasComment() || node.hasBranches())
        break;
    }
    if (changed)
      this.render();
  }

  forwardAll(){
    if (!this.gameState) return;

    if (!this.gameState.isLast()) {
      this.gameState.forwardAll();
      this.render();
    }
  }

  back(){
    if (!this.gameState) return;

    if (this.gameState.back())
      this.render();
  }

  backN(){
    if (!this.gameState) return;

    var changed = false;
    for(var i=0; i<this.config.fastMode; i++){
      if (!this.gameState.back())
        break;
      changed = true;
    }
    if (changed)
      this.render();
  }

  backToComment(){
    if (!this.gameState) return;

    var changed = false;
    for(;;){
      if (!this.gameState.back())
        break;
      changed = true;
      // stop at move that has comments or branches
      var node = this.gameState.currentNode;
      if (node.hasComment() || node.hasBranches())
        break;
    }
    if (changed)
      this.render();
  }

  backAll(){
    if (!this.gameState) return;

    if (!this.gameState.isFirst()) {
      this.gameState.backAll();
      this.render();
    }
  }

  goTo(n){
    if (!this.gameState) return;

    var s = prompt("Please enter the move number: ");
    if (!s) return;
    var n = parseInt(s);
    if (isNaN(n) || n < 0) {
      alert("Not a valid move number.");
      return;
    }

    var _this = this;
    while (this.gameState.isOnBranch()){
      this.back();
    }
    if (n >= this.gameState.game.getMoves()){
      this.forwardAll();
    } else if (n <= 0) {
      this.backAll();
    } else if (n > this.gameState.currentNode.moveNumber) {
      var changed = false;
      while(n > this.gameState.currentNode.moveNumber){
        if (!this.gameState.forward())
          break;
        changed = true;
      }
      if (changed)
        this.render();
    } else if (n < this.gameState.currentNode.moveNumber) {
      var changed = false;
      while(n < this.gameState.currentNode.moveNumber){
        if (!this.gameState.back())
          break;
        changed = true;
      }
      if (changed)
        this.render();
    }
  }

  goToBranch(n){
    if (this.gameState && this.gameState.goToBranch(n))
      this.render();
  }

  render() {
    var game = this.state ? this.state.game : null;
    var gameState = this.state ? this.state.gameState : null;

    return (
      <div className='gvreset gameviewer'>
        <Banner ctx={this}/>
        <Board ctx={this}/>
        <Toolbar ctx={this}/>
        <div align='center' className='gvreset gvpoint-label'></div>
        <RightPane ctx={this} game={game} gameState={gameState}/>
      </div>
    );
  }

}
