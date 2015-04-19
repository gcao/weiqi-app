'use strict';

var jq4gv = require('../lib/jquery');
var React = require('react');

import Weiqi from '../weiqi';

require('../stylesheets/WeiqiBoard.scss');

export default class WeiqiBoard extends React.Component {
  render() {
    return (
      <div>
      	WeiqiBoard
      </div>
    );
  }
}

var LABELS = ['A','B','C','D','E','F','G','H','J','K','L','M','N','O','P','Q','R','S','T'];
var BRANCHES = ['A','B','C','D','E','F','G','H','I','J'];
var BRANCHES_NAME = [jsgvTranslations['trunk'],
  jsgvTranslations['branch_1'], jsgvTranslations['branch_2'], jsgvTranslations['branch_3'],
  jsgvTranslations['branch_4'], jsgvTranslations['branch_5'], jsgvTranslations['branch_6'],
  jsgvTranslations['branch_7'], jsgvTranslations['branch_8'], jsgvTranslations['branch_9']
];
var EMPTY_DIV = <div style={{display: "none"}}/>;

function xyToLabel(x,y){
  if (typeof x !== 'number' || typeof y !== 'number') return;
  if (x < 0 || x >= 19 || y < 0 || y >= 19) return;

  var s = LABELS[x];
  s += 19 - parseInt(y);
  return s;
}

// Default view configuration
jq4gv.extend(Weiqi.CONFIG, {
  verticalLayout: true,
  gridSize:21,
  fastMode:10,
  showMoveNumber:false,
  activeBackground: "#EECD7A",
  inactiveBackground: "#CCAB69",
  boardColor:"#EECD7A",
  gridSizeWQ:21,
  gridSizeDQ:19,
  boardColorDQ:"#CCAB69",
  vbw:4,
  boardSizeDQ:27,
  rightPaneHeight:446,
  rightPaneHeightDQ:560
});

