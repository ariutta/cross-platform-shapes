window.crossPlatformShapes = {
  init: function(args){
    var crossPlatformShapes = this;
    var format = args.format || 'svg';
    crossPlatformShapes.format = format;
    if (!!args.customShapes) {
      crossPlatformShapes.customShapes = args.customShapes;
    }
  },
  format: 'svg',
  arc: function(data){
    //return this[this.format].arc();
    return this[this.format].arc(data);
  },
  brace: function(data){
    return this[this.format].brace(data);
  },
  rectangle: function(data){
    return this[this.format].rectangle(data);
  }
};
