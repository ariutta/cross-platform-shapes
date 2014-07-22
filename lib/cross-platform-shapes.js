var _ = require('lodash');

(function () {
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

  window.crossPlatformShapes = crossPlatformShapes;
})();
