module.exports = {
  getInstance: function(crossPlatformShapesInstance, args){
    var width = args.width || '100%'
      , height = args.height || '100%'
      , backgroundColor = args.backgroundColor || '#ffffff'
      , targetElement = args.targetElement
      , targetTagName = args.targetTagName
      , svgNS = 'http://www.w3.org/2000/svg'
      , xmlNS = 'http://www.w3.org/2000/xmlns/'
      ;

      crossPlatformShapesInstance.svgNS = svgNS;

    var svgInstance = crossPlatformShapesInstance.svg;

    var viewport, defs, targetSvg;
    if (targetTagName !== 'svg') {
      var id = args.id || 'cross-platform-shape-svg';

      var $targetSvg = d3.select(targetElement)
        .append('svg')
        .attr('id', id)
        .attr('version', '1.1')
        .attr('baseProfile', 'full')
        .attr('xmlns', 'http://www.w3.org/1999/xlink')
        .attr('xmlns:xmlns:xlink', 'http://www.w3.org/1999/xlink')
        .attr('xmlns:xmlns:ev', 'http://www.w3.org/2001/xml-events')
        .attr('preserveAspectRatio', 'xMidYMid')
        .attr('width', width)
        .attr('height', height)

      targetSvg = $targetSvg[0][0]

      // svgInstance.path.targetSvg = svgInstance.image.targetSvg = targetSvg;

      defs = $targetSvg.append('defs').attr('id', 'defs')[0][0]

      crossPlatformShapesInstance.targetSvg = targetSvg;
      crossPlatformShapesInstance.targetSvgDefs = defs;

      viewport = $targetSvg.append('g').attr('id', 'viewport')[0][0]
    } else {
      targetSvg = targetElement;

      crossPlatformShapesInstance.targetSvg = targetSvg;
      crossPlatformShapesInstance.targetSvgDefs = targetSvg.querySelector('defs');

      viewport = targetSvg.querySelector('#viewport');
      // TODO look at creating a new g element and putting all content into it here.
      if (!viewport) {
        viewport = targetSvg.querySelector('g');
      }
    }

    crossPlatformShapesInstance.availableMarkers = {};
    crossPlatformShapesInstance.backgroundColor = backgroundColor;
    targetSvg.setAttributeNS(null, 'style', 'background-color:' + backgroundColor + '; ');

    crossPlatformShapesInstance.viewport = viewport;

    return svgInstance;
  },
  path: require('./path'),
  image: require('./image'),
  marker: require('./marker')
};
