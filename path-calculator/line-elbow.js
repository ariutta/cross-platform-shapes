crossPlatformShapes.pathCalculator.lineElbow = function(data){
  'use strict';

  function changeDirection(currentDirection) {
    var xDirection = Math.abs(Math.abs(currentDirection[0]) - 1);
    var yDirection = Math.abs(Math.abs(currentDirection[1]) - 1);
    return [xDirection, yDirection];
  }

  var points = data.points;
  var pointCount = points.length;
  var firstPoint = points[0],
    lastPoint = points[pointCount - 1];

  var pathData = [{command: 'moveTo', points: [firstPoint.x, firstPoint.y]}];

  var direction = [];
  direction.push(firstPoint.anchor[2]);
  direction.push(firstPoint.anchor[3]);

  if (pointCount === 2) {
    var x = firstPoint.x + Math.abs(firstPoint.anchor[2]) * (lastPoint.x - firstPoint.x);
    var y = firstPoint.y + Math.abs(firstPoint.anchor[3]) * (lastPoint.y - firstPoint.y);
    pathData.push({command: 'lineTo', points: [x, y]});
  } else {
    points.forEach(function(point, index) {
      if (index > 0 && index < pointCount - 1) {
        var x0 = Math.abs(direction[0]) * (points[index].x - points[index - 1].x) + points[index - 1].x,
          y0 = Math.abs(direction[1]) * (points[index].y - points[index - 1].y) + points[index - 1].y,
          x1 = Math.abs(direction[1]) * (points[index + 1].x - points[index].x) + points[index].x,
          y1 = Math.abs(direction[0]) * (points[index + 1].y - points[index].y) + points[index].y;
        pathData.push({command: 'lineTo', points: [x0, y0]});
        pathData.push({command: 'lineTo', points: [x1, y1]});
        direction = changeDirection(direction);
      }
    });
  }

  pathData.push({command: 'lineTo', points: [lastPoint.x, lastPoint.y]});

  return pathData;
};

