var presetShapes = {
  // These shapes are automatically added to this file based on the contents of this directory. See Gruntfile.js.
  arc: require('./arc'),
  arrow: require('./arrow'),
  complex: require('./complex'),
  ellipse: require('./ellipse'),
  ellipseDouble: require('./ellipseDouble'),
  endoplasmicReticulum: require('./endoplasmicReticulum'),
  golgiApparatus: require('./golgiApparatus'),
  gridSquare: require('./gridSquare'),
  hexagon: require('./hexagon'),
  lineCatmullRom: require('./lineCatmullRom'),
  lineCurved: require('./lineCurved'),
  lineElbow: require('./lineElbow'),
  lineSegmented: require('./lineSegmented'),
  lineStraight: require('./lineStraight'),
  mimBinding: require('./mimBinding'),
  mimBranchingLeft: require('./mimBranchingLeft'),
  mimBranchingRight: require('./mimBranchingRight'),
  mimCatalysis: require('./mimCatalysis'),
  mimCleavage: require('./mimCleavage'),
  mimConversion: require('./mimConversion'),
  mimCovalentBond: require('./mimCovalentBond'),
  mimDegradation: require('./mimDegradation'),
  mimGap: require('./mimGap'),
  mimInhibition: require('./mimInhibition'),
  mimModification: require('./mimModification'),
  mimNecessaryStimulation: require('./mimNecessaryStimulation'),
  mimStimulation: require('./mimStimulation'),
  mimTranscriptionTranslation: require('./mimTranscriptionTranslation'),
  mitochondria: require('./mitochondria'),
  none: require('./none'),
  pentagon: require('./pentagon'),
  rectangle: require('./rectangle'),
  roundedRectangle: require('./roundedRectangle'),
  roundedRectangleDouble: require('./roundedRectangleDouble'),
  sarcoplasmicReticulum: require('./sarcoplasmicReticulum'),
  tBar: require('./tBar'),
  triangle: require('./triangle'),

  // TODO: look at whether it makes sense to have some of the marker description code here and some in crossPlatformShapes.svg.marker
  // NOTE: if you add a new marker, make sure to add the data here and in crossPlatformShapes.svg.marker
  markerData: {
    arrow: {
      markerWidth:12,
      markerHeight:12
    },
    mimBinding: {
      markerWidth:12,
      markerHeight:12
    },
    mimNecessaryStimulation: {
      markerWidth:16,
      markerHeight:12
    },
    mimStimulation: {
      markerWidth:12,
      markerHeight:12
    },
    mimModification: {
      markerWidth:12,
      markerHeight:12
    },
    mimCatalysis: {
      markerWidth:12,
      markerHeight:12
    },
    mimCleavage: {
      markerWidth:20,
      markerHeight:30
    },
    mimCovalentBond: {
      markerWidth:12,
      markerHeight:12
    },
    mimTranscriptionTranslation: {
      markerWidth:20,
      markerHeight:24
    },
    mimGap: {
      markerWidth:12,
      markerHeight:12
    },
    mimBranchingLeft: { // TODO: this is just a copy of arrow. it needs to be updated.
      markerWidth:12,
      markerHeight:12
    },
    mimBranchingRight: { // TODO: this is just a copy of arrow. it needs to be updated.
      markerWidth:12,
      markerHeight:12
    },
    tBar: {
      markerWidth:10,
      markerHeight:20
    }
  },
};

presetShapes.markerData.mimInhibition = presetShapes.markerData.tBar;
presetShapes.markerData.mimConversion = presetShapes.markerData.arrow;

module.exports = presetShapes;
