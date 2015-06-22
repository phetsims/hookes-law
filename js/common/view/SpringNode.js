// Copyright 2002-2015, University of Colorado Boulder

/**
 * A coiled spring. The left end attaches to something, the right end is pulled.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  /**
   * @param {Spring} spring
   * @param {Object} [options]
   * @constructor
   */
  function SpringNode( spring, options ) {

    options = _.extend( {
      unitDisplacementLength: 1,
      stroke: 'blue',
      numberOfCoils: 10, // number of coils in the spring
      radiusY: 35, // vertical radius of the spring
      minLineWidth: 1, // lineWidth for minimum spring constant
      deltaLineWidth: 0.005, // increase in line width per 1 unit of spring constant increase
      nibLength: 10 // length of the small pieces of wire (nib) at either end of the coil
    }, options );

    var thisNode = this;

    Path.call( this );

    spring.lengthProperty.link( function( length ) {

      var viewLength = options.unitDisplacementLength * length;
      var radiusX = ( viewLength - 2 * options.nibLength ) / ( options.numberOfCoils + 1 );
      var shape = new Shape();

      // nib at left end of spring
      shape.moveTo( 0, 0 );
      shape.lineTo( options.nibLength, 0 );
      shape.subpath(); // prevent line between ellipses

      // coils
      for ( var i = 0; i < options.numberOfCoils; i++ ) {
        shape.ellipse( radiusX * ( i + 1 ) + options.nibLength, 0, radiusX, options.radiusY, 0 );
        shape.subpath(); // prevent line between ellipses
      }

      // nib at right end of spring
      shape.moveTo( viewLength - options.nibLength, 0 );
      shape.lineTo( viewLength, 0 );

      thisNode.shape = shape;
    } );

    spring.springConstantProperty.link( function( springConstant ) {
      thisNode.lineWidth = options.minLineWidth + options.deltaLineWidth * ( springConstant - spring.springConstantRange.min );
    } );

    this.mutate( options );
  }

  return inherit( Path, SpringNode );
} );
