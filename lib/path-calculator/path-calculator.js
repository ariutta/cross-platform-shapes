module.exports = function(){
  // TODO: look at whether it makes sense to have some of the marker description code here and some in crossPlatformShapes.svg.marker
  // NOTE: if you add a new marker, make sure to add the data here and in crossPlatformShapes.svg.marker
  this.markerData = {
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
  };

  this.markerData.mimInhibition = this.markerData.tBar;
  this.markerData.mimConversion = this.markerData.arrow;
};