Weiqi.GameView = function(ctrl, config) {
  this.ctrl = ctrl;
  this.config = config;
  this.id = this.ctrl.id;
  this.jqId = this.ctrl.jqId;

  // public api from original view.js
  this.destroyView = function(){
    jq4gv(this.jqId).remove();
  }

  // public api from original view.js
  this.initView = function(){
    if (this.ctrl.initialized())
      return this;
    this.render();
  }

  // public api from original view.js
  this.initGame = function(){
  }

  this.changeLocale = function(newLocale) {
    if (this.config.locale === newLocale)
      return;

    if (!Weiqi.LOCALES.indexOf(newLocale) < 0){
      alert("Weiqi WARNING: Invalid locale '" + newLocale + "'");
      return;
    }

    this.config.locale = newLocale;
    window.jsgvTranslations = window["jsgv_" + newLocale];
    this.render();
  };

  this.changeLocaleToEnglish = function() {
    this.changeLocale('en_us');
  }.bind(this);

  this.changeLocaleToChinese = function() {
    this.changeLocale('zh_cn');
  }.bind(this);

  this.setShowBlackPrisoners = function(flag) {
    if (this.showBlackPrisoners !== flag) {
      this.showBlackPrisoners = flag;
      this.render();
    }
  }.bind(this);

  this.setShowWhitePrisoners = function(flag) {
    if (this.showWhitePrisoners !== flag) {
      this.showWhitePrisoners = flag;
      this.render();
    }
  }.bind(this);

  this.setMousePosition = function(x, y) {
    this.mouseX = x;
    this.mouseY = y;
    this.render();
  }.bind(this);

  this.refresh = function(){
    this.ctrl.refresh();
  }.bind(this);

  this.toggleNumber = function(){
    this.config.showMoveNumber = !this.config.showMoveNumber;
    this.render();
  }.bind(this);

  this.forward = function(){
    if (!this.ctrl.gameState) return;

    if (this.ctrl.gameState.forward())
      this.render();
  }.bind(this);

  this.forwardN = function(){
    if (!this.ctrl.gameState) return;

    var changed = false;
    for(var i=0; i<this.config.fastMode; i++){
      if (!this.ctrl.gameState.forward())
        break;
      changed = true;
    }
    if (changed)
      this.render();
  }.bind(this);

  this.forwardToComment = function(){
    if (!this.ctrl.gameState) return;

    var changed = false;
    for(;;){
      if (!this.ctrl.gameState.forward())
        break;
      changed = true;
      // stop at move that has comments or branches
      var node = this.ctrl.gameState.currentNode;
      if (node.hasComment() || node.hasBranches())
        break;
    }
    if (changed)
      this.render();
  }.bind(this);

  this.forwardAll = function(){
    if (!this.ctrl.gameState) return;

    if (!this.ctrl.gameState.isLast()) {
      this.ctrl.gameState.forwardAll();
      this.render();
    }
  }.bind(this);

  this.back = function(){
    if (!this.ctrl.gameState) return;

    if (this.ctrl.gameState.back())
      this.render();
  }.bind(this);

  this.backN = function(){
    if (!this.ctrl.gameState) return;

    var changed = false;
    for(var i=0; i<this.config.fastMode; i++){
      if (!this.ctrl.gameState.back())
        break;
      changed = true;
    }
    if (changed)
      this.render();
  }.bind(this);

  this.backToComment = function(){
    if (!this.ctrl.gameState) return;

    var changed = false;
    for(;;){
      if (!this.ctrl.gameState.back())
        break;
      changed = true;
      // stop at move that has comments or branches
      var node = this.ctrl.gameState.currentNode;
      if (node.hasComment() || node.hasBranches())
        break;
    }
    if (changed)
      this.render();
  }.bind(this);

  this.backAll = function(){
    if (!this.ctrl.gameState) return;

    if (!this.ctrl.gameState.isFirst()) {
      this.ctrl.gameState.backAll();
      this.render();
    }
  }.bind(this);

  this.goTo = function(n){
    if (!this.ctrl.gameState) return;

    var s = prompt("Please enter the move number: ");
    if (!s) return;
    var n = parseInt(s);
    if (isNaN(n) || n < 0) {
      alert("Not a valid move number.");
      return;
    }

    var _this = this;
    while (this.ctrl.gameState.isOnBranch()){
      this.back();
    }
    if (n >= this.ctrl.gameState.game.getMoves()){
      this.forwardAll();
    } else if (n <= 0) {
      this.backAll();
    } else if (n > this.ctrl.gameState.currentNode.moveNumber) {
      var changed = false;
      while(n > this.ctrl.gameState.currentNode.moveNumber){
        if (!this.ctrl.gameState.forward())
          break;
        changed = true;
      }
      if (changed)
        this.render();
    } else if (n < this.ctrl.gameState.currentNode.moveNumber) {
      var changed = false;
      while(n < this.ctrl.gameState.currentNode.moveNumber){
        if (!this.ctrl.gameState.back())
          break;
        changed = true;
      }
      if (changed)
        this.render();
    }
  }.bind(this);

  this.goToBranch = function(n){
    if (this.ctrl.gameState && this.ctrl.gameState.goToBranch(n))
      this.render();
  },

  this.render = function(){
    React.render(<Viewer ctx={this}/>, document.getElementById(this.id));
  }
}

function xyToArea(x,y,gridSize) {
  return [x*gridSize, y*gridSize, gridSize, gridSize];
}

/**
 * Top level widget
 */
var Viewer = React.createClass({
  render: function() {
    var gameState = this.props.ctx.ctrl.gameState;
    if (this.props.ctx.config.verticalLayout) {
      return (
        <div className='gvreset' style={{width: 470, border: '1px solid black', background: '#EECD7A'}}>
          { gameState
            ? <div style={{margin: 1, border: '1px solid gray', background: 'white'}}><Info game={this.props.ctx.ctrl.gameState.game}/></div>
            : ''
          }
          <div className='gvreset gameviewer' style={{width: 470, border: 0}}>
            <Banner ctx={this.props.ctx}/>
            <Board ctx={this.props.ctx}/>
            <Toolbar ctx={this.props.ctx}/>
            <div align='center' className='gvreset gvpoint-label'></div>
          </div>
          { gameState && gameState.currentNode.comment
            ? <div style={{margin: 1, border: '1px solid gray', background: 'white'}}><Comment ctx={this.props.ctx}/></div>
            : ''
          }
        </div>
      );
    } else {
      return (
        <div className='gvreset gameviewer'>
          <Banner ctx={this.props.ctx}/>
          <Board ctx={this.props.ctx}/>
          <Toolbar ctx={this.props.ctx}/>
          <div align='center' className='gvreset gvpoint-label'></div>
          <RightPane ctx={this.props.ctx}/>
        </div>
      );
    }
  }
});

