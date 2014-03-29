crossPlatformShapes.svg.path = {
  generateMarkerId: function(name, position, color){
    // only keep the alphanumeric characters and dashes. convert to lower case. start with 'id-' just to ensure the first character is a letter.
    var id = ('id-' + name + '-' + position + '-' + color).replace(/[^A-Za-z0-9-]/g, '').toLowerCase();

    return id;
  },

  prepareForRendering: function(shapeName, data) {
    var svgPathGenerator = this;

    // from http://bl.ocks.org/mbostock/4281513
    function pointLineSegmentParameter(p2, p0, p1) {
      var x10 = p1[0] - p0[0], y10 = p1[1] - p0[1],
          x20 = p2[0] - p0[0], y20 = p2[1] - p0[1];
      return (x20 * x10 + y20 * y10) / (x10 * x10 + y10 * y10);
    }

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

    // TODO rewrite the path calculation code to not use the d3 path generators
    var shapesUsingD3PathGenerators = [
      'lineCurved',
      'lineElbow',
      'lineSegmented'
    ];
    var d = '';
    if (shapesUsingD3PathGenerators.indexOf(shapeName) === -1) {
      var pathSegments = crossPlatformShapes.pathCalculator[shapeName](data);
      // the path segments are defined using the Canvas path command terms. The path commands used are only those
      // that are common to both Canvas and SVG
      pathSegments.forEach(function(pathSegment) {
        d += canvasPathCommandToSvgPathCommandMappings[pathSegment.command];
        d += pathSegment.points.join(',');
      });
    }
    else {
      d = crossPlatformShapes.pathCalculator[ shapeName ](data);
    }
    attributes.push({name: 'd', value: d});

    var id = data.id;
    if (!!id) {
      attributes.push({name: 'id', value: id});
    }

    var backgroundColor = data.backgroundColor || 'transparent';
    attributes.push({name: 'fill', value: backgroundColor});

    var markerStart = data.markerStart;
    var markerEnd = data.markerEnd;
    var color = data.color;
    if (!markerStart && !markerEnd) {
      attributes.push({name: 'stroke', value: color});
    }
    if (!!markerStart || !!markerEnd) {
      markerStart = markerStart || 'lineStraight';
      markerEnd = markerEnd || 'lineStraight';
      svgPathGenerator.appendMarker(markerStart, 'start', color, function(markerId) {
        attributes.push({name: 'marker-start', value: 'url(#' + markerId + ')'});
      });
      svgPathGenerator.appendMarker(markerEnd, 'end', color, function(markerId) {
        attributes.push({name: 'marker-end', value: 'url(#' + markerId + ')'});
      });

      var svgSelection = d3.select(svgPathGenerator.targetImage);
      var linearGradient = svgSelection.select('defs').append('linearGradient')
      .attr('id', 'gradient-for-' + data.id);

      var firstPoint = data.points[0];
      var lastPoint = data.points[data.points.length - 1];
      var xDistance = lastPoint.x - firstPoint.x;
      var yDistance = lastPoint.y - firstPoint.y;
      var distanceFromFirstPointToLastPoint = Math.pow(Math.pow((xDistance),2) + Math.pow((yDistance),2), 1/2);

      if (data.points.length === 2) {
        linearGradient.attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '100%');
      }
      else {
        // isMonotonic is looking at monotonicity in the coordinate system defined by the vector from first point to last point
        var isMonotonic,
          maxX = -Infinity,
          maxY = -Infinity,
          minX = Infinity,
          minY = Infinity,
          percentDistanceX,
          percentDistanceY,
          percentDistanceXWasGreaterThanPercentDistanceY,
          percentDistanceXIsGreaterThanPercentDistanceY,
          deviation,
          maxDeviation = 0,
          maxDeviationXPoint,
          maxDeviationYPoint;
        data.points.forEach(function(point) {
          maxX = Math.max(maxX, point.x);
          minX = Math.min(minX, point.x);
          maxY = Math.max(maxY, point.y);
          minY = Math.min(minY, point.y);
          percentDistanceX = (point.x - firstPoint.x) / xDistance;
          percentDistanceY = (point.y - firstPoint.y) / yDistance;
          deviation = percentDistanceY - percentDistanceX;
          if (Math.abs(deviation) > maxDeviation) {
            maxDeviation = deviation;
            maxDeviationXPoint = point.x;
            maxDeviationYPoint = point.y;
          }
          percentDistanceXIsGreaterThanPercentDistanceY = (percentDistanceX > (point.y - firstPoint.y) / yDistance);
          if (!!percentDistanceXWasGreaterThanPercentDistanceY && !isMonotonic) {
            isMonotonic = (percentDistanceXIsGreaterThanPercentDistanceY === percentDistanceXWasGreaterThanPercentDistanceY);
          }
          percentDistanceXWasGreaterThanPercentDistanceY = percentDistanceXIsGreaterThanPercentDistanceY;
        });
        var bBoxWidth = maxX - minX;
        var bBoxHeight = maxY - minY;
        if (isMonotonic) {


          var p0 = [firstPoint.x, firstPoint.y];
          var p1 = [lastPoint.x, lastPoint.y];
          var p2 = [maxDeviationXPoint, maxDeviationYPoint];
          var t = pointLineSegmentParameter(p2, p0, p1),
              x10 = p1[0] - p0[0],
              y10 = p1[1] - p0[1],
              p3 = [p0[0] + t * x10, p0[1] + t * y10];




          linearGradient.attr('x1', (((p3[0] - minX) / bBoxWidth) * 100) + '%')
          .attr('y1', (((p3[1] - minY) / bBoxHeight) * 100) + '%')
          .attr('x2', ((1 - ((maxX - maxDeviationXPoint) / bBoxWidth)) * 100) + '%')
          .attr('y2', ((1 - ((maxY - maxDeviationYPoint) / bBoxHeight)) * 100) + '%');
        }
        else {
          linearGradient.attr('x1', (((firstPoint.x - minX) / bBoxWidth) * 100) + '%')
          .attr('y1', (((firstPoint.y - minY) / bBoxHeight) * 100) + '%')
          .attr('x2', ((1 - ((maxX - lastPoint.x) / bBoxWidth)) * 100) + '%')
          .attr('y2', ((1 - ((maxY - lastPoint.y) / bBoxHeight)) * 100) + '%');
        }
      }

      /*
      var thisPoint, nextPoint,
        pathLength = 0,
        points = data.points;
      for (var i = 0; i < points.length - 1; i++) {
        thisPoint = points[i];
        nextPoint = points[i + 1];
        pathLength += Math.pow(Math.pow((nextPoint.x - thisPoint.x),2) + Math.pow((nextPoint.y - thisPoint.y),2), 1/2);
      }
      //*/

      var offsetUnderMarker = ((distanceFromFirstPointToLastPoint - 8)/distanceFromFirstPointToLastPoint) * 100;


      linearGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-opacity', 0);

      linearGradient.append('stop')
      .attr('offset', (100 - offsetUnderMarker) + '%')
      .attr('stop-opacity', 0);

      linearGradient.append('stop')
      .attr('offset', (100 - offsetUnderMarker) + '%')
      .attr('stop-opacity', 1);

      linearGradient.append('stop')
      .attr('offset', (100 - offsetUnderMarker) + '%')
      .attr('stop-color', color);

      linearGradient.append('stop')
      .attr('offset', offsetUnderMarker + '%')
      .attr('stop-color', color);

      linearGradient.append('stop')
      .attr('offset', offsetUnderMarker + '%')
      .attr('stop-opacity', 0);

      attributes.push({name: 'stroke', value: 'url(#' + 'gradient-for-' + data.id + ')'});
    }

    /*
            <linearGradient id="MyGradient">
              <stop offset="0%" stop-color="red"></stop>
              <stop offset="95%" stop-color="red"></stop>
              <stop offset="95%" stop-opacity="1"></stop>
              <stop offset="95%" stop-opacity="0"></stop>
            </linearGradient>    
            //*/

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
      },
      lineStraight: {
        markerElement: {
          viewBox:'0 0 12 12',
          markerWidth:12,
          markerHeight:12
        },
        shapeElement: {
          points:[
            {x:0,
            y:6},
            {x:12,
            y:6}
          ],
          color:color,
          backgroundColor:color
        }
      },
      tBar: {
        markerElement: {
          viewBox:'0 0 10 20',
          markerWidth:10,
          markerHeight:20
        },
        shapeElement: {
          x:1,
          y:0,
          width:8,
          height:20,
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

      // Default is end, because most markers will be at the end, so we can avoid having an unneeded rotation performed more often
      if (position === 'start') {
        shape.attr('transform', 'rotate(180, ' + markerData[name].markerElement.markerWidth / 2 + ',' + markerData[name].markerElement.markerHeight / 2 + ')');
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

/*
<marker id="src-shape-library-markers-t-bar-svg-end-default" preserveAspectRatio="none" viewBox="0 0 10 20" markerWidth="10" markerHeight="20" markerUnits="strokeWidth" orient="auto" refX="10" refY="10"><g id="g-src-shape-library-markers-t-bar-svg-end-default" class="board-fill-color default-stroke-color solid-stroke" transform="rotate(180, 5, 10)">

        <!-- t-bar markers: vertical line; and extended drawing-board rect -->
	
	<rect stroke="none" x="0" y="9" width="8" height="2"></rect>
	<line fill="none" stroke-width="1.8" x1="7" y1="0" x2="7" y2="20"></line>

</g></marker>
//*/
