crossPlatformShapes.pathCalculator.hexagon = function(data){
  'use strict';

  var x = data.x,
    y = data.y,
    width = data.width,
    height = data.height;

  // TODO: the commands below are just a copy of the commands for rectangle.
  // We need to convert the commented out pathData below to the HTML5 Canvas path command format.
  var pathData = [{command: 'moveTo', points: [x, y]},
    {command: 'lineTo', points: [(x + width), y]},
    {command: 'lineTo', points: [(x + width), (y + height)]},
    {command: 'lineTo', points: [(x), (y + height)]},
    {command: 'closePath', points: []}];

    /*
  var pathData = 'M' + (x + 0.25 * width) + ',' + y +
    'l' + (0.5 * width) + ',' + 0 +
    'l' + (0.25 * width) + ',' + (0.5 * height) +
    'l' + (-0.25 * width) + ',' + (0.5 * height) +
    'l' + (-0.5 * width) + ',' + 0 +
    'l' + (-0.25 * width) + ',' + (-0.5 * height) +
    'z';
    //*/

  return pathData;
};
