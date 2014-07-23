// see also http://schepers.cc/svg/path/catmullrom2bezier.js
module.exports = (function(){
  'use strict';

  function getPathSegments(crossPlatformShapesInstance, data) {
    var catmullRomPoints = data.points;
    var pointCount = catmullRomPoints.length;

    var firstCatmullRomPointWithNoOffset = catmullRomPoints[0];
    var pathData = [{command: 'moveTo', points: [firstCatmullRomPointWithNoOffset.x, firstCatmullRomPointWithNoOffset.y]}];
    /*

    var markerStart = data.markerStart;
    if (!!markerStart && firstCatmullRomPointWithNoOffset.anchor && typeof(firstCatmullRomPointWithNoOffset.anchor[2]) !== 'undefined' && typeof(firstCatmullRomPointWithNoOffset.anchor[3]) !== 'undefined' && !!crossPlatformShapesInstance.presetShapes[markerStart]) {
      var firstCatmullRomPointWithOffset = catmullRomPoints[0];
      var firstOffset;
      var firstMarkerData = crossPlatformShapes.pathCalculator.markerData[markerStart];
      if (!!firstMarkerData) {
        firstOffset = firstMarkerData.markerHeight;
      } else {
        firstOffset = 12;
      }
      firstCatmullRomPointWithOffset.x = firstCatmullRomPointWithOffset.anchor[2] * firstOffset + firstCatmullRomPointWithOffset.x;
      firstCatmullRomPointWithOffset.y = firstCatmullRomPointWithOffset.anchor[3] * firstOffset + firstCatmullRomPointWithOffset.y;
      pathData.push({command: 'lineTo', points: [firstCatmullRomPointWithOffset.x, firstCatmullRomPointWithOffset.y]});
    }

    var lastCatmullRomPointWithNoOffset = catmullRomPoints[pointCount - 1];
    var lastSegment = [];

    var markerEnd = data.markerEnd;
    if (!!markerEnd && lastCatmullRomPointWithNoOffset.anchor && typeof(lastCatmullRomPointWithNoOffset.anchor[2]) !== 'undefined' && typeof(lastCatmullRomPointWithNoOffset.anchor[3]) !== 'undefined' && !!crossPlatformShapesInstance.presetShapes[markerEnd]) {
      lastSegment.push({command: 'lineTo', points: [lastCatmullRomPointWithNoOffset.x, lastCatmullRomPointWithNoOffset.y]});

      var lastCatmullRomPointWithOffset = catmullRomPoints[pointCount - 1];
      var lastOffset;
      var lastMarkerData = crossPlatformShapes.pathCalculator.markerData[markerEnd];
      if (!!lastMarkerData) {
        lastOffset = lastMarkerData.markerHeight;
      } else {
        lastOffset = 12;
      }
      lastCatmullRomPointWithOffset.x = lastCatmullRomPointWithOffset.anchor[2] * lastOffset + lastCatmullRomPointWithOffset.x;
      lastCatmullRomPointWithOffset.y = lastCatmullRomPointWithOffset.anchor[3] * lastOffset + lastCatmullRomPointWithOffset.y;
    }
    //*/

    for (var i = 0; pointCount - 1 > i; i++) {
      var p = [];
      if ( i === 0 ) {
        p.push( {x: parseFloat(catmullRomPoints[ i ].x), y: parseFloat(catmullRomPoints[ i ].y)} );
        p.push( {x: parseFloat(catmullRomPoints[ i ].x), y: parseFloat(catmullRomPoints[ i ].y)} );
        p.push( {x: parseFloat(catmullRomPoints[ i + 1 ].x), y: parseFloat(catmullRomPoints[ i + 1 ].y)} );
        p.push( {x: parseFloat(catmullRomPoints[ i + 2 ].x), y: parseFloat(catmullRomPoints[ i + 2 ].y)} );
      } else if ( i === pointCount - 2 ) {
        p.push( {x: parseFloat(catmullRomPoints[ i - 1 ].x), y: parseFloat(catmullRomPoints[ i - 1 ].y)} );
        p.push( {x: parseFloat(catmullRomPoints[ i ].x), y: parseFloat(catmullRomPoints[ i ].y)} );
        p.push( {x: parseFloat(catmullRomPoints[ i + 1 ].x), y: parseFloat(catmullRomPoints[ i + 1 ].y)} );
        p.push( {x: parseFloat(catmullRomPoints[ i + 1 ].x), y: parseFloat(catmullRomPoints[ i + 1 ].y)} );
      } else {
        p.push( {x: parseFloat(catmullRomPoints[ i - 1 ].x), y: parseFloat(catmullRomPoints[ i - 1 ].y)} );
        p.push( {x: parseFloat(catmullRomPoints[ i ].x), y: parseFloat(catmullRomPoints[ i ].y)} );
        p.push( {x: parseFloat(catmullRomPoints[ i + 1 ].x), y: parseFloat(catmullRomPoints[ i + 1 ].y)} );
        p.push( {x: parseFloat(catmullRomPoints[ i + 2 ].x), y: parseFloat(catmullRomPoints[ i + 2 ].y)} );
      }

      // Catmull-Rom to Cubic Bezier conversion matrix 
      //    0       1       0       0
      //  -1/6      1      1/6      0
      //    0      1/6      1     -1/6
      //    0       0       1       0

      var bezierPoints = [];
      bezierPoints.push( [ ((-p[0].x + 6 * p[1].x + p[2].x) / 6), ((-p[0].y + 6 * p[1].y + p[2].y) / 6) ] );
      bezierPoints.push( [ ((p[1].x + 6 * p[2].x - p[3].x) / 6), ((p[1].y + 6 * p[2].y - p[3].y) / 6) ] );
      bezierPoints.push( [ p[2].x, p[2].y ] );

      pathData.push({command: 'bezierCurveTo', points: bezierPoints});
    }

    //pathData = pathData.concat(lastSegment);
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
