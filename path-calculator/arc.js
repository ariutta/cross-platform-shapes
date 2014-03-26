pathvisiojs.view.pathwayDiagram.svg.path.arc = function(){
  'use strict';

  function getAttributes(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;

    var yControlPoint = height * (2/3);

    var pathData = 'M ' + x + ' ' + y + ' ' +
      'C ' + (x) + ' ' + (y + yControlPoint) + ' ' + (x + width) + ' ' + (y + yControlPoint) + ' ' + (x + width) + ' ' + (y);

    var attributes = [
      {
        name:'d',
        value: pathData
        /*
        path: 'M' + (99.5 + x) + ',' + (50 + y) +
          'c0,27.338341 -22.162117,49.5 -49.5,49.5' +
          's-49.5,-22.161659 -49.5,-49.5'
          //*/
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
