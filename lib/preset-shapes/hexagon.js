module.exports = (function(){
  'use strict';

  function getPathSegments(crossPlatformShapesInstance, data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;
      
    var pathData = [{command: 'moveTo', points: [(x + 0.25*width) , y]},
      {command: 'lineTo', points: [(x + 0.75*width), y]},
      {command: 'lineTo', points: [(x + width), (y+ 0.5*height)]},
      {command: 'lineTo', points: [(x + 0.75*width), (y + height)]},
      {command: 'lineTo', points: [(x + 0.25*width), (y + height)]},
      {command: 'lineTo', points: [x, (y+ 0.5*height)]},
      {command: 'closePath', points: []}];
    
    return pathData;
  }

  return {getPathSegments:getPathSegments};
})();
