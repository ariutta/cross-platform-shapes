crossPlatformShapes.svg.path = {
  generateMarkerId: function(name, position, color){
    // only keep the alphanumeric characters and dashes. convert to lower case. start with 'id-' just to ensure the first character is a letter.
    var id = ('id-' + name + '-' + position + '-' + color).replace(/[^A-Za-z0-9-]/g, '').toLowerCase();

    return id;
  },

  prepareForRendering: function(shapeName, data){
    var svgPathGenerator = this;
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
    // that are common to both Canvas and SVG
    pathSegments.forEach(function(pathSegment) {
      d += canvasPathCommandToSvgPathCommandMappings[pathSegment.command];
      d += pathSegment.points.join(',');
    });
    attributes.push({name: 'd', value: d});

    var color = data.color;
    attributes.push({name: 'stroke', value: color});

    var markerStart = data.markerStart, markerStartId;
    if (!!markerStart) {
      markerStartId = svgPathGenerator.generateMarkerId(markerStart, 'start', color);
      svgPathGenerator.appstartMarker(markerStartId, function() {
        attributes.push({name: 'marker-start', value: 'url(#' + markerStartId + ')'});
      });
    }

    var markerEnd = data.markerEnd, markerEndId;
    if (!!markerEnd) {
      markerEndId = svgPathGenerator.generateMarkerId(markerEnd, 'end', color);
      svgPathGenerator.appendMarker(markerEndId, function() {
        attributes.push({name: 'marker-end', value: 'url(#' + markerEndId + ')'});
      });
    }

    var rotation = data.rotation;
    if (!!rotation) {
      attributes.push({name: 'transform', value: 'rotate(' + rotation + ')'});
    }
    result.attributes = attributes;
    return result;
  },

  appendMarker: function(markerId, callback) {
    var svgPathGenerator = this;
    var svgSelection = d3.select(svgPathGenerator.targetImage);
    var markerSelection = svgSelection.select('defs').select('#' + markerId);

    if (!markerSelection[0][0]) {
      markerSelection = svgSelection.select('defs').append('marker')
      .attr('id', markerId)
      .attr('preserveAspectRatio', 'none');
      callback(null);
    }
    else {
      callback(null);
    }
  }
};