var Banner = React.createClass({
  showBlackPrisoners: function() {
    this.props.ctx.setShowBlackPrisoners(true);
  },

  hideBlackPrisoners: function() {
    this.props.ctx.setShowBlackPrisoners(false);
  },

  showWhitePrisoners: function() {
    this.props.ctx.setShowWhitePrisoners(true);
  },

  hideWhitePrisoners: function() {
    this.props.ctx.setShowWhitePrisoners(false);
  },

  render: function() {
    var ctx = this.props.ctx;
    var moveNumber = 0;
    var totalMoves = 0;
    var nextPlayerClass = "gvreset nextPlayerImg";
    var blackPrisoners = 0, whitePrisoners = 0;

    var gameState = this.props.ctx.ctrl.gameState;
    if (gameState) {
      moveNumber = gameState.currentNode.moveNumber;
      totalMoves = gameState.game.getMoves();
      if (gameState.getNextPlayer() === Weiqi.model.STONE_WHITE)
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
            ctx.config.locale === 'zh_cn'
            ? '中文'
            : <a className='gvreset localization' onClick={this.props.ctx.changeLocaleToChinese}>中文</a>
          }
          &nbsp;|&nbsp;
          {
            ctx.config.locale === 'en_us'
            ? 'EN'
            : <a className='gvreset localization' Click={this.props.ctx.changeLocaleToEnglish}>EN</a>
          }
          &nbsp;&nbsp;&nbsp;&nbsp;
          {jsgvTranslations['whose_turn']}
          &nbsp;
          <div className={nextPlayerClass} style={{display: 'inline-block'}}/>
        </div>
        <div className='gvreset gvmove-outer gvbutton'>
          <a className='gvreset'
             style={{verticalAlign: 'middle'}}
             onClick={this.props.ctx.goTo}
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
                <a href='javascript:void(0)' onMouseOver={this.showBlackPrisoners} onMouseOut={this.hideBlackPrisoners}>
                  <div className='gvreset gvsprite-15-black_dead' style={{display: 'inline-block', margin: -2, marginRight: 2}} onMouseEnter={this.showBlackPrisoners}/>
                  &nbsp;
                  <span className='gvreset gvcontrol-text' style={{fontWeight: "normal"}}>{blackPrisoners}</span>
                </a>
              </span>
            </div>
            <div className='gvreset gvwhite-prisoners-outer'>
              <span className='gvreset gvbutton'>
                <a href='javascript:void(0)' onMouseOver={this.showWhitePrisoners} onMouseOut={this.hideWhitePrisoners}>
                  <div className='gvreset gvsprite-15-white_dead' style={{display: 'inline-block', margin: -2, marginRight: 2}}/>
                  &nbsp;
                  <span className='gvreset gvcontrol-text' style={{fontWeight: "normal"}}>{whitePrisoners}</span>
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className='gvreset gvbanner-overlay'>
          <div style={{float: 'right', width: 50, marginTop: 3, textAlign: 'center', color: '#555'}}>{xyToLabel(this.props.ctx.mouseX, this.props.ctx.mouseY)}</div>
        </div>
      </div>
    );
  }
});

var Board = React.createClass({

  mouseMoveHandler: function(e){
    var e = e.nativeEvent;
    var layerX = e.layerX || e.offsetX || e.clientX;
    var layerY = e.layerY || e.offsetY || e.clientY;

    var gridSize = this.props.ctx.config.gridSize;
    var x = parseInt(layerX/gridSize);
    var y = parseInt(layerY/gridSize);

    this.props.ctx.setMousePosition(x, y);
  },

  mouseOutHandler: function(e){
    this.props.ctx.setMousePosition(-1, -1);
  },

  render: function() {
    return (
      <div className='gvreset gvboard-outer gvsprite-21-board'>
        <div className='gvreset gvboard'
        >
          <Stones ctx={this.props.ctx}/>
          <Marks ctx={this.props.ctx}/>
          <BranchMarks ctx={this.props.ctx}/>
          <MoveMark ctx={this.props.ctx}/>
          <Prisoners ctx={this.props.ctx}/>
          <div className='gvreset gvboard-overlay gvboard-fascade'
               onMouseMove={this.mouseMoveHandler}
               onMouseOut={this.mouseOutHandler}
          >
            <div className='gvreset gvsprite-21-blankboard'/>
          </div>
        </div>
      </div>
    );
  }
});

