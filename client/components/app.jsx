'use strict'

import React                     from 'react';
import {RouterMixin, Transition} from '../router';
import routes                    from '../routes';
import WeiqiBoard                from './WeiqiBoard';

import checkUnusedCss            from '../lib/checkUnusedCss';

require('../stylesheets/App.scss');

class App extends RouterMixin {
  render() {
    var view = this.getActiveView({ key: Date.now() });

    return (
      <body>
        <div style={{height: 200}}></div>
        <WeiqiBoard url="/games/luo.sgf"/>
      </body>
    );
  }

  componentWillMount(){
    this.initRouter(routes);
  }

  componentDidMount(){
    checkUnusedCss('/stylesheets/WeiqiBoard.css');
  }
}

document.addEventListener('DOMContentLoaded', function(){
  React.render(<App />, document.body);
});
