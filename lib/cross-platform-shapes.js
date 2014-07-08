module.exports = {
  init: function(args, callback){
    var customShapes = args.customShapes;
    var crossPlatformShapesInstance = Object.create(this);
    //this.svg.crossPlatformShapesInstance = this.svg.path.crossPlatformShapesInstance = crossPlatformShapesInstance;

    var targetSelector = args.targetSelector;
    var targetElement = document.querySelector(targetSelector);
    var targetTagName = targetElement.tagName.toLowerCase();
    var format;

    crossPlatformShapesInstance.svg = require('./svg/svg');
    crossPlatformShapesInstance.svg.path = require('./svg/path');
    crossPlatformShapesInstance.svg.image = require('./svg/image');
    crossPlatformShapesInstance.svg.marker = require('./svg/marker');

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


    // TODO do we need this?
    crossPlatformShapesInstance.viewport = crossPlatformShapesInstance[format].viewport;
  }
};
