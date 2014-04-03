crossPlatformShapes.pathCalculator.roundedRectangle = function(data){
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
  var pathData = 'M' + x + ',' + (y + 10) + ' ' +
        'c0,-5.43379 4.56621,-10 10,-10' +
        'l' + (width - 20) + ',0' +
        'c5.43379,0 10,4.56621 10,10' +
        'l0,' + (height - 20) +
        'c0,5.43379 -4.56621,10 -10,10' +
        'l' + (20 - width) + ',0' +
        'c-5.43379,0 -10,-4.56621 -10,-10' +
        'l0,' + (20 - height) +
        'z';
        //*/
  return pathData;
};
