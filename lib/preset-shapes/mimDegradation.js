module.exports = (function(){
  'use strict';

  function getPathSegments(data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;

    var ellipse = crossPlatformShapes.pathCalculator.ellipse(data);
    var line = [{command: 'moveTo', points: [x, y]},
      {command: 'lineTo', points: [(x + width), (y + height)]}];
    var pathData = ellipse.concat(line);

    return pathData;
  }

  return {getPathSegments:getPathSegments};
})();
