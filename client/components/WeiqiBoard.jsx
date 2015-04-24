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
import CustomEventMixin from './CustomEventMixin';

require('../stylesheets/WeiqiBoard.css');

export default React.createClass({
  mixins: [CustomEventMixin],

  getInitialState: function() {
    var config = {
      verticalLayout     : false,
      gridSize           : 21,
      fastMode           : 10,
      showMoveNumber     : false,
      activeBackground   : "#EECD7A",
      inactiveBackground : "#CCAB69",
      boardColor         : "#EECD7A",
      rightPaneHeight    : 446
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
    changeLocale: function(newLocale) {
      if (this.state.config.locale === newLocale)
        return;

      if (!Weiqi.LOCALES.indexOf(newLocale) < 0){
        alert("WeiqiBoard WARNING: Invalid locale '" + newLocale + "'");
        return;
      }

      this.state.config.locale = newLocale;
      window.jsgvTranslations = window["jsgv_" + newLocale];
      this.triggerRender()();
    },

    toggleBlackPrisoners: function(event) {
      this.state.config.showBlackPrisoners = !!event.detail;
      this.triggerRender();
    },

    toggleWhitePrisoners: function(event) {
      this.state.config.showWhitePrisoners = !!event.detail;
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

  setMousePosition: function(x, y) {
    this.mouseX = x;
    this.mouseY = y;
    this.triggerRender();
  },

  toggleNumber: function(){
    this.state.config.showMoveNumber = !this.state.config.showMoveNumber;
    this.triggerRender();
  },

  triggerRender: function() {
    this.setState({config: this.state.config});
  },

  render: function() {
    return (
      <div className='gvreset gameviewer'>
        <Banner gameState={this.state.gameState}/>
        <Board config={this.state.config} gameState={this.state.gameState}/>
        <Toolbar config={this.state.config} gameState={this.state.gameState}/>
        <div align='center' className='gvreset gvpoint-label'></div>
        <RightPane config={this.state.config} gameState={this.state.gameState}/>
      </div>
    );
  }

});