var Marks = React.createClass({
  render: function() {
    var ctx = this.props.ctx;
    if (!ctx.ctrl.gameState) return EMPTY_DIV;

    var markNodes = [];
    var marks = ctx.ctrl.gameState.currentNode.marks;
    for (var i=0; marks && i<marks.length; i++) {
      var mark = marks[i];
      var x = mark[0], y = mark[1];
      var color = ctx.ctrl.gameState.board[x][y];
      var area = xyToArea(x,y,ctx.config.gridSize);
      var left = area[0], top = area[1], width = area[2], height = area[3];
      var styleClass = "";
      switch(mark[2]){
        case Weiqi.model.MARK_CROSS:
          styleClass = "gvsprite-21-markcross";
          break;
        case Weiqi.model.MARK_TRIANGLE:
          styleClass = "gvsprite-21-marktriangle";
          break;
        case Weiqi.model.MARK_SQUARE:
          styleClass = "gvsprite-21-marksquare";
          break;
        case Weiqi.model.MARK_CIRCLE:
          styleClass = "gvsprite-21-markcircle";
          break;
        case Weiqi.model.MARK_TERR_BLACK:
          styleClass = "gvsprite-21-markblack";
          break;
        case Weiqi.model.MARK_TERR_WHITE:
          styleClass = "gvsprite-21-markwhite";
          break;
        case Weiqi.model.MARK_TEXT:
          markNodes.push(
            <div style={{
              position: 'absolute',
              left: left,
              top: top + 1,
              width: width,
              height: height,
              textAlign: 'center',
              verticalAlign: 'middle',
              color: 'red',
              fontWeight: 'bolder',
              fontSize: 15,
              backgroundColor: color === Weiqi.model.STONE_NONE ? ctx.config.boardColor : ''
            }}>{mark[3]}</div>
          );
          continue; // skip logic below
      }
      markNodes.push(
        <div className={styleClass}
             style={{
               position: 'absolute',
               left: left,
               top: top,
               backgroundColor: color === Weiqi.model.STONE_NONE ? ctx.config.boardColor : ''
             }}/>
      );
    }
    return (
      <div className='gvreset gvboard-overlay'>{markNodes}</div>
    );
  }
});

var MoveMark = React.createClass({
  render: function() {
    var ctx = this.props.ctx;
    var gameState = ctx.ctrl.gameState;
    if (gameState) {
      var node = gameState.currentNode;
      if (node.type === Weiqi.model.NODE_MOVE) {
        return (
          <div className='gvreset gvsprite-21-markmove'
            style={{
              position: "absolute",
              left: node.x * ctx.config.gridSize,
              top: node.y * ctx.config.gridSize,
              width: ctx.config.gridSize,
              height: ctx.config.gridSize
            }}
          ></div>
        );
      }
    }

    return EMPTY_DIV;
  }
});

var BranchLinks = React.createClass({
  render: function() {
    var ctx = this.props.ctx;
    if (!ctx.ctrl.gameState) return EMPTY_DIV;

    var branchNodes = [];
    var node = ctx.ctrl.gameState.currentNode;
    if (node.hasChildren() && node.children.length >= 2){
      var n = node.children.length;
      var s = "";
      for(var i=0; i<node.children.length; i++){
        var child = node.children[i];
        if (child.type == Weiqi.model.NODE_MOVE){
          var x = child.x, y = child.y;
          var branchLabel = BRANCHES[i];
          for (var j=0; j<i; j++) {
            var c1 = node.children[j];
            if (x == c1.x && y == c1.y) {
              branchLabel = BRANCHES[j];
              break;
            }
          }
          var branchName = BRANCHES_NAME[i] + ': ' + branchLabel;

          var goToBranchHandler = (function(n){
            return function() {
              ctx.goToBranch(n);
            };
          })(i);
          branchNodes.push(
            <div className="gvreset gvbutton" style={{position: 'relative', display: 'inline-block', width: 'initial'}}>
              <span><a className='branch' href='#' onClick={goToBranchHandler}>{branchName}</a>&nbsp;&nbsp; </span>
            </div>
          );
        }
      }
    }

    return (
      <div>{branchNodes}</div>
    );
  }
});

