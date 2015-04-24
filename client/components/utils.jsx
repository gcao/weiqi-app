'use strict';

export function xyToArea(x,y,gridSize) {
  return [x*gridSize, y*gridSize, gridSize, gridSize];
}

