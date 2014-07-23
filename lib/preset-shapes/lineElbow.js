module.exports = (function(){
  'use strict';

  function getPathSegments(crossPlatformShapesInstance, data) {
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
    if (firstPoint.anchor) {
      direction.push(firstPoint.anchor[2]);
      direction.push(firstPoint.anchor[3]);
    } else {
      // arbitrary
      direction = [1, 0];
      console.warn('No anchor specified for edge "' + data.id + '"');
    }

    points.forEach(function(point, index) {
      if (index > 0 && index < pointCount) {
        var x0 = Math.abs(direction[0]) * (points[index].x - points[index - 1].x) + points[index - 1].x,
          y0 = Math.abs(direction[1]) * (points[index].y - points[index - 1].y) + points[index - 1].y;
        pathData.push({command: 'lineTo', points: [x0, y0]});
        direction = changeDirection(direction);
      }
    });

    pathData.push({command: 'lineTo', points: [lastPoint.x, lastPoint.y]});

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
