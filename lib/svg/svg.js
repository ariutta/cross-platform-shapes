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
      targetSvg = document.createElementNS(svgNS, 'svg');
      targetElement.appendChild(targetSvg);
      targetSvg.setAttributeNS(svgNS, 'id', id);
      targetSvg.setAttributeNS(svgNS, 'version', '1.1');
      targetSvg.setAttributeNS(svgNS, 'baseProfile', 'full');
      targetSvg.setAttributeNS(xmlNS, 'xmlns', 'http://www.w3.org/1999/xlink');
      targetSvg.setAttributeNS(xmlNS, 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
      targetSvg.setAttributeNS(xmlNS, 'xmlns:ev', 'http://www.w3.org/2001/xml-events');
      // targetSvg.setAttributeNS(svgNS, 'xlink', 'http://www.w3.org/1999/xlink');
      // targetSvg.setAttributeNS(svgNS, 'ev', 'http://www.w3.org/2001/xml-events');
      targetSvg.setAttributeNS(svgNS, 'preserveAspectRatio', 'xMidYMid');
      targetSvg.setAttributeNS(svgNS, 'width', width);
      targetSvg.setAttributeNS(svgNS, 'height', height);

      svgInstance.path.targetSvg = svgInstance.image.targetSvg = targetSvg;

      defs = document.createElementNS(svgNS, 'defs');
      defs.setAttributeNS(svgNS, 'id', 'defs');
      targetSvg.appendChild(defs);

      crossPlatformShapesInstance.targetSvg = targetSvg;
      crossPlatformShapesInstance.targetSvgDefs = defs;

      viewport = document.createElementNS(svgNS, 'g');
      viewport.setAttributeNS(svgNS, 'id', 'viewport');
      targetSvg.appendChild(viewport);
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
    targetSvg.setAttributeNS(svgNS, 'style', 'background-color:' + backgroundColor + '; ');

    crossPlatformShapesInstance.viewport = viewport;

    return svgInstance;
  },
  path: require('./path'),
  image: require('./image'),
  marker: require('./marker')
};
