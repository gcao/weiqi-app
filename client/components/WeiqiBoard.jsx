'use strict';

import jQuery           from '../lib/jquery';
import React            from 'react';
import Weiqi            from '../weiqi';
import * as models      from '../weiqi/models';
import SGFParser        from '../weiqi/SGFParser';
import Banner           from './Banner';
import Board            from './Board';
import Toolbar          from './Toolbar';
import RightPane        from './RightPane';
import Info             from './Info';
import Comments         from './Comments';
import CustomEventMixin from './CustomEventMixin';
import {xyToLabel}      from './utils';

require('../stylesheets/WeiqiBoard.css');

var PORTRAIT = "portrait";

export default React.createClass({
  mixins: [CustomEventMixin],

  getInitialState: function() {
    var config = {
      locale         : Weiqi.ZH_CN,
      //layout         : 'default',
      layout         : PORTRAIT,
      fastMode       : 10,
      showMoveNumber : 0,
      boardColor     : "#EECD7A",
    };
    var game      = new models.Game();
    var gameState = new models.GameState(game);
    return {
      config      : config,
      gameState   : gameState
    };
  },

  componentWillMount: function() {
    var self = this;

    // Load game
    jQuery.ajax({
      url     : self.props.url,
      success : function(response){
        var game      = new SGFParser(Weiqi.WEIQI).parse(response);
        var gameState = new models.GameState(game);
        gameState.forwardAll();
        self.setState({gameState: gameState});
      }
    });
  },

  customEvents: {
    changeLocale: function(event) {
      var newLocale = event.detail;
      if (this.state.config.locale === newLocale)
        return;

      if (!Weiqi.LOCALES.indexOf(newLocale) < 0){
        alert("WeiqiBoard WARNING: Invalid locale '" + newLocale + "'");
        return;
      }

      this.state.config.locale = newLocale;
      window.jsgvTranslations = window["jsgv_" + newLocale];
      this.triggerRender();
    },

    toggleBlackPrisoners: function(event) {
      this.state.config.showBlackPrisoners = !!event.detail;
      this.triggerRender();
    },

    toggleWhitePrisoners: function(event) {
      this.state.config.showWhitePrisoners = !!event.detail;
      this.triggerRender();
    },

    showMousePosition: function(event) {
      this.state.mouseX = event.detail.x;
      this.state.mouseY = event.detail.y;
      this.triggerRender();
    },

    hideMousePosition: function(event) {
      this.state.mouseX = -1;
      this.state.mouseY = -1;
      this.triggerRender();
    },

    showMoveNumber: function(){
      var s = prompt('Please enter a number:\n n: show move numbers starting from n\n 0: hide move numbers\n-n: show move number on last n moves', 0);
      if (!s) return;
      var n = parseInt(s);
      if (isNaN(n)) {
        alert("Not a valid number.");
        return;
      }
      this.state.config.showMoveNumber = n;
      this.triggerRender();
    },

    forward: function(){
      if (this.state.gameState.forward())
        this.triggerRender();
    },

    forwardN: function(){
      var changed = false;
      for(var i=0; i<this.state.config.fastMode; i++){
        if (!this.state.gameState.forward())
          break;
        changed = true;
      }
      if (changed)
        this.triggerRender();
    },

    forwardToComment: function(){
      var changed = false;
      for(;;){
        if (!this.state.gameState.forward())
          break;
        changed = true;
        // stop at move that has comments or branches
        var node = this.state.gameState.currentNode;
        if (node.hasComment() || node.hasBranches())
          break;
      }
      if (changed)
        this.triggerRender();
    },

    forwardAll: function(){
      if (!this.state.gameState.isLast()) {
        this.state.gameState.forwardAll();
        this.triggerRender();
      }
    },

    back: function(){
      if (this.state.gameState.back())
        this.triggerRender();
    },

    backN: function(){
      var changed = false;
      for(var i=0; i<this.state.config.fastMode; i++){
        if (!this.state.gameState.back())
          break;
        changed = true;
      }
      if (changed)
        this.triggerRender();
    },

    backToComment: function(){
      var changed = false;
      for(;;){
        if (!this.state.gameState.back())
          break;
        changed = true;
        // stop at move that has comments or branches
        var node = this.state.gameState.currentNode;
        if (node.hasComment() || node.hasBranches())
          break;
      }
      if (changed)
        this.triggerRender();
    },

    backAll: function(){
      if (!this.state.gameState.isFirst()) {
        this.state.gameState.backAll();
        this.triggerRender();
      }
    },

    goTo: function(n){
      var s = prompt("Please enter the move number: ");
      if (!s) return;
      var n = parseInt(s);
      if (isNaN(n) || n < 0) {
        alert("Not a valid move number.");
        return;
      }

      var gameState = this.state.gameState;
      while (gameState.isOnBranch()){
        gameState.back();
      }
      if (n >= gameState.game.getMoves()){
        gameState.forwardAll();
      } else if (n <= 0) {
        gameState.backAll();
      } else if (n > gameState.currentNode.moveNumber) {
        while(n > gameState.currentNode.moveNumber){
          if (!gameState.forward())
            break;
        }
      } else if (n < gameState.currentNode.moveNumber) {
        while(n < gameState.currentNode.moveNumber){
          if (!gameState.back())
            break;
        }
      }
      this.triggerRender();
    },

    goToBranch: function(event){
      var n = event.detail;
      if (this.state.gameState.goToBranch(n))
        this.triggerRender();
    }

  },

  triggerRender: function() {
    this.setState({config: this.state.config});
  },

  render: function() {
    if (this.state.config.layout === PORTRAIT) {
      return (
        <div className={'gameviewer gv' + PORTRAIT}>
          <Info      game={this.state.gameState.game}/>
          <Banner    config={this.state.config} gameState={this.state.gameState}
                     mouseX={this.state.mouseX} mouseY={this.state.mouseY}/>
          <Board     config={this.state.config} gameState={this.state.gameState}/>
          <Toolbar   config={this.state.config} gameState={this.state.gameState}/>
          <div className='gvboard-label'>{xyToLabel(this.state.mouseX, this.state.mouseY)}</div>
          <Comments  node={this.state.gameState.currentNode}/>
        </div>
      );
    } else {
      return (
        <div className={'gameviewer default'}>
          <Banner    config={this.state.config} gameState={this.state.gameState}
                     mouseX={this.state.mouseX} mouseY={this.state.mouseY}/>
          <div className='gvboard-label'>{xyToLabel(this.state.mouseX, this.state.mouseY)}</div>
          <Board     config={this.state.config} gameState={this.state.gameState}/>
          <Toolbar   config={this.state.config} gameState={this.state.gameState}/>
          <RightPane config={this.state.config} gameState={this.state.gameState}/>
        </div>
      );
    }
  }

});

