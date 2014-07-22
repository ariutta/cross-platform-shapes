module.exports = (function(){
  'use strict';

  function getPathSegments(crossPlatformShapesInstance, data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;

    var pathData = [{command: 'moveTo', points: [x, y]},
      {command: 'lineTo', points: [(x), (y + height)]}];

    return pathData;
  }

  function getDimensions(crossPlatformShapesInstance) {
    return {
      markerWidth:10,
      markerHeight:20
    };
  }

  return {
    getPathSegments:getPathSegments,
    getDimensions:getDimensions
  };
})();
