module.exports = (function(){
  'use strict';

  function getPathSegments(crossPlatformShapesInstance, data) {
    var outerEllipse = crossPlatformShapesInstance.presetShapes.ellipse.getPathSegments(crossPlatformShapesInstance, data);

    var innerEllipseData = data;
    var doubleLineGap = 2 * data.borderWidth || 6;
    innerEllipseData.x = data.x + doubleLineGap;
    innerEllipseData.y = data.y + doubleLineGap;
    innerEllipseData.width = data.width - 2*doubleLineGap;
    innerEllipseData.height = data.height - 2*doubleLineGap;
    var innerEllipse = crossPlatformShapesInstance.presetShapes.ellipse.getPathSegments(crossPlatformShapesInstance, innerEllipseData);

    var pathData = outerEllipse.concat(innerEllipse);
    return pathData;
  }

  return {getPathSegments:getPathSegments};
})();