var BranchMarks = React.createClass({
  render: function() {
    var ctx = this.props.ctx;
    if (!ctx.ctrl.gameState) return EMPTY_DIV;

    var branchNodes = [];
    var node = ctx.ctrl.gameState.currentNode;
    if (node.hasChildren() && node.children.length >= 2){
      var n = node.children.length;
      var s = "";
      for(var i=0; i<node.children.length; i++){
        var child = node.children[i];
        if (child.type == Weiqi.model.NODE_MOVE){
          var x = child.x, y = child.y;
          var color = ctx.ctrl.gameState.board[x][y];
          var area = xyToArea(x,y,ctx.config.gridSize);
          var left = area[0], top = area[1], width = area[2], height = area[3];
          var branchLabel = BRANCHES[i];
          for (var j=0; j<i; j++) {
            var c1 = node.children[j];
            if (x == c1.x && y == c1.y) {
              branchLabel = BRANCHES[j];
              break;
            }
          }
          branchNodes.push(
            <div style={{
              position: 'absolute',
              left: left,
              top: top + 1,
              width: width,
              height: height,
              textAlign: 'center',
              verticalAlign: 'middle',
              color: 'red',
              fontWeight: 'bolder',
              fontSize: 15,
              backgroundColor: color === Weiqi.model.STONE_NONE ? ctx.config.boardColor : ''
            }}>{branchLabel}</div>
          );
        }
      }
    }

    return (
      <div>{branchNodes}</div>
    );
  }
});

var Prisoners = React.createClass({
  render: function() {
    var ctx = this.props.ctx;
    var prisoners = [];
    if (ctx.showBlackPrisoners) {
      var blackPrisoners = ctx.ctrl.gameState.blackPrisonerPoints;
      for (var i=0; i<blackPrisoners.length; i++) {
        var prisoner = blackPrisoners[i];
        prisoners.push(<Prisoner ctx={ctx} x={prisoner[0]} y={prisoner[1]} color={prisoner[2]}/>);
      }
    } else if (ctx.showWhitePrisoners) {
      var whitePrisoners = ctx.ctrl.gameState.whitePrisonerPoints;
      for (var i=0; i<whitePrisoners.length; i++) {
        var prisoner = whitePrisoners[i];
        prisoners.push(<Prisoner ctx={ctx} x={prisoner[0]} y={prisoner[1]} color={prisoner[2]}/>);
      }
    } else {
      return EMPTY_DIV;
    }

    return (
      <div className='gvreset gvboard-overlay'>
        {prisoners}
      </div>
    );
  }
});

var Prisoner = React.createClass({
  render: function() {
    var x = this.props.x, y = this.props.y, color = this.props.color;
    var gridSize = this.props.ctx.config.gridSize;
    var cssClass = color == Weiqi.model.STONE_BLACK? "gvsprite-15-black_dead" : "gvsprite-15-white_dead";
    var area = xyToArea(x,y,gridSize);
    var left = area[0], top = area[1];
    return (
      <div style={{
        position: 'absolute',
        left: left,
        top: top,
        width: gridSize,
        height: gridSize,
        backgroundColor: this.props.ctx.config.boardColor
      }}>
        <div className={cssClass} style={{
          marginLeft: 3,
          marginTop: 3
        }}/>
      </div>
    );
  }
});

