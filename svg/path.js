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
//http://stackoverflow.com/questions/9043805/test-if-two-lines-intersect-javascript-function
function CCW(p1, p2, p3) {
  a = p1[0]; b = p1[1]; 
  c = p2[0]; d = p2[1];
  e = p3[0]; f = p3[1];
  return (f - b) * (c - a) > (d - b) * (e - a);
}

function isIntersect(p1, p2, p3, p4) {
  return (CCW(p1, p3, p4) != CCW(p2, p3, p4)) && (CCW(p1, p2, p3) != CCW(p1, p2, p4));
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
      console.log('shapeName');
      console.log(shapeName);
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
      var gradientVectorLength,
        gradientVectorStart = {},
        gradientVectorEnd = {},
        offsetUnderMarker;

      if (data.points.length === 2) {
        gradientVectorLength = Math.pow(Math.pow((xDistance),2) + Math.pow((yDistance),2), 1/2);          
        linearGradient.attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '100%');

        offsetUnderMarker = ((gradientVectorLength - 8)/gradientVectorLength) * 100;
        console.log('gradientVectorLength');
        console.log(gradientVectorLength);

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
      }
      else {
        // isMonotonic is looking at monotonicity in the coordinate system defined by the vector from first point to last point
        var isMonotonic,
          maxX = -Infinity,
          maxY = -Infinity,
          minX = Infinity,
          minY = Infinity,
          maxDeviationXPoint,
          maxDeviationYPoint,
          previousPoint;
        gradientVectorLength = 0;


        if (data.points.length === 3) {
          isMonotonic = true;
        }

        var p0 = [firstPoint.x, firstPoint.y],
          p1 = [lastPoint.x, lastPoint.y];
          var x10 = p1[0] - p0[0];
          var y10 = p1[1] - p0[1];
          var p3;
        data.points.forEach(function(point) {
          var p2 = [point.x, point.y];
          var t = pointLineSegmentParameter(p2, p0, p1);
            p3 = [p0[0] + t * x10, p0[1] + t * y10];
          currentGradientVectorLength = Math.pow(Math.pow((p3[0] - point.x),2) + Math.pow((p3[1] - point.y),2), 1/2);          
          console.log('gradientVectorLength');
          console.log(gradientVectorLength);
          maxX = Math.max(maxX, point.x);
          minX = Math.min(minX, point.x);
          maxY = Math.max(maxY, point.y);
          minY = Math.min(minY, point.y);

          svgSelection.append('path')
          .attr('stroke', 'yellow')
          .attr('stroke-width', 1)
          .attr('d', 'M' + p3[0] + ',' + p3[1] + 'L' + point.x + ',' +  point.y);

          if (currentGradientVectorLength > gradientVectorLength) {
            console.log('currentGradientVectorLength > gradientVectorLength');
            console.log(currentGradientVectorLength > gradientVectorLength);
            gradientVectorLength = currentGradientVectorLength;
            gradientVectorStart.x = p3[0];
            gradientVectorStart.y = p3[1];
            maxDeviationXPoint = point.x;
            maxDeviationYPoint = point.y;
          }
          if (!!previousPoint && !isMonotonic) {
            isMonotonic = isIntersect([firstPoint.x, firstPoint.y], [lastPoint.x, lastPoint.y], [point.x, point.y], [previousPoint.x, previousPoint.y]);
            console.log('isMonotonic');
            console.log(isMonotonic);
          }
          previousPoint = point;
        });
        var bBoxWidth = maxX - minX;
        var bBoxHeight = maxY - minY;
        console.log('isMonotonic: ' + isMonotonic);
        if (isMonotonic) {
          gradientVectorLength = gradientVectorLength * 0.667;
          linearGradient.attr('x1', (((gradientVectorStart.x - minX) / bBoxWidth) * 100) + '%')
          .attr('y1', (((gradientVectorStart.y - minY) / bBoxHeight) * 100) + '%')
          .attr('x2', (((maxDeviationXPoint - minX) / bBoxWidth) * 100) + '%')
          .attr('y2', (((maxDeviationYPoint - minY) / bBoxHeight) * 100) + '%');

          svgSelection.append('path')
          .attr('stroke', 'pink')
          .attr('stroke-width', 1)
          .attr('stroke-dasharray', '5,5')
          .attr('d', 'M' + gradientVectorStart.x + ',' + gradientVectorStart.y + 'L' + maxDeviationXPoint + ',' + maxDeviationYPoint);

          //*
          svgSelection.append('path')
          .attr('stroke', 'blue')
          .attr('stroke-width', 1)
          .attr('stroke-dasharray', '5,5')
          .attr('d', 'M' + firstPoint.x + ',' + firstPoint.y + 'L' + lastPoint.x + ',' + lastPoint.y);
          //*/
        }
        else {
          gradientVectorLength = Math.pow(Math.pow((xDistance),2) + Math.pow((yDistance),2), 1/2);          

          linearGradient.attr('x1', (((firstPoint.x - minX) / bBoxWidth) * 100) + '%')
          .attr('y1', (((firstPoint.y - minY) / bBoxHeight) * 100) + '%')
          .attr('x2', ((1 - ((maxX - lastPoint.x) / bBoxWidth)) * 100) + '%')
          .attr('y2', ((1 - ((maxY - lastPoint.y) / bBoxHeight)) * 100) + '%');
        }

        offsetUnderMarker = ((gradientVectorLength - 2 * 8)/gradientVectorLength) * 100;
        console.log('gradientVectorLength');
        console.log(gradientVectorLength);

        linearGradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-opacity', 0);

        linearGradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', color);

        linearGradient.append('stop')
        .attr('offset', '5%')
        .attr('stop-opacity', 0.3);

        linearGradient.append('stop')
        .attr('offset', (100 - offsetUnderMarker) + '%')
        .attr('stop-opacity', 0.3);

        linearGradient.append('stop')
        .attr('offset', (100 - offsetUnderMarker) + '%')
        .attr('stop-opacity', 1);

        linearGradient.append('stop')
        .attr('offset', (100 - offsetUnderMarker) + '%')
        .attr('stop-color', color);
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

/*
  var myEdgeRenderingData = crossPlatformShapesInstance1.lineCurved({
    id:'my-edge',
    points:[{x:100,y:75},{x:1,y:190},{x:60,y:310},{x:100,y:325}],
    color:'green',
    markerEnd:'tBar'});
  var myEdge = d3.select('svg').select('#viewport').append(myEdgeRenderingData.elementName)
  myEdgeRenderingData.attributes.forEach(function(attribute) {
    myEdge.attr(attribute.name, attribute.value);
  });

  var myNodeRenderingData = crossPlatformShapesInstance1.complex({
    id:'my-node',
    x:100,
    y:300,
    width:80,
    height:50,
    color:'brown',
    backgroundColor:'white'});
  var myNode = d3.select('svg').select('#viewport').append(myNodeRenderingData.elementName)
  myNodeRenderingData.attributes.forEach(function(attribute) {
    myNode.attr(attribute.name, attribute.value);
  });
d3.select('#my-edge').attr('fill', 'url(#gradient-for-my-edge)')
d3.select('#edge2').attr('fill', 'url(#gradient-for-edge2)')
//*/
