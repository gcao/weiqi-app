'use strict';

export function xyToArea(x,y,gridSize) {
  return [x*gridSize, y*gridSize, gridSize, gridSize];
}

var LABELS = ['A','B','C','D','E','F','G','H','J','K','L','M','N','O','P','Q','R','S','T'];
export function xyToLabel(x,y){
  if (typeof x !== 'number' || typeof y !== 'number') return;
  if (x < 0 || x >= 19 || y < 0 || y >= 19) return;

  var s = LABELS[x];
  s += 19 - parseInt(y);
  return s;
}

var BRANCH_LABELS = ['A','B','C','D','E','F','G','H','I','J'];
var BRANCH_NAMES  = [
  jsgvTranslations['trunk'],
  jsgvTranslations['branch_1'], jsgvTranslations['branch_2'], jsgvTranslations['branch_3'],
  jsgvTranslations['branch_4'], jsgvTranslations['branch_5'], jsgvTranslations['branch_6'],
  jsgvTranslations['branch_7'], jsgvTranslations['branch_8'], jsgvTranslations['branch_9']
];

export function getBranch(children, i) {
  var child = children[i];
  var name  = BRANCH_NAMES[i];
  var label = BRANCH_LABELS[i];
  for (var j=0; j<i; j++) {
    var c1 = children[j];
    if (child.x === c1.x && child.y === c1.y) {
      label = BRANCH_LABELS[j];
      break;
    }
  }
  return {
    name  : name,
    label : label
  };
}

