module.exports = {
  generateId: function(name, position, color){
    // only keep the alphanumeric characters and dashes. convert to lower case. start with 'id-' just to ensure the first character is a letter.
    var id = ('id-' + name + '-' + position + '-' + color).replace(/[^A-Za-z0-9-]/g, '').toLowerCase();

    return id;
  },
  append: function(crossPlatformShapesInstance, name, position, color, callback) {
    var availableMarkers = crossPlatformShapesInstance.availableMarkers;
    var targetSvgDefs = crossPlatformShapesInstance.targetSvgDefs;
    var backgroundColor = crossPlatformShapesInstance.backgroundColor;

    // TODO: look at whether it makes sense to have some of the marker description code here and some in presetShapes
    // NOTE: if you add a new marker, make sure to add the data here and in presetShapes
    var markerData = {
      arrow: {
        shapes: [
          {
            elementTag: 'rect',
            x:0,
            y:5.4,
            width:2,
            height:1.2,
            stroke:backgroundColor,
            fill:backgroundColor
          },
          {
            elementTag: 'polygon',
            points:'12,11 0,6 12,1',
            'stroke-width':0,
            fill:color
          }
        ]
      },
      mimBinding: {
        shapes: [
          {
            elementTag: 'rect',
            x:0,
            y:5.4,
            width:2,
            height:1.2,
            stroke:backgroundColor,
            fill:backgroundColor
          },
          {
            elementTag: 'polygon',
            points:'12,12 0,6 12,0 5,6',
            'stroke-width':0,
            fill:color
          }
        ]
      },
      mimNecessaryStimulation: {
        shapes: [
          {
            elementTag: 'rect',
            x:0,
            y:5.4,
            width:2,
            height:1.2,
            stroke:'none',
            fill:backgroundColor
          },
          {
            elementTag: 'line',
            x1:14,
            y1:0,
            x2:14,
            y2:12,
            stroke:color,
            'stroke-width':1,
            fill:'none'
          },
          {
            elementTag: 'line',
            x1:16,
            y1:6,
            x2:16,
            y2:6,
            stroke:'none',
            fill:'none'
          },
          {
            elementTag: 'polygon',
            points:'0,6 9,11 9,1',
            'stroke-width':1,
            stroke:color,
            fill:backgroundColor
          }
        ]
      },
      mimStimulation: {
        shapes: [
          {
            elementTag: 'rect',
            x:0,
            y:5.4,
            width:2,
            height:1.2,
            stroke:'none',
            fill:backgroundColor
          },
          {
            elementTag: 'line',
            x1:12,
            y1:6,
            x2:12,
            y2:6,
            stroke:'none',
            fill:'none'
          },
          {
            elementTag: 'polygon',
            points:'0,6 11,11 11,1',
            'stroke-width':1,
            stroke:color,
            fill:backgroundColor
          }
        ]
      },
      mimModification: {
        shapes: [
          {
            elementTag: 'rect',
            x:0,
            y:5.4,
            width:2,
            height:1.2,
            stroke:backgroundColor,
            fill:backgroundColor
          },
          {
            elementTag: 'polygon',
            points:'12,12 0,6 12,0 5,6',
            'stroke-width':0,
            fill:color
          }
        ]
      },
      mimCatalysis: {
        shapes: [
          {
            elementTag: 'circle',
            cx:6,
            cy:6,
            r:'5.3px',
            stroke:color,
            'stroke-width':1,
            fill:backgroundColor
          }
        ]
      },
      mimCleavage: {
        shapes: [
          {
            elementTag: 'rect',
            x:0,
            y:14.3,
            width:18.4,
            height:1.4,
            stroke:backgroundColor,
            fill:backgroundColor
          },
          {
            elementTag: 'line',
            stroke:color,
            'stroke-width':1,
            x1:18,
            y1:14.5,
            x2:18,
            y2:30
          },
          {
            elementTag: 'line',
            stroke:color,
            'stroke-width':1,
            x1:18,
            y1:30,
            x2:0,
            y2:0
          }

        ]
      },
      mimCovalentBond: {
        shapes: [
          {
            elementTag: 'rect',
            x:0,
            y:0,
            width:0,
            height:0,
            stroke:backgroundColor,
            'stroke-width':0,
            fill:backgroundColor
          }
        ]
      },
      mimTranscriptionTranslation: {
        shapes: [
          {
            elementTag: 'rect',
            x:0,
            y:11,
            width:12,
            height:2,
            stroke:backgroundColor,
            fill:backgroundColor
          },
          {
            elementTag: 'line',
            stroke:color,
            fill:'none',
            'stroke-width':1,
            x1:15,
            y1:12,
            x2:15,
            y2:5
          },
          {
            elementTag: 'line',
            stroke:color,
            fill:'none',
            'stroke-width':1,
            x1:15.5,
            y1:5,
            x2:8,
            y2:5
          },
          {
            elementTag: 'polygon',
            points:'0,5 8,1 8,9',
            'stroke-width':1,
            stroke:color,
            fill:backgroundColor
          }
        ]
      },
      mimGap: {
        shapes: [
          {
            elementTag: 'rect',
            x:0,
            y:5.3,
            width:8,
            height:1.4,
            stroke:'none',
            fill:backgroundColor
          }
        ]
      },
      mimBranchingLeft: { // TODO: this is just a copy of arrow. it needs to be updated.
        shapes: [
          {
            elementTag: 'rect',
            x:0.4,
            y:5.3,
            width:3.1,
            height:1.4,
            fill:backgroundColor,
            stroke:'none'
          },
          {
            elementTag: 'line',
            fill:'none',
            stroke:color,
            'stroke-width':1,
            x1:3.9,
            y1:6.2,
            x2:0.2,
            y2:0
          }
        ]
      },
      mimBranchingRight: { // TODO: this is just a copy of arrow. it needs to be updated.
        shapes: [
          {
            elementTag: 'rect',
            x:0.4,
            y:5.3,
            width:3.1,
            height:1.4,
            fill:backgroundColor,
            stroke:'none'
          },
          {
            elementTag: 'line',
            fill:'none',
            stroke:color,
            'stroke-width':1,
            x1:0.2,
            y1:12,
            x2:3.9,
            y2:5.8
          }
        ]
      },
      tBar: {
        shapes: [
          {
            elementTag: 'rect',
            x:0,
            y:9,
            width:8,
            height:2,
            fill:backgroundColor
          },
          {
            elementTag: 'line',
            x:0,
            y:0,
            width:12,
            height:12,
            stroke:color,
            'stroke-width':1.8,
            x1:7,
            y1:0,
            x2:7,
            y2:20
          }
        ]
      }
    };

    markerData.mimInhibition = markerData.tBar;
    markerData.mimConversion = markerData.arrow;


    if (!!markerData[name]) {
      markerData[name].markerElement = crossPlatformShapesInstance.presetShapes[name].getDimensions();

      var markerId = crossPlatformShapesInstance.svg.marker.generateId(name, position, color);
      var markerAttributeValue = 'url(#' + markerId + ')';
      if (availableMarkers[markerId]) {
        return callback(markerAttributeValue);
      } else {
        var marker = d3.select(targetSvgDefs).append('marker')
        .attr('id', markerId)
        .attr('orient', 'auto')
        // TODO look at whether this works with IE. Apparently it is the default, so it might be better not to add this attribute.
        .attr('markerUnits', 'strokeWidth')
        .attr('preserveAspectRatio', 'none')
        .attr('refY', markerData[name].markerElement.markerHeight/2)
        .attr('viewBox', '0 0 ' + markerData[name].markerElement.markerWidth + ' ' + markerData[name].markerElement.markerHeight);

        d3.map(markerData[name].markerElement).entries().forEach(function(attribute) {
          marker.attr(attribute.key, attribute.value);
        });
        if (position === 'end') {
          marker.attr('refX', markerData[name].markerElement.markerWidth);
        }
        else {
          marker.attr('refX', 0);
        }

        var markerContainer = marker.append('g')
        .attr('id', 'g-' + markerId);

        if (position === 'end') {
          markerContainer.attr('transform', 'rotate(180, ' + markerData[name].markerElement.markerWidth/2 + ', ' + markerData[name].markerElement.markerHeight/2 + ')');
        }

        markerData[name].shapes.forEach(function(shape) {
          var shapeSelection = markerContainer.append(shape.elementTag);
          d3.map(shape).entries().forEach(function(attribute) {
            if (attribute.key !== 'elementTag') {
              shapeSelection.attr(attribute.key, attribute.value);
            }
          });
        });
        availableMarkers[markerId] = true;
        return callback(markerAttributeValue);
      }
    } else {
      console.warn('Marker (arrowhead) named "' + name + '" is not available.');
      return callback('none');
    }
  }
};
