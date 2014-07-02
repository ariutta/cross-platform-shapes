// see also http://schepers.cc/svg/path/catmullrom2bezier.js
crossPlatformShapes.pathCalculator.lineCurved = function(data){
  'use strict';

  var catmullRomPoints = data.points;
  var firstCatmullRomPoint = catmullRomPoints[0];
  var pathData = [{command: 'moveTo', points: [firstCatmullRomPoint.x, firstCatmullRomPoint.y]}];

  for (var i = 0, iLen = catmullRomPoints.length; iLen - 1 > i; i++) {
    var p = [];
    if ( i === 0 ) {
      p.push( {x: parseFloat(catmullRomPoints[ i ].x), y: parseFloat(catmullRomPoints[ i ].y)} );
      p.push( {x: parseFloat(catmullRomPoints[ i ].x), y: parseFloat(catmullRomPoints[ i ].y)} );
      p.push( {x: parseFloat(catmullRomPoints[ i + 1 ].x), y: parseFloat(catmullRomPoints[ i + 1 ].y)} );
      p.push( {x: parseFloat(catmullRomPoints[ i + 2 ].x), y: parseFloat(catmullRomPoints[ i + 2 ].y)} );
    } else if ( i === iLen - 2 ) {
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

  return pathData;
};
