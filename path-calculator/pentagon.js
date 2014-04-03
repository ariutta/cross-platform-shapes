crossPlatformShapes.pathCalculator.pentagon = function(data){
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
  var pathData = 'M' + x + ',' + (y + 0.81*height) +
    'l0,-' + 0.62*height +
    'l' + 0.62*width + ',-' + 0.19*height +
    'l' + 0.38*width+',' + 0.5*height +
    'l-' + 0.38*width + ',' + 0.5*height +
    'l-' + 0.62*width + ',-' + 0.19*height +
    'z';
    //*/
  return pathData;
};
