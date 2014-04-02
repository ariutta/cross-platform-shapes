crossPlatformShapes.svg.image = {
  render: function(shapeName, data){
    var customShapes = this.customShapes;
    var result = {};
    var attributes = [];
    var shapeSelection = targetImageSelection.select(data.containerSelector).append('image');
    result.elementName = 'image';

    attributes.push({name: 'xlink:xlink:href', value: customShapes[shapeName].href});
    shapeSelection.attr('xlink:xlink:href', customShapes[shapeName].href);

    attributes.push({name: 'x', value: data.x || 0});
    shapeSelection.attr('x', data.x || 0);

    attributes.push({name: 'y', value: data.y || 0});
    shapeSelection.attr('y', data.y || 0);

    attributes.push({name: 'width', value: data.width || 0});
    shapeSelection.attr('width', data.width || 0);

    attributes.push({name: 'height', value: data.height || 0});
    shapeSelection.attr('height', data.height || 0);

    var rotation = data.rotation;
    if (!!rotation) {
      attributes.push({name: 'transform', value: 'rotate(' + rotation + ',' + (data.x + data.width/2) + ',' + (data.y + data.height/2) + ')'});
      shapeSelection.attr('transform', 'rotate(' + rotation + ',' + (data.x + data.width/2) + ',' + (data.y + data.height/2) + ')');
    }
    result.attributes = attributes;
    return result;
  },
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
  }
};
