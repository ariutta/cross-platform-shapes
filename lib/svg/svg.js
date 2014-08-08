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
      targetElement.appendChild(targetSvg);

      viewport = document.createElementNS(svgNS, 'g');
      viewport.setAttribute('id', 'viewport');
      targetSvg.appendChild(viewport);

      defs = document.createElementNS(svgNS, 'defs');
      defs.setAttribute('id', 'defs');
      viewport.appendChild(defs);
    } else {
      targetSvg = targetElement;

      viewport = targetSvg.querySelector('g#viewport');

      // TODO don't repeat this with the code already in the svg-pan-zoom library
      // If no g container with id 'viewport' exists, create one
      if (!viewport) {
        viewport = document.createElementNS(svgNS, 'g');
        viewport.setAttribute('id', 'viewport');

        // Internet Explorer (all versions?) can't use childNodes, but other browsers prefer (require?) using childNodes
        var svgChildren = targetSvg.childNodes || targetSvg.children;
        do {
          viewport.appendChild(svgChildren[0]);
        } while (svgChildren.length > 0);
        targetSvg.appendChild(viewport);
      }

      defs = targetSvg.querySelector('defs');
      if (!defs) {
        defs = document.createElementNS(svgNS, 'defs');
        defs.setAttribute('id', 'defs');
        viewport.appendChild(defs);
      }
    }

    crossPlatformShapesInstance.targetSvg = targetSvg;
    crossPlatformShapesInstance.targetSvgDefs = defs;
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
