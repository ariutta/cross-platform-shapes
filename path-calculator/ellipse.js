crossPlatformShapes.pathCalculator.ellipse = function(data){
  'use strict';

  var x = data.x,
    y = data.y,
    width = data.width,
    height = data.height;
  var cx = x + width/2;
  var cy = y + height/2;
  var width_over_2 = width / 2,
    width_two_thirds = width * 2 / 3,
    height_over_2 = height / 2;

  var pathData = [{command: 'moveTo', points: [x, (y - height_over_2)]},
    {command: 'bezierCurveTo', points: [(x + width_two_thirds), (y - height_over_2), (x + width_two_thirds), (y + height_over_2), (x), (y + height_over_2)]},
    {command: 'bezierCurveTo', points: [(x - width_two_thirds), (y + height_over_2), (x - width_two_thirds), (y - height_over_2), (x), (y - height_over_2)]}];
  return pathData;
};
