crossPlatformShapes.pathCalculator.roundedRectangleDouble = function(data){
  'use strict';

  var x = data.x,
    y = data.y,
    width = data.width,
    height = data.height;
  /* TODO refactor this code so we only have a single function for drawing single-line rounded rectangles.
  var outerRoundedRectangle = drawRoundedRectangle(x, y, width, height);
  var innerRoundedRectangle = drawRoundedRectangle(x + 3, y + 3, width - 3, height - 3);
  //*/
  var outerRoundedRectangle = crossPlatformShapes.pathCalculator.roundedRectangle(data);

  var innerRoundedRectangleData = data;
  var doubleLineGap = 2 * data.borderWidth || 6;
  innerRoundedRectangleData.x = data.x + doubleLineGap;
  innerRoundedRectangleData.y = data.y + doubleLineGap;
  innerRoundedRectangleData.width = data.width - 2*doubleLineGap;
  innerRoundedRectangleData.height = data.height - 2*doubleLineGap;
  var innerRoundedRectangle = crossPlatformShapes.pathCalculator.roundedRectangle(innerRoundedRectangleData);
  var pathData = outerRoundedRectangle.concat(innerRoundedRectangle);

  return pathData;
};