var Toolbar = React.createClass({
  render: function() {
    var toggleNumberClass = 'gvreset';
    if (this.props.ctx.config.showMoveNumber)
      toggleNumberClass += " gvsprite-hidenumber";
    else
      toggleNumberClass += " gvsprite-shownumber";

    var isFirst = true, isLast = true;
    var gameState = this.props.ctx.ctrl.gameState;
    if (gameState) {
      isFirst = gameState.isFirst();
      isLast = gameState.isLast();
    }
    var backClass = isFirst ? ' disabled' : '';
    var forwardClass = isLast ? ' disabled' : '';

    return (
      <div className='gvreset gvtoolbar'>
        <div className='gvreset gvtb-item'>
          <a className='gvreset toggleopacity' onClick={this.props.ctx.refresh} title='Refresh game/board [Alt Shift R]'>
            <div className='gvreset gvsprite-refresh'/>
          </a>
        </div>
        <div className='gvreset gvtb-item'>
          <a className='gvreset toggleopacity' onClick={this.props.ctx.toggleNumber} title='Show/hide move number [Alt Shift M]'>
            <div className={toggleNumberClass}/>
          </a>
        </div>
        <div className='gvreset gvtb-item'>
          <a className='gvreset toggleopacity' onClick={this.props.ctx.backAll} title='Back to beginning [Ctrl Alt &#8592;]'>
            <div className={'gvreset gvsprite-backall' + backClass}/>
          </a>
        </div>
        <div className='gvreset gvtb-item'>
          <a className='gvreset toggleopacity' onClick={this.props.ctx.backToComment} title='Previous comment or variation [Alt Shift &#8592;]'>
            <div className={'gvreset gvsprite-backc' + backClass}/>
          </a>
        </div>
        <div className='gvreset gvtb-item'>
          <a className='gvreset toggleopacity' onClick={this.props.ctx.backN} title='Fast back [Ctrl &#8592;]'>
            <div className={'gvreset gvsprite-backn' + backClass}/>
          </a>
        </div>
        <div className='gvreset gvtb-item'>
          <a className='gvreset toggleopacity' onClick={this.props.ctx.back} title='Back [&#8592;]'>
            <div className={'gvreset gvsprite-back' + backClass}/>
          </a>
        </div>
        <div className='gvreset gvtb-item'>
          <a className='gvreset toggleopacity' onClick={this.props.ctx.forward} title='Forward [&#8594;]'>
            <div className={'gvreset gvsprite-forward' + forwardClass}/>
          </a>
        </div>
        <div className='gvreset gvtb-item'>
          <a className='gvreset toggleopacity' onClick={this.props.ctx.forwardN} title='Fast forward [Ctrl &#8594;]'>
            <div className={'gvreset gvsprite-forwardn' + forwardClass}/>
          </a>
        </div>
        <div className='gvreset gvtb-item'>
          <a className='gvreset toggleopacity' onClick={this.props.ctx.forwardToComment} title='Next comment or variation [Alt Shift &#8594;]'>
            <div className={'gvreset gvsprite-forwardc' + forwardClass}/>
          </a>
        </div>
        <div className='gvreset gvtb-item'>
          <a className='gvreset toggleopacity' onClick={this.props.ctx.forwardAll} title='Forward to end [Ctrl Alt &#8594;]'>
            <div className={'gvreset gvsprite-forwardall' + forwardClass}/>
          </a>
        </div>
        <div className='gvreset gvtb-branches'></div>
      </div>
    );
  }
});

// Scroll to show as much comments as possible except when jumping to first move!
var RightPane = React.createClass({
  componentDidUpdate: function() {
    if (!this.props.ctx.ctrl.gameState) return;

    var node = this.getDOMNode();
    if (this.props.ctx.ctrl.gameState.isFirst()) {
      node.scrollTop = 0;
      return;
    }

    var infoNode = React.findDOMNode(this.refs.info);
    node.scrollTop = infoNode.offsetHeight + 5;
  },

  render: function() {
    if (!this.props.ctx.ctrl.gameState)
      return (<div className='gvreset gvright-pane'></div>);

    return (
      <div className='gvreset gvright-pane'>
        <Info ref="info" game={this.props.ctx.ctrl.gameState.game}/>
        <Comment ref="comment" ctx={this.props.ctx}/>
      </div>
    );
  }
});

