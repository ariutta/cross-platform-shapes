pathvisiojs.view.pathwayDiagram.svg.path.oval = function(){
  'use strict';

  // TODO don't repeat this with the def in ovalDouble
  function drawEllipse(x, y, width, height) {
    var width_over_2 = width / 2,
      width_two_thirds = width * 2 / 3,
      height_over_2 = height / 2;
    var pathData = 'M ' + x + ' ' + (y - height_over_2) + ' ' +
      'C ' + (x + width_two_thirds) + ' ' + (y - height_over_2) + ' ' + (x + width_two_thirds) + ' ' + (y + height_over_2) + ' ' + (x) + ' ' + (y + height_over_2) +
      'C ' + (x - width_two_thirds) +  ' ' + (y + height_over_2) +  ' ' + (x - width_two_thirds) +  ' ' + (y - height_over_2) + ' ' + (x) +  ' ' + (y - height_over_2);
    return pathData;
  }

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;
    var cx = x + width/2;
    var cy = y + height/2;
    var pathData = drawEllipse(cx, cy, width, height);
    var attributes = [
      {
        name:'d',
        value:pathData
      }
    ];
    return attributes;
  }

  return {
    drawEllipse:drawEllipse,
    getAttributes:getAttributes
  };
}();
