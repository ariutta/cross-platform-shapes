window.crossPlatformShapes = {
  init: function(args){
    var customShapes = args.customShapes;
    var crossPlatformShapesInstance = this;
    this.svg.path.crossPlatformShapesInstance = crossPlatformShapesInstance;

    var targetImageSelector = args.targetImageSelector;
    var targetImage = document.querySelector(targetImageSelector);
    var targetImageSelection = d3.select(targetImage);
    this.svg.marker.targetImageSelectionDefs = targetImageSelection.select('defs');
    this.svg.path.targetImage = targetImage;

    crossPlatformShapesInstance.format = targetImage.tagName.toLowerCase();

    var backgroundColor = args.backgroundColor;
    if (crossPlatformShapesInstance.format === 'svg') {
      this.svg.path.availableMarkers = this.svg.marker.availableMarkers = {};

      this.svg.path.backgroundColor = this.svg.marker.backgroundColor = backgroundColor;
      targetImageSelection.attr('style', 'background-color:' + backgroundColor + '; ');
    }

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
      'ovalDouble',
      'oval',
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
      crossPlatformShapesInstance[presetShapeName] = function(data){
        return crossPlatformShapesInstance[crossPlatformShapesInstance.format].path.prepareForRendering(presetShapeName, data);
      };
    });

    if (!!customShapes) {
      crossPlatformShapesInstance.customShapes = customShapes;
      crossPlatformShapesInstance[crossPlatformShapesInstance.format].image.customShapes = customShapes;
      d3.map(customShapes).keys().forEach(function(customShapeName) {
        crossPlatformShapesInstance[customShapeName] = function(data){
          return crossPlatformShapesInstance[crossPlatformShapesInstance.format].image.prepareForRendering(customShapeName, data);
        };
      });
    }
  }
};

/*
arc
arrow
brace
complex
endoplasmic-reticulum
golgi-apparatus
hexagon
line-curved
line-elbow
line-segmented
line-straight
mim-degradation
mitochondria
oval-double
oval
pentagon
rectangle
rounded-rectangle-double
rounded-rectangle
sarcoplasmic-reticulum
triangle
mim-necessary-stimulation
mim-binding
mim-conversion
mim-stimulation
mim-modification
mim-catalysis
mim-inhibition
mim-cleavage
mim-covalent-bond
mim-transcription-translation
mim-gap
t-bar
mim-branching-left
mim-branching-right

arc
arrow
brace
complex
endoplasmicReticulum
golgiApparatus
hexagon
lineCurved
lineElbow
lineSegmented
lineStraight
mimDegradation
mitochondria
ovalDouble
oval
pentagon
rectangle
roundedRectangleDouble
roundedRectangle
sarcoplasmicReticulum
triangle
mimNecessaryStimulation
mimBinding
mimConversion
mimStimulation
mimModification
mimCatalysis
mimInhibition
mimCleavage
mimCovalentBond
mimTranscriptionTranslation
mimGap
tBar
mimBranchingLeft
mimBranchingRight
//*/
