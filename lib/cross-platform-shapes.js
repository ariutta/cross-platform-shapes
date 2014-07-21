var _ = require('lodash');

(function () {
  var crossPlatformShapes = {};
  crossPlatformShapes.presetShapes = require('./preset-shapes/preset-shapes');

  var presetShapesNames = [
    'arc',
    'arrow',
    'brace',
    'complex',
    'endoplasmicReticulum',
    'golgiApparatus',
    'hexagon',
    'lineCurved',
    'lineElbow',
    'lineSegmented',
    'lineStraight',
    'mimDegradation',
    'mitochondria',
    'ellipseDouble',
    'ellipse',
    'pentagon',
    'rectangle',
    'roundedRectangleDouble',
    'roundedRectangle',
    'sarcoplasmicReticulum',
    'triangle',
    'mimNecessaryStimulation',
    'mimBinding',
    'mimConversion',
    'mimStimulation',
    'mimModification',
    'mimCatalysis',
    'mimInhibition',
    'mimCleavage',
    'mimCovalentBond',
    'mimTranscriptionTranslation',
    'mimGap',
    'tBar',
    'mimBranchingLeft',
    'mimBranchingRight'
  ];

  crossPlatformShapes.svg = require('./svg/svg');
  crossPlatformShapes.canvas = require('./canvas/canvas');

  crossPlatformShapes.customShapes = require('./custom-shapes');

  crossPlatformShapes.init = function(args, callback){
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
    crossPlatformShapesInstance[format] = crossPlatformShapesInstance[format].init(crossPlatformShapesInstance, args);
    crossPlatformShapesInstance[format].targetTagName = targetTagName;

    presetShapesNames.forEach(function(presetShapeName) {
      crossPlatformShapesInstance[presetShapeName] = function(data, callback){
        return crossPlatformShapesInstance[format].path.render(crossPlatformShapesInstance, presetShapeName, data, callback);
      };
    });

    if (!!customShapes) {
      crossPlatformShapesInstance.customShapes = customShapes;
      d3.map(customShapes).keys().forEach(function(customShapeName) {
        crossPlatformShapesInstance[customShapeName] = function(data, callback){
          return crossPlatformShapesInstance[format].image.render(crossPlatformShapesInstance, customShapeName, data, callback);
        };
      });
    }

    return crossPlatformShapesInstance;
  };

  window.crossPlatformShapes = crossPlatformShapes;
})();
