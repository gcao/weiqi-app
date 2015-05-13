'use strict'

import React                     from 'react';
import {RouterMixin, Transition} from '../router';
import routes                    from '../routes';
import SiteHandlers              from '../site_handlers';
import WeiqiBoard                from './WeiqiBoard';

require('../stylesheets/App.scss');

class App extends RouterMixin {
  render() {
    var view = this.getActiveView({ key: Date.now() });

    return (
      <body>
        {/*<WeiqiBoard url="/games/luo.sgf"/>*/}
        <a className="game" href="/games/luo.sgf">Luo's game</a>
      </body>
    );
  }

  componentWillMount(){
    this.initRouter(routes);
  }

  componentDidMount(){
    SiteHandlers.invoke();
  }
}

document.addEventListener('DOMContentLoaded', function(){
  React.render(<App />, document.body);
});

