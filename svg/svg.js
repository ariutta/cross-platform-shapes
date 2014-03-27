crossPlatformShapes.svg = function(){
  var arc = function(data){
    return this.path.prepareForRendering('arc', data);
  };
  var arrow = function(data){
    return this.path.prepareForRendering('arrow', data);
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
    arrow:arrow,
    brace:brace,
    lineStraight:lineStraight,
    rectangle:rectangle
  };
}();
