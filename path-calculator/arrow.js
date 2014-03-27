crossPlatformShapes.pathCalculator.arrow = function(data){
  'use strict';

  var x = data.x,
    y = data.y,
    width = data.width,
    height = data.height;

  var pathData = [{ command: 'moveTo', points: [(x + width), 0] },
    { command: 'lineTo', points: [0, (y + height/2)]},
    { command: 'lineTo', points: [(x + width), (y + height)] },
    { command: 'closePath', points: [] }];

  return pathData;
};
