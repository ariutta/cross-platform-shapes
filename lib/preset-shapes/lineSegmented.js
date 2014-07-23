//for generating line segments through a path of points (pathpoints, not waypoints)
module.exports = (function(){
  'use strict';

  function getPathSegments(crossPlatformShapesInstance, data) {
    var points = data.points;
    var firstPoint = points[0];

    var pathData = [{command: 'moveTo', points: [firstPoint.x, firstPoint.y]}];

    points.forEach(function(point, index) {
      if (index > 0) {
        pathData.push({command: 'lineTo', points: [point.x, point.y]});
      }
    });

    return pathData;
  }

  function getPointAtPosition(targetEdgeData, position) {
    // TODO make this actually calculate and return a value
    return {x:0, y: 0};
  }

  return {
    getPathSegments:getPathSegments,
    getPointAtPosition:getPointAtPosition
  };
})();
