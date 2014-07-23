// modified from d3js: https://github.com/mbostock/d3/blob/ed54503fc7781d8bfe9e9fe125b76b9bbb5ac05c/src/svg/line.js
// TODO this code is kind of hacky. it seems to work OK, but it's probably confusing and should be refactored for readability/maintainability.
module.exports = (function(){
  'use strict';

  function getPathSegments(crossPlatformShapesInstance, data) {
    // Returns the dot product of the given four-element vectors.
    function d3_svg_lineDot4(a, b) {
      return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
    }

    // Matrix to transform basis (b-spline) control points to bezier
    // control points. Derived from FvD 11.2.8.
    var d3_svg_lineBasisBezier1 = [0, 2/3, 1/3, 0],
        d3_svg_lineBasisBezier2 = [0, 1/3, 2/3, 0],
        d3_svg_lineBasisBezier3 = [0, 1/6, 2/3, 1/6];

    // Pushes a "C" Bézier curve onto the specified path array, given the
    // two specified four-element arrays which define the control points.
    function d3_svg_lineBasisBezier(pathData, x, y) {
      var pointsForBezier = [];
      pointsForBezier.push([d3_svg_lineDot4(d3_svg_lineBasisBezier1, x), d3_svg_lineDot4(d3_svg_lineBasisBezier1, y)]);

      pointsForBezier.push([d3_svg_lineDot4(d3_svg_lineBasisBezier2, x), d3_svg_lineDot4(d3_svg_lineBasisBezier2, y)]);

      pointsForBezier.push([d3_svg_lineDot4(d3_svg_lineBasisBezier3, x), d3_svg_lineDot4(d3_svg_lineBasisBezier3, y)]);

      pathData.push({command: 'bezierCurveTo', points: pointsForBezier});
    }

    function changeDirection(currentDirection) {
      var xDirection = Math.abs(Math.abs(currentDirection[0]) - 1);
      var yDirection = Math.abs(Math.abs(currentDirection[1]) - 1);
      return [xDirection, yDirection];
    }

    var elbowPoints = data.points;
    var elbowPointCount = elbowPoints.length;
    var firstPoint = elbowPoints[0],
      lastPoint = elbowPoints[elbowPointCount - 1];
    var points = [];
    points.push(firstPoint);

    var lastSegment = [];
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

    // for curves, I'm calculating and using the points representing the elbow vertices, from the given points (which represent the first point, any elbow segment mid-points and the last point).
    // I'm making sure the curve passes through the midpoint of the marker side that is furthest away from the node it is attached to
    // TODO this code might be confusing, because it involves redefining the points. Look at refactoring it for readability.
    var markerHeightFactor = 0.75;
    var markerStart = data.markerStart;
    if (!!markerStart && firstPoint.anchor && typeof(firstPoint.anchor[2]) !== 'undefined' && typeof(firstPoint.anchor[3]) !== 'undefined' && !!crossPlatformShapesInstance.presetShapes[markerStart]) {
      var firstPointWithOffset = {};
      var firstOffset;
      var firstMarkerData = crossPlatformShapesInstance.presetShapes[markerStart].getDimensions(crossPlatformShapesInstance);
      if (!!firstMarkerData) {
        firstOffset = markerHeightFactor * firstMarkerData.markerHeight;
      } else {
        firstOffset = 12;
      }
      firstPointWithOffset.x = firstPoint.anchor[2] * firstOffset + firstPoint.x;
      firstPointWithOffset.y = firstPoint.anchor[3] * firstOffset + firstPoint.y;
      pathData.push({command: 'lineTo', points: [firstPointWithOffset.x, firstPointWithOffset.y]});
      points[0] = firstPointWithOffset;
    }

    var markerEnd = data.markerEnd;
    if (!!markerEnd && lastPoint.anchor && typeof(lastPoint.anchor[2]) !== 'undefined' && typeof(lastPoint.anchor[3]) !== 'undefined' && !!crossPlatformShapesInstance.presetShapes[markerEnd]) {
      lastSegment.push({command: 'lineTo', points: [lastPoint.x, lastPoint.y]});

      var lastPointWithOffset = {};
      var lastOffset;
      var lastMarkerData = crossPlatformShapesInstance.presetShapes[markerEnd].getDimensions(crossPlatformShapesInstance);
      if (!!lastMarkerData) {
        lastOffset = markerHeightFactor * lastMarkerData.markerHeight;
      } else {
        lastOffset = 12;
      }
      lastPointWithOffset.x = lastPoint.anchor[2] * lastOffset + lastPoint.x;
      lastPointWithOffset.y = lastPoint.anchor[3] * lastOffset + lastPoint.y;
      elbowPoints[elbowPointCount - 1] = lastPoint = lastPointWithOffset;
    }

    elbowPoints.forEach(function(elbowPoint, index) {
      var x0, y0, x1, y1;
      if (index > 0 && index < elbowPointCount) {
        x0 = Math.abs(direction[0]) * (elbowPoints[index].x - elbowPoints[index - 1].x) + elbowPoints[index - 1].x;
        y0 = Math.abs(direction[1]) * (elbowPoints[index].y - elbowPoints[index - 1].y) + elbowPoints[index - 1].y;
        points.push({x: x0, y: y0});
        direction = changeDirection(direction);
      }
    });
    points.push(lastPoint);

    var i = 1,
      n = points.length,
      pi = points[0],
      x0 = pi.x,
      y0 = pi.y,
      px = [x0, x0, x0, (pi = points[1]).x],
      py = [y0, y0, y0, pi.y];
      pathData.push({command: 'lineTo', points: [d3_svg_lineDot4(d3_svg_lineBasisBezier3, px), d3_svg_lineDot4(d3_svg_lineBasisBezier3, py)]});
    points.push(points[n - 1]);
    while (++i <= n) {
      pi = points[i];
      px.shift(); px.push(pi.x);
      py.shift(); py.push(pi.y);
      d3_svg_lineBasisBezier(pathData, px, py);
    }
    points.pop();
    pathData.push({command: 'lineTo', points: [pi.x, pi.y]});
    pathData = pathData.concat(lastSegment);
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
