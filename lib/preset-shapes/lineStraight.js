module.exports = (function(){
  'use strict';

  function getPathSegments(crossPlatformShapesInstance, data) {
    var x0 = data.points[0].x,
      y0 = data.points[0].y,
      x1 = data.points[1].x,
      y1 = data.points[1].y;

    var pathData = [{command: 'moveTo', points: [x0, y0]},
      {command: 'lineTo', points: [x1, y1]}];

    return pathData;
  }

  function getPointAtPosition(targetEdgeData, position) {
    var x0 = targetEdgeData.points[0].x
      , y0 = targetEdgeData.points[0].y
      , x1 = targetEdgeData.points[1].x
      , y1 = targetEdgeData.points[1].y
      ;

    var x = x0 + (x1 - x0) * position;
    var y = y0 + (y1 - y0) * position;
    return {x:x, y:y};
  }

  return {
    getPathSegments:getPathSegments,
    getPointAtPosition:getPointAtPosition
  };
})();
