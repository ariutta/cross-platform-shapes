module.exports = {
  render: function(shapeName, data){
    var customShapes = this.customShapes;
    var shapeSelection = this.targetImageSelection.select(data.containerSelector).append('image')
    .attr('xlink:xlink:href', customShapes[shapeName].href)
    .attr('x', data.x || 0)
    .attr('y', data.y || 0)
    .attr('preserveAspectRatio', 'none')
    .attr('width', data.width || 0)
    .attr('height', data.height || 0);

    var rotation = data.rotation;
    if (!!rotation) {
      shapeSelection.attr('transform', 'rotate(' + rotation + ',' + (data.x + data.width/2) + ',' + (data.y + data.height/2) + ')');
    }
    return shapeSelection;
  }
};
