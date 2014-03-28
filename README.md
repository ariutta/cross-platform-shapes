cross-platform-shapes
=====================

JS library for creating shapes in SVG, Canvas and possibly other formats in the future.


# Demo
[Github Pages](http://ariutta.github.io/cross-platform-shapes/)

# Installation
First initialize the library with a call like this:

```JS
  var crossPlatformShapesDemo = Object.create(crossPlatformShapes);
  crossPlatformShapesDemo.init({
    targetImageSelector:'#my-svg',
    customShapes: { // optional
      arc: {
        href: 'http://www.example.org/arc.png'
      },
      brace:{
        href: 'http://www.example.org/brace.png'
      },
      rectangle:{
        href: 'http://www.example.org/rectangle.png'
      }
    }
  });
```

The library accepts JS objects with a vocabulary based as much as possible
on SVG and Canvas terms. It returns a JS object with every parameter that is needed 
to render the shape. 

If you override a pre-set shape with the customShapes argument, the returned
object for that shape will specify the parameters for either an SVG 'image' element or a
Canvas 'Image()' call. Otherwise, it will return the parameters for an
SVG or Canvas path.

The image format (SVG or Canvas) is determined based on the tagName of the
targetImage referenced in the init() call.

If you specify a marker (arrowhead) for an edge shape, the SVG version will check for
whether that marker is available in the defs section of the SVG. If not, it will add
it to the SVG. The Canvas version will probably need to determine the path data to render
the marker and concatenate that path data with the path data for the edge itself.

This library is still in alpha, and the Canvas functionality is not yet implemented.


# License
Apache License 2.0. See LICENSE file.
