//for generating line segments through a path of points (pathpoints, not waypoints)
crossPlatformShapes.pathCalculator.lineSegmented = function(data){
  'use strict';


  var points = data.points;
  var firstPoint = points[0];

  var pathData = [{command: 'moveTo', points: [firstPoint.x, firstPoint.y]}];

  points.forEach(function(point, index) {
    if (index > 0) {
      pathData.push({command: 'lineTo', points: [point.x, point.y]});
    }
  });

  return pathData;
};
