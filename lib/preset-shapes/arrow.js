module.exports = (function(){
  'use strict';

  function getPathSegments(crossPlatformShapesInstance, data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;

    var pathData = [{ command: 'moveTo', points: [(x), y] },
      { command: 'lineTo', points: [x + width, (y + height/2)]},
      { command: 'lineTo', points: [(x), (y + height)] },
      { command: 'closePath', points: [] }];

    return pathData;
  }

  function getDimensions(crossPlatformShapesInstance) {
    return {
      markerWidth:12,
      markerHeight:12
    };
  }

  return {
    getPathSegments:getPathSegments,
    getDimensions:getDimensions
  };
})();
