// TODO this is currently just a renamed copy of lineStraight
crossPlatformShapes.pathCalculator.lineCurved = function(){
  'use strict';

  //for generating bezier curves through a path of points (pathpoints, not waypoints)
  var svgCurve = d3.svg.line()
  .x(function(d) {return d.x; })
  .y(function(d) {return d.y;})
  //.interpolate("cardinal");
  .interpolate("basis");

  function getAttributes(data) {
    var pathData = svgCurve(data.points);


    var attributes = [
      {
        name:'d',
        value:pathData
      }
    ];
    return attributes;
  }

  return {
    getAttributes:getAttributes
  };
}();
