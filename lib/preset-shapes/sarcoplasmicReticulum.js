module.exports = (function(){
  'use strict';

  function getPathSegments(crossPlatformShapesInstance, data) {
    var x = data.x,
      y = data.y,
      width = data.width,
      height = data.height;

    // TODO: the commands below are just a copy of the commands for rectangle.
    // We need to convert the commented out pathData below to the HTML5 Canvas path command format.
    var pathData = [{command: 'moveTo', points: [x, y]},
      {command: 'lineTo', points: [(x + width), y]},
      {command: 'lineTo', points: [(x + width), (y + height)]},
      {command: 'lineTo', points: [(x), (y + height)]},
      {command: 'closePath', points: []}];

      /*
    var pathData = 'm46.60182,1.40724c-32.37224,1.34138 -36.32004,22.77011 -26.50318,38.12777c9.31826,18.3425 -18.7656,30.15016 2.56955,49.37807c16.82126,13.11594 46.33175,6.10508 52.12638,-8.56826c5.89916,-15.24847 -10.95099,-26.0272 -3.29316,-40.96135c10.85342,-19.88432 -0.77615,-38.13043 -24.89959,-37.97624z';
    //*/

    return pathData;
  }

  return {getPathSegments:getPathSegments};
})();
