module.exports = {
  xmlNS: 'http://www.w3.org/XML/1998/namespace',
  svgNS: 'http://www.w3.org/2000/svg',
  xmlnsNS: 'http://www.w3.org/2000/xmlns/',
  xlinkNS: 'http://www.w3.org/1999/xlink',
  evNS: 'http://www.w3.org/2001/xml-events',
  createOrGetSvg: function(crossPlatformShapesInstance, args) {
    var width = args.width || '100%'
      , height = args.height || '100%'
      , backgroundColor = args.backgroundColor || '#ffffff'
      , targetElement = args.targetElement
      , targetTagName = args.targetTagName
      ;

    crossPlatformShapesInstance.backgroundColor = backgroundColor;
    var targetSvg = (targetElement.tagName === 'svg' || targetElement.tagName === 'SVG') ? targetElement : targetElement.ownerSVGElement || !!targetElement.correspondingElement && targetElement.correspondingElement.ownerSVGElement;
    if (!targetSvg) {
      var svgId = args.id || 'svg-' + new Date().toISOString().replace(/\D/g, '');
      targetSvg = document.createElementNS(this.svgNS, 'svg');
      targetSvg.setAttributeNS(this.xmlnsNS, 'xmlns', this.svgNS);
      targetSvg.setAttributeNS(this.xmlnsNS, 'xmlns:xlink', this.xlinkNS);
      targetSvg.setAttributeNS(this.xmlnsNS, 'xmlns:ev', this.evNS);
      targetSvg.setAttribute('id', svgId);
      targetSvg.setAttribute('version', '1.1');
      targetSvg.setAttribute('baseProfile', 'full');
      targetSvg.setAttribute('preserveAspectRatio', 'xMidYMid');
      targetSvg.setAttribute('width', width);
      targetSvg.setAttribute('height', height);
      targetSvg.setAttribute('style', 'background-color:' + backgroundColor + '; ');
      targetElement.appendChild(targetSvg);
    }
    crossPlatformShapesInstance.targetSvg = targetSvg;
    return targetSvg;
  },
  getOrCreateViewport: function(crossPlatformShapesInstance, targetSvg) {
    var viewport = targetSvg.querySelector('g.viewport');

    // If no g element with class 'viewport' exists, create one
    if (!viewport) {
      var viewportId = 'viewport-' + new Date().toISOString().replace(/\D/g, '');
      viewport = document.createElementNS(this.svgNS, 'g');
      viewport.setAttribute('id', viewportId);
      viewport.setAttribute('class', 'viewport');

      // Internet Explorer (all versions?) can't use childNodes, but other browsers prefer (require?) using childNodes
      var targetSvgChildren = targetSvg.childNodes || targetSvg.children;
      if (!!targetSvgChildren && targetSvgChildren.length > 0) {
        do {
          viewport.appendChild(targetSvgChildren[0]);
        } while (targetSvgChildren.length > 0);
      }
      targetSvg.appendChild(viewport);
    }

    return viewport;
  },
  createOrGetDefs: function(crossPlatformShapesInstance, targetSvg) {
    var defs = targetSvg.querySelector('defs');
    if (!defs) {
      defs = document.createElementNS(this.svgNS, 'defs');
      targetSvg.appendChild(defs);
    }
    crossPlatformShapesInstance.targetSvgDefs = defs;
    return defs;
  },
  getInstance: function(crossPlatformShapesInstance, args){
    var targetElement = args.targetElement
      , targetTagName = args.targetTagName
      ;

    crossPlatformShapesInstance.svgNS = this.svgNS;
    var svgInstance = crossPlatformShapesInstance.svg;

    var targetSvg = this.createOrGetSvg(crossPlatformShapesInstance, args);
    var viewport = this.createOrGetDefs(crossPlatformShapesInstance, targetSvg);
    var defs = this.createOrGetDefs(crossPlatformShapesInstance, targetSvg);

    crossPlatformShapesInstance.availableMarkers = {};

    return svgInstance;
  },
  path: require('./path'),
  image: require('./image'),
  marker: require('./marker')
};
