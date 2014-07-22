(function() {

  // Baseline setup
  // --------------

  /** Used to determine if values are of the language type `Object` */
  var objectTypes = {
    'function': true,
    'object': true
  };

  // Establish the root object, `window` in the browser, or `exports` on the server.
  /** Used as a reference to the global object */
  var root = (objectTypes[typeof window] && window) || this;

  var crossPlatformShapes = require('./lib/cross-platform-shapes');
  root.crossPlatformShapes = crossPlatformShapes;

}.call(this));

