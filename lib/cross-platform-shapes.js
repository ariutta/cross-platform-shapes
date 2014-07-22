var _ = require('lodash');

(function () {

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Create a reference to this
  //var Gpml2JsonInstance = JSON.parse(JSON.stringify(Gpml2Json));
  //var Gpml2JsonInstance = _.cloneDeep(Gpml2Json);

  var isBrowser = false;

  // detect environment: browser vs. Node.js
  // I would prefer to use the code from underscore.js or lodash.js, but it doesn't appear to work for me,
  // possibly because I'm using browserify.js and want to detect browser vs. Node.js, whereas
  // the other libraries are just trying to detect whether we're in CommonJS or not.
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    isBrowser = true;
  }
  var crossPlatformShapes = {};
  crossPlatformShapes.presetShapes = require('./preset-shapes/preset-shapes');

  crossPlatformShapes.svg = require('./svg/svg');
  crossPlatformShapes.canvas = require('./canvas/canvas');

  crossPlatformShapes.customShapes = require('./custom-shapes');

  crossPlatformShapes.getInstance = function(args, callback){
    var crossPlatformShapesInstance = _.cloneDeep(crossPlatformShapes);
    var customShapes = args.customShapes;

    var targetSelector = args.targetSelector;
    var targetElement = document.querySelector(targetSelector);
    var targetTagName = targetElement.tagName.toLowerCase();
    var format;

    // TODO add canvas

    if (targetTagName === 'div') {
      format = args.format;
    } else {
      format = targetTagName;
    }

    args.targetElement = targetElement;
    args.targetTagName = targetTagName;
    crossPlatformShapesInstance[format] = crossPlatformShapesInstance[format].getInstance(crossPlatformShapesInstance, args);
    crossPlatformShapesInstance[format].targetTagName = targetTagName;

    _.forIn(crossPlatformShapes.presetShapes, function(value, presetShapeName) {
      crossPlatformShapesInstance[presetShapeName] = function(data, callback){
        return crossPlatformShapesInstance[format].path.render(crossPlatformShapesInstance, presetShapeName, data, callback);
      };
    });

    if (!!customShapes) {
      crossPlatformShapesInstance.customShapes = customShapes;
      _.forIn(customShapes, function(value, customShapeName) {
        crossPlatformShapesInstance[customShapeName] = function(data, callback){
          return crossPlatformShapesInstance[format].image.render(crossPlatformShapesInstance, customShapeName, data, callback);
        };
      });
    }

    return crossPlatformShapesInstance;
  };

  // Export the crossPlatformShapes object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `crossPlatformShapes` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = crossPlatformShapes;
    }
    exports.crossPlatformShapes = crossPlatformShapes;
  } else {
    root.crossPlatformShapes = crossPlatformShapes;
  }
})();
