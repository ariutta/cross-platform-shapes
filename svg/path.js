crossPlatformShapes.svg.path = function(){
  var render = function(shapeName, data){
    var canvasPathCommandToSvgPathCommandMappings = {
      moveTo: 'M',
      lineTo: 'L',
      closePath: 'Z',
      bezierCurveTo: 'C',
      quadraticCurveTo: 'Q'
    };

    var result = {};
    var attributes = [];
    result.elementName = 'svg';
    var pathSegments = crossPlatformShapes.pathCalculator[ shapeName ](data);
    var d = '';
    // the path segments are defined using the Canvas path command terms. The path commands used are only those
    // that are shared by both Canvas and SVG
    pathSegments.forEach(function(pathSegment) {
      d += canvasPathCommandToSvgPathCommandMappings[pathSegment.command];
      d += pathSegment.points.join(',');
    });
    attributes.push({name: 'd', value: d});
    var rotation = data.rotation;
    if (!!rotation) {
      attributes.push({name: 'transform', value: 'rotate(' + rotation + ')'});
    }
    result.attributes = attributes;
    return result;
  };

  return {
    render:render
  };
}();
