module.exports = {
  getInstance: function(crossPlatformShapesInstance, args){
    var width = args.width || '100%'
      , height = args.height || '100%'
      , backgroundColor = args.backgroundColor || '#ffffff'
      , targetElement = args.targetElement
      , targetTagName = args.targetTagName
      , xmlNS = 'http://www.w3.org/XML/1998/namespace'
      , svgNS = 'http://www.w3.org/2000/svg'
      , xmlnsNS = 'http://www.w3.org/2000/xmlns/'
      , xlinkNS = 'http://www.w3.org/1999/xlink'
      , evNS = 'http://www.w3.org/2001/xml-events'
      ;

      crossPlatformShapesInstance.svgNS = svgNS;

    var svgInstance = crossPlatformShapesInstance.svg;

    var viewport, defs, targetSvg;
    if (targetTagName !== 'svg') {
      // var id = args.id || 'cross-platform-shape-svg';
      // TODO look at using this for creating the id:
      var id = args.id || 'svg-' + new Date().toISOString().replace(/\D/g, '');

      targetSvg = document.createElementNS(svgNS, 'svg');
      targetSvg.setAttribute('xmlns', svgNS);
      targetSvg.setAttributeNS(xmlnsNS, 'xmlns:xlink', xlinkNS);
      targetSvg.setAttributeNS(xmlnsNS, 'xmlns:ev', evNS);
      targetSvg.setAttribute('id', id);
      targetSvg.setAttribute('version', '1.1');
      targetSvg.setAttribute('baseProfile', 'full');
      targetSvg.setAttribute('preserveAspectRatio', 'xMidYMid');
      targetSvg.setAttribute('width', width);
      targetSvg.setAttribute('height', height);

      defs = document.createElementNS(svgNS, 'defs');
      defs.setAttribute('id', 'defs');
      targetSvg.appendChild(defs);

      crossPlatformShapesInstance.targetSvg = targetSvg;
      crossPlatformShapesInstance.targetSvgDefs = defs;

      viewport = document.createElementNS(svgNS, 'g');
      viewport.setAttribute('id', 'viewport');
      targetSvg.appendChild(viewport);

      targetElement.appendChild(targetSvg);
    } else {
      targetSvg = targetElement;

      crossPlatformShapesInstance.targetSvg = targetSvg;
      crossPlatformShapesInstance.targetSvgDefs = targetSvg.querySelector('defs');

      viewport = targetSvg.querySelector('#viewport');

      // TODO look at creating a new g element and putting all content into it here.
      // instead of just selecting first available g element, as we are currently doing.
      if (!viewport) {
        viewport = targetSvg.querySelector('g');
      }
    }

    crossPlatformShapesInstance.availableMarkers = {};
    crossPlatformShapesInstance.backgroundColor = backgroundColor;
    targetSvg.setAttribute('style', 'background-color:' + backgroundColor + '; ');

    crossPlatformShapesInstance.viewport = viewport;

    return svgInstance;
  },
  path: require('./path'),
  image: require('./image'),
  marker: require('./marker')
};
