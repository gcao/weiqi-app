'use strict';

import jQuery from '../lib/jquery';
import './translations';

var EN_US = "en_us";
var ZH_CN = "zh_cn";

export default {
  EN_US: EN_US,
  ZH_CN: ZH_CN,
  LOCALES: [EN_US, ZH_CN],

  CONFIG: {
    locale: jsgvTranslations.locale,
    boardSize: 19,
    playerInterval: 5,
    observerInterval: 15,
    container: null
  },

  debug: function(message){
    if (typeof(console) != "undefined") {
      console.log(message);
    }
  },

  getGameId: function(i){
    if (i == undefined){
      this.length ++;
      for(i=1; this["GV"+i]!=null; i++)
        ;
    }
    return "GV"+i;
  },

  clone: function(myObj){
    if(typeof(myObj) != 'object') return myObj;
    if(myObj == null) return myObj;

    var myNewObj = new Object();

    for(var i in myObj)
      myNewObj[i] = this.clone(myObj[i]);

    return myNewObj;
  },

  // return true if obj is String and not empty
  notNull: function(obj){
    return obj != undefined && obj != null && jQuery.trim(obj).length > 0;
  },

  getId: function(x, y){
    return x+"-"+y;
  },

  showAjaxError: function(textStatus, errorThrown) {
    var mesg = jsgvTranslations["error_thrown"] + "\n";
    if (textStatus != undefined) mesg += textStatus + " ";
    if (errorThrown != undefined) mesg += errorThrown;
    alert(mesg.substr(0, 1000));
  }
};

