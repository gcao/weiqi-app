'use strict';

import jQuery       from '../lib/jquery';
import React        from 'react';
import {showGame}   from '../components/WeiqiBoard';
import SiteHandlers from './SiteHandlers';

export default function LocalhostHandler() {
  if (!location.host.match(/^(localhost|127.0.0.1)/)) return;

  console.log('LocalhostHandler()');

  jQuery("a.game").each(function(){
    var el = jQuery(this);
    var url = el.attr('href');
    showGame({url: url, after: el});
  });

  return true;
}

SiteHandlers.register(LocalhostHandler);

