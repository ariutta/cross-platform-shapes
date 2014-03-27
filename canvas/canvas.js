crossPlatformShapes.canvas = function(){
  var arc = function(data){
    return this.path.prepareForRendering('arc', data);
  };
  var brace = function(data){
    return this.path.prepareForRendering('brace', data);
  };
  var lineStraight = function(data){
    return this.path.prepareForRendering('lineStraight', data);
  };
  var rectangle = function(data){
    return this.path.prepareForRendering('rectangle', data);
  };

  return {
    arc:arc,
    brace:brace,
    lineStraight:lineStraight,
    rectangle:rectangle
  };
}();
