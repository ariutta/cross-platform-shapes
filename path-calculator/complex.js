pathvisiojs.view.pathwayDiagram.svg.path.complex = function(){
  'use strict';

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;
    var attributes = [
      {
        name:'d',
        value: 'M ' + (x + 18) + ' ' + y +
          ' L ' + (x + width - 18) + ' ' + y +
          ' L ' + (x + width) + ' ' + (y + 18) +
          ' L ' + (x + width) + ' ' + (y + height - 18) +
          ' L ' + (x + width - 18) + ' ' + (y + height) +
          ' L ' + (x + 18) + ' ' + (y + height) +
          ' L ' + (x) + ' ' + (y + height - 18) +
          ' L ' + (x) + ' ' + (y + 18) +
          ' Z'
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
