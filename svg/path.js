crossPlatformShapes.svg.path = {
  generateMarkerId: function(name, position, color){
    // only keep the alphanumeric characters and dashes. convert to lower case. start with 'id-' just to ensure the first character is a letter.
    var id = ('id-' + name + '-' + position + '-' + color).replace(/[^A-Za-z0-9-]/g, '').toLowerCase();

    return id;
  },

  prepareForRendering: function(shapeName, data) {
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
    result.elementName = 'path';

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

    var backgroundColor = data.backgroundColor;
    if (!!backgroundColor) {
      attributes.push({name: 'fill', value: backgroundColor});
    }

    var markerStart = data.markerStart;
    if (!!markerStart) {
      svgPathGenerator.appendMarker(markerStart, 'start', color, function(markerId) {
        attributes.push({name: 'marker-start', value: 'url(#' + markerId + ')'});
      });
    }
    var markerEnd = data.markerEnd;
    if (!!markerEnd) {
      svgPathGenerator.appendMarker(markerEnd, 'end', color, function(markerId) {
        attributes.push({name: 'marker-end', value: 'url(#' + markerId + ')'});
      });
    }

    var rotation = data.rotation;
    if (!!rotation) {
      attributes.push({name: 'transform', value: 'rotate(' + rotation + ',' + (data.x + data.width/2) + ',' + (data.y + data.height/2) + ')'});
    }
    result.attributes = attributes;
    self.myResult = result;
    return result;
  },

  appendMarker: function(name, position, color, callback) {
    var markerData = {
      arrow: {
        markerElement: {
          viewBox:'0 0 12 12',
          markerWidth:12,
          markerHeight:12
        },
        shapeElement: {
          x:0,
          y:0,
          width:12,
          height:12,
          color:color,
          backgroundColor:color
        }
      }
    };
    var svgPathGenerator = this;
    var svgSelection = d3.select(svgPathGenerator.targetImage);

    var markerId = svgPathGenerator.generateMarkerId(name, position, color);
    var markerSelection = svgSelection.select('defs').select('#' + markerId);

    if (!markerSelection[0][0]) {
      var markerShapeAttributes = svgPathGenerator.prepareForRendering(name, markerData[name].shapeElement);
      markerSelection = svgSelection.select('defs').append('marker')
      .attr('id', markerId)
      .attr('markerUnits', 'strokeWidth')
      .attr('orient', 'auto')
      .attr('viewBox', markerData[name].markerElement.viewBox)
      .attr('markerWidth', markerData[name].markerElement.markerWidth)
      .attr('markerHeight', markerData[name].markerElement.markerHeight)
      .attr('refX', function() {
        if (position === 'end') {
          return markerData[name].markerElement.markerWidth;
        }
        else {
          return 0;
        }
      })
      .attr('refY', markerData[name].markerElement.markerHeight / 2)
      .attr('preserveAspectRatio', 'none');

      var shape = markerSelection.append('path');
      if (position === 'end') {
        shape.attr('transform', 'rotate(180, ' + markerData[name].markerElement.markerWidth / 2 + ',' + markerData[name].markerElement.markerHeight / 2 + ')');
      }
      else {
      }
      markerShapeAttributes.attributes.forEach(function(attribute) {
        shape.attr(attribute.name, attribute.value);
      });

      callback(markerId);
    }
    else {
      callback(markerId);
    }
  }
};
