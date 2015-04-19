'use strict';

import Weiqi from '.';
import SGFParser from './SGFParser';

export default class {
  constructor(config){
    this.id = Weiqi.getGameId();
    this.jqId = "#" + this.id;
    Weiqi[this.id] = this;

    this.config = Weiqi.clone(Weiqi.CONFIG);
    if (config != null)
      jq4gv.extend(this.config, config);

    this.view = new Weiqi.GameView(this, this.config);
    this.reset();
  }

  init(){
    this.view.initView();
    this._initialized = true;
    return this;
  }

  initialized(){
    return this._inialized == true;
  }

  changeLocale(newLocale){
    if (this.config.locale == newLocale)
      return this;
    if (!Weiqi.LOCALES.indexOf(newLocale) < 0){
      alert("Weiqi WARNING: Invalid locale '" + newLocale + "'");
      return this;
    }
    this.config.locale = newLocale;
    window.jsgvTranslations = window["jsgv_" + newLocale];
    Weiqi.WEIQI_TEMPLATE = null;
    Weiqi.DAOQI_TEMPLATE = null;
    this.reset();
    this.show();
    if (this.gameState){
      this.gameState.backAll();
      this.initGame();
    }
    return this;
  }

  destroy(){
    this.vew.destroyView();
    delete Weiqi[this.id];
    Weiqi.length--;
  }

  reset(){
    this._initialized = false;

    if (this.config.container != null) {
      var container = jq4gv("#" + this.config.container);
      if (container.get(0).nodeName == 'DIV') {
        container.empty().append(this.getPlaceHolder());
      } else {
        if (jq4gv(this.jqId).get(0)) {
          jq4gv(this.jqId).replaceWith(this.getPlaceHolder());
        } else {
          container.after(this.getPlaceHolder());
        }
      }
    } else {
      if (jq4gv(this.jqId).get(0) != null)
        jq4gv(this.jqId).replaceWith(this.getPlaceHolder());
      else
        document.write(this.getPlaceHolder());
    }
    return this;
  }

  show(){
    if (!this.initialized())
      this.init();
    jq4gv(this.jqId).show();
    return this;
  }

  hide(){
    jq4gv(this.jqId).hide();
    return this;
  }

  setGameType(gameType){
    if (this.config.gameType != gameType){
      this.config.gameType = gameType;
      this.reset();
    }
    return this;
  }

  // set game type if DAOQI
  setGameTypeIf(gameType){
    if (this.config.gameType != Weiqi.DAOQI && this.game.type == Weiqi.DAOQI){
      this.setGameType(Weiqi.DAOQI);
    }
    return this;
  }

  load(url, n){
    var h = models.GameHistory[url];
    if (h){
      models.GameHistory.save(h);
      this.game = h.game;
      this.setGameTypeIf(this.game.type).show();
      this.gameState = h;
      this.gameState.backAll();
      this.view.initGame();
      if (n == undefined)
        this.forwardAll();
      else
        this.forwardN(n);
      return this;
    }
    var _this = this;
    jq4gv.ajax({
      url:url,
      success:function(response){
        //try {
          // if game data haven't changed, don't reload the game
          if (_this.game && _this.game.dataSize && _this.game.dataSize == response.length){
            return;
          }
          _this.game = new SGFParser(_this.config.gameType).parse(response);
          _this.game.dataSize = response.length;
          _this.setGameTypeIf(_this.game.type).show();
          _this.game.url = url;
          _this.gameState = new models.GameState(_this.game);
          models.GameHistory.save(_this.gameState);
          _this.view.initGame();
          if (n == undefined)
            _this.view.forwardAll();
          else
            _this.view.forwardN(n);
        //} catch(e) {
        //  throw "GameController.load('" + url + "')->success: " + e;
        //}
      },
      failure:function(){
        throw "GameController.load('" + url + "')->failure:";
      }
    });
    return this;
  }

  loadSgf(sgf, n){
    try {
      sgf = jq4gv.trim(sgf);
      this.show();
      this.game = new SGFParser(this.config.gameType).parse(sgf);
      this.game.dataSize = sgf.length;
      this.setGameTypeIf(this.game.type);
      this.gameState = new models.GameState(this.game);
      this.view.initGame();
      if (n == undefined)
        this.view.forwardAll();
      else
        this.view.forwardN(n);
      return this;
    } catch(e) {
      throw "GameController.loadSgf('" + sgf + "'): " + e;
    }
  }

  loadInline(divId, n){
    try {
      if (jq4gv("#"+divId).length == 0){
        return this;
      }
      this.loadSgf(jq4gv("#"+divId).text(), n);
      return this;
    } catch(e) {
      throw "GameController.loadInline('" + divId + "'): " + e;
    }
  }

  refresh(force){
    var url = this.game.url;
    var _this = this;
    jq4gv.ajax({
      url:url,
      //ifModified: true,
      success:function(response){
        try {
          response = jq4gv.trim(response);
          jsgv.debug('refresh 1');
          // if game data haven't changed, don't reload the game
          if (!force && _this.game && _this.game.dataSize && _this.game.dataSize == response.length){
            return;
          }
          jsgv.debug('refresh 2');
          _this.game = new SGFParser(_this.config.gameType).parse(response);
          _this.game.dataSize = response.length;
          _this.setGameTypeIf(_this.game.type).show();
          _this.game.url = url;
          _this.gameState = new models.GameState(_this.game);
          _this.view.initGame();
          _this.view.forwardAll();
        } catch(e) {
          throw "GameController.refresh('" + url + "')->success: " + e;
        }
      },
      failure:function(){
        throw "GameController.refresh('" + url + "')->failure:";
      }
    });
  }

  openInWindow(){
    var url = this.config.baseDir + "/php/game_window.php?";
    var title = "jsgameviewer", width = 722, height = 452;
    if (this.config.gameType == Weiqi.DAOQI) {
      url += "type=DAOQI&";
      width = 798;
      height = 528;
    }
    if (this.game && this.game.url)
      url += "url=" + encodeURIComponent(this.game.url);
    var win = window.open(url, title, "width=" + width + "px,height=" + height + "px,status=yes,location=no,resizable=yes");
  }

  getPlaceHolder(){
    return "<div id='" + this.id + "' style='display:none'>&nbsp;</div>";
  }
}

