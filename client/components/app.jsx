'use strict'

import React                     from 'react';
import {RouterMixin, Transition} from '../router';
import routes                    from '../routes';
import WeiqiBoard                from './WeiqiBoard';

require('../stylesheets/App.scss');

class App extends RouterMixin {
  render() {
    var view = this.getActiveView({ key: Date.now() });

    return (
      <body>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <WeiqiBoard url="/games/luo.sgf"/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </body>
    );
  }

  componentWillMount(){
    this.initRouter(routes);
  }
}

document.addEventListener('DOMContentLoaded', function(){
  React.render(<App />, document.body);
});
