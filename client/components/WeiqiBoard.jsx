'use strict';

var jQuery = require('../lib/jquery');
var React  = require('react');

import Weiqi       from '../weiqi';
import * as models from '../weiqi/models';
import SGFParser   from '../weiqi/SGFParser';

import Banner      from './Banner';
import Board       from './Board';

require('../stylesheets/WeiqiBoard.css');

export default class extends React.Component {
  getInitialState() {
  }

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
        //self.forwardAll();
      }
    });
  }

  render() {
    return (
      <div className='gvreset gameviewer'>
        <Banner ctx={this}/>
        <Board ctx={this}/>
      </div>
    );
  }

}
