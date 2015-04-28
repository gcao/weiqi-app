'use strict';

import React       from 'react';
import Weiqi       from '../weiqi';
import * as models from '../weiqi/models';

export default React.createClass({
  render: function() {
    var game = this.props.game;

    var playFirst = "\u00a0&#8592; " + jsgvTranslations['play_first'];

    return (
      <div className='gvinfo'>
        { Weiqi.notNull(game.name)  && <div className="gvname">{game.name}</div> }
        <div className="gvtime-place">
          { Weiqi.notNull(game.date)  && game.date + '\u00a0 ' }
          { Weiqi.notNull(game.place) && game.place }
        </div>

        <div>
          { jsgvTranslations['white'] }:
          <strong> {game.whiteName} </strong>
          { Weiqi.notNull(game.whiteRank) && "\u00a0(" + game.whiteRank + ")" }
          { game.getFirstPlayer() == models.STONE_WHITE && playFirst }
        </div>
        <div>
          { jsgvTranslations['black'] }:
          <strong> {game.blackName} </strong>
          { Weiqi.notNull(game.blackRank) && "\u00a0(" + game.blackRank + ")" }
          { game.getFirstPlayer() == models.STONE_BLACK && playFirst }
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

