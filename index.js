(function(window) {

  var crossPlatformShapes = require('./lib/cross-platform-shapes');

  if (!!module && !!module.exports) {
    module.exports = crossPlatformShapes;
  }

  if (!!window) {
    window.crossPlatformShapes = crossPlatformShapes;
  }

}(window));
