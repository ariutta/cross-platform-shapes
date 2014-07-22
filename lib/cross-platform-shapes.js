var _ = require('lodash');

var crossPlatformShapes = {
  presetShapes: require('./preset-shapes/preset-shapes'),
  svg: require('./svg/svg'),
  canvas: require('./canvas/canvas'),
  customShapes: require('./custom-shapes'),
  getInstance: function(args, callback){
    var crossPlatformShapesInstance = _.cloneDeep(this);
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
  }
};

module.exports = crossPlatformShapes;
