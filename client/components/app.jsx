'use strict'

var React = require('react');
var {RouterMixin, Transition} = require('../router');

var pageRoutes = require('../routes');

import WeiqiBoard from './WeiqiBoard';

require('../stylesheets/App.scss');

class App extends RouterMixin {
  render() {
    var view = this.getActiveView({ key: Date.now() });

    return (
      <body>
        <WeiqiBoard url="/games/luo.sgf"/>
      </body>
    );
  }

  componentWillMount(){
    this.initRouter(pageRoutes);
  }
}

document.addEventListener('DOMContentLoaded', function(){
  React.render(<App />, document.body);
});
