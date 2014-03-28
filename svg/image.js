crossPlatformShapes.svg.image = {
  prepareForRendering: function(shapeName, data){
    var customShapes = this.customShapes;
    var result = {};
    var attributes = [];
    result.elementName = 'image';
    attributes.push({name: 'xlink:xlink:href', value: customShapes[shapeName].href});
    attributes.push({name: 'x', value: data.x || 0});
    attributes.push({name: 'y', value: data.y || 0});
    attributes.push({name: 'width', value: data.width || 0});
    attributes.push({name: 'height', value: data.height || 0});
    var rotation = data.rotation;
    if (!!rotation) {
      attributes.push({name: 'transform', value: 'rotate(' + rotation + ',' + (data.x + data.width/2) + ',' + (data.y + data.height/2) + ')'});
    }
    result.attributes = attributes;
    return result;
  },

  arc: function(data){
    return this.svg.image.prepareForRendering('arc', data);
  },

  brace: function(data){
    return this.svg.image.prepareForRendering('brace', data);
  },

  rectangle: function(data){
    return this.svg.image.prepareForRendering('rectangle', data);
  }

  // TODO figure out how custom shapes will be added.  try to avoid adding manually having to add a call to prepareForRendering() for every shape.

};
