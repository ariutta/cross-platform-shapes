(function () {
  // Create a safe reference to the crossPlatformShapes object for use below.
  var crossPlatformShapes = function(obj) {
    if (obj instanceof crossPlatformShapes) {
      return obj;
    }
    if (!(this instanceof crossPlatformShapes)) {
      return new crossPlatformShapes(obj);
    }
  };

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
  crossPlatformShapes.pathCalculator = require('./path-calculator/path-calculator');
  presetShapesNames.forEach(function(presetShapeName) {
    crossPlatformShapes.pathCalculator[presetShapeName] = require('./path-calculator/path-calculator/' + presetShapeName);
  });

  crossPlatformShapes.svg = require('./svg/svg');
  crossPlatformShapes.canvas = require('./canvas/canvas');

  crossPlatformShapes.customShapes = require('./custom-shapes');

  crossPlatformShapes.init = function(args, callback){
    var crossPlatformShapesInstance = JSON.parse(JSON.stringify(crossPlatformShapes));
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
    crossPlatformShapesInstance[format] = crossPlatformShapesInstance[format].init(args);
    crossPlatformShapesInstance[format].targetTagName = targetTagName;

    presetShapesNames.forEach(function(presetShapeName) {
      crossPlatformShapesInstance[presetShapeName] = function(data, callback){
        return crossPlatformShapesInstance[format].path.render(presetShapeName, data, callback);
      };
    });

    if (!!customShapes) {
      crossPlatformShapesInstance.customShapes = customShapes;
      crossPlatformShapesInstance[format].image.customShapes = customShapes;
      d3.map(customShapes).keys().forEach(function(customShapeName) {
        crossPlatformShapesInstance[customShapeName] = function(data, callback){
          return crossPlatformShapesInstance[format].image.render(customShapeName, data, callback);
        };
      });
    }

    return crossPlatformShapesInstance;
  };

  window.crossPlatformShapes = crossPlatformShapes;
})();
