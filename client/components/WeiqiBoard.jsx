'use strict';

var jq4gv = require('../lib/jquery');
var React = require('react');

import Weiqi from '../weiqi';
import * as models from '../weiqi/models';
import SGFParser from '../weiqi/SGFParser';

import Banner from './Banner';

require('../stylesheets/WeiqiBoard.scss');

export default class WeiqiBoard extends React.Component {
  getInitialState() {
  }

  componentWillMount() {
    var self = this;
    // Load game
    jq4gv.ajax({
      url:this.props.url,
      success:function(response){
        var game = new SGFParser(Weiqi.WEIQI).parse(response);
        self.setState({
          game: game,
          gameState: new models.GameState(game)
        });
        //self.forwardAll();
      }
    });
  }

  render() {
    return (
      <div className='gvreset gameviewer'>
        <Banner ctx={this}/>
      </div>
    );
  }

}