var Info = React.createClass({
  render: function() {
    var game = this.props.game;

    if (!game) return EMPTY_DIV;

    var playFirst = "\u00a0&#8592; " + jsgvTranslations['play_first'];

    return (
      <div className='gvreset gvinfo' style={{fontSize: "0.9em"}}>
        { Weiqi.notNull(game.name)  && <div style={{width: '100%', textAlign: 'center', fontWeight: "bold"}}>{game.name}</div> }
        <div style={{width: '100%', textAlign: 'center'}}>
          { Weiqi.notNull(game.date)  && game.date + '\u00a0 ' }
          { Weiqi.notNull(game.place) && game.place }
        </div>

        <div>
          { jsgvTranslations['white'] }:
          <strong> {game.whiteName} </strong>
          { Weiqi.notNull(game.whiteRank) && "\u00a0(" + game.whiteRank + ")" }
          { game.getFirstPlayer() == Weiqi.model.STONE_WHITE && playFirst }
        </div>
        <div>
          { jsgvTranslations['black'] }:
          <strong> {game.blackName} </strong>
          { Weiqi.notNull(game.blackRank) && "\u00a0(" + game.blackRank + ")" }
          { game.getFirstPlayer() == Weiqi.model.STONE_BLACK && playFirst }
        </div>
        { game.handicap > 0
          ? <div>{ jsgvTranslations['handicap'] }: { game.handicap } </div>
          : [ <div>{ jsgvTranslations['rule']   }: { game.rule     } </div>
            , <div>{ jsgvTranslations['komi']   }: { game.komi     } </div>
            ]
        }
        <div>{ jsgvTranslations['moves']  }: { game.getMoves() } </div>
        <div>{ jsgvTranslations['result'] }: { game.result     } </div>
      </div>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    var gameState = this.props.ctx.ctrl.gameState;
    if (!gameState) return EMPTY_DIV;

    var node = gameState.currentNode;
    if (node.comment) {
      return (
        <div className='gvreset gvcomment'>
          <BranchLinks ctx={this.props.ctx}/>
          <strong>{jsgvTranslations['comment_for'].replace(/MOVE/,node.moveNumber)}</strong><br/>
          {node.comment}
        </div>
      );
    } else {
      return EMPTY_DIV;
    }
  }
});

var Stones = React.createClass({
  render: function() {
    var gameState = this.props.ctx.ctrl.gameState;
    if (!gameState) return EMPTY_DIV;

    var board = gameState.board;
    var stones = [];
    for(var i=0; i<board.size; i++) {
      for (var j=0; j<board.size; j++) {
        var color = board[i][j];
        if (color === Weiqi.model.STONE_BLACK || color === Weiqi.model.STONE_WHITE) {
          var moveNumber = gameState.getMoveNumber(i, j);
          stones.push(
            <Stone x={i} y={j} color={color} moveNumber={moveNumber} config={this.props.ctx.config}/>
          );
        }
      }
    }
    return (
      <div className='gvreset gvboard-overlay'>{stones}</div>
    );
  }
});

var Stone = React.createClass({
  render: function() {
    var config = this.props.config;

    var x = this.props.x;
    var y = this.props.y;
    var color = this.props.color;
    var moveNumber = this.props.moveNumber;

    var className = color === Weiqi.model.STONE_BLACK ? 'gvsprite-21-black' : 'gvsprite-21-white';

    var area = xyToArea(x,y,config.gridSize);

    var moveNumberChild;
    if (config.showMoveNumber && moveNumber > 0) {
      var colorName = color == Weiqi.model.STONE_BLACK ? "white" : "black";
      var fontSize = "medium";
      var left = 0;
      if (moveNumber >= 10 && moveNumber < 100){
        fontSize = "small";
      }else if (moveNumber >= 100){
        fontSize = "x-small";
        left = 1;
      }
      moveNumberChild = (
        <div style={{display: 'table', width: area[2], height: area[3], overflow: 'hidden'}}>
          <div style={{display: 'table-cell', verticalAlign: 'middle', top: '50%'}}>
            <div style={{left: left, width: '100%', top: '-50%', textAlign: 'center', color: colorName, fontFamily: 'times', fontSize: fontSize}}>{moveNumber}</div>
          </div>
        </div>
      );
    } else {
      moveNumberChild = "\u00a0";
    }

    return (
      <div className={className} style={{position: 'absolute', left: area[0], top: area[1]}}>
        { moveNumberChild }
      </div>
    );
  }
});