crossPlatformShapes.svg.image = function(){
  var prepareForRendering = function(shapeName, data){
    var result = {};
    var attributes = [];
    result.elementName = 'image';
    attributes.push({name: 'xlink:href', value: crossPlatformShapes.customShapes[shapeName].href});
    attributes.push({name: 'x', value: data.x || 0});
    attributes.push({name: 'y', value: data.y || 0});
    attributes.push({name: 'width', value: data.width || 0});
    attributes.push({name: 'height', value: data.height || 0});
    var rotation = data.rotation;
    if (!!rotation) {
      attributes.push({name: 'transform', value: 'rotate(' + rotation + ')'});
    }
    result.attributes = attributes;
    return result;
  };

  var arc = function(data){
    return prepareForRendering('arc', data);
  };

  var brace = function(data){
    return prepareForRendering('brace', data);
  };

  var rectangle = function(data){
    return prepareForRendering('rectangle', data);
  };

  // TODO figure out how custom shapes will be added.  try to avoid adding manually having to add a call to prepareForRendering() for every shape.

  return {
    arc:arc,
    brace:brace,
    rectangle:rectangle,
    prepareForRendering:prepareForRendering
  };
}();
