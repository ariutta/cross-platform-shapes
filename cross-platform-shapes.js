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
    //return this[this.format].arc();
    return this[this.format].arc(data);
  },
  brace: function(data){
    return this[this.format].brace(data);
  },
  lineStraight: function(data){
    return this[this.format].lineStraight(data);
  },
  rectangle: function(data){
    return this[this.format].rectangle(data);
  }
};
