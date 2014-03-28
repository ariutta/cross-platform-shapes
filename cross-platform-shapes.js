window.crossPlatformShapes = {
  init: function(args){
    var crossPlatformShapes = this;
    var targetImageSelector = args.targetImageSelector;
    var targetImage = document.querySelector(targetImageSelector);
    this.svg.path.targetImage = targetImage;
    crossPlatformShapes.format = targetImage.tagName.toLowerCase();
    if (!!args.customShapes) {
      crossPlatformShapes.customShapes = args.customShapes;
    }
  },
  arc: function(data){
    return this[this.format].arc(data);
  },
  arrow: function(data){
    return this[this.format].arrow(data);
  },
  brace: function(data){
    return this[this.format].brace(data);
  },
  complex: function(data){
    return this[this.format].complex(data);
  },
  endoplasmicReticulum: function(data){
    return this[this.format].endoplasmicReticulum(data);
  },
  golgiApparatus: function(data){
    return this[this.format].golgiApparatus(data);
  },
  hexagon: function(data){
    return this[this.format].hexagon(data);
  },
  lineCurved: function(data){
    return this[this.format].lineCurved(data);
  },
  lineElbow: function(data){
    return this[this.format].lineElbow(data);
  },
  lineSegmented: function(data){
    return this[this.format].lineSegmented(data);
  },
  lineStraight: function(data){
    return this[this.format].lineStraight(data);
  },
  mimDegradation: function(data){
    return this[this.format].mimDegradation(data);
  },
  mitochondria: function(data){
    return this[this.format].mitochondria(data);
  },
  ovalDouble: function(data){
    return this[this.format].ovalDouble(data);
  },
  oval: function(data){
    return this[this.format].oval(data);
  },
  pentagon: function(data){
    return this[this.format].pentagon(data);
  },
  rectangle: function(data){
    return this[this.format].rectangle(data);
  },
  roundedRectangleDouble: function(data){
    return this[this.format].roundedRectangleDouble(data);
  },
  roundedRectangle: function(data){
    return this[this.format].roundedRectangle(data);
  },
  sarcoplasmicReticulum: function(data){
    return this[this.format].sarcoplasmicReticulum(data);
  },
  triangle: function(data){
    return this[this.format].triangle(data);
  },
  mimNecessaryStimulation: function(data){
    return this[this.format].mimNecessaryStimulation(data);
  },
  mimBinding: function(data){
    return this[this.format].mimBinding(data);
  },
  mimConversion: function(data){
    return this[this.format].mimConversion(data);
  },
  mimStimulation: function(data){
    return this[this.format].mimStimulation(data);
  },
  mimModification: function(data){
    return this[this.format].mimModification(data);
  },
  mimCatalysis: function(data){
    return this[this.format].mimCatalysis(data);
  },
  mimInhibition: function(data){
    return this[this.format].mimInhibition(data);
  },
  mimCleavage: function(data){
    return this[this.format].mimCleavage(data);
  },
  mimCovalentBond: function(data){
    return this[this.format].mimCovalentBond(data);
  },
  mimTranscriptionTranslation: function(data){
    return this[this.format].mimTranscriptionTranslation(data);
  },
  mimGap: function(data){
    return this[this.format].mimGap(data);
  },
  tBar: function(data){
    return this[this.format].tBar(data);
  },
  mimBranchingLeft: function(data){
    return this[this.format].mimBranchingLeft(data);
  },
  mimBranchingRight: function(data){
    return this[this.format].mimBranchingRight(data);
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
