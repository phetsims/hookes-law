// Copyright 2002-2015, University of Colorado Boulder

//TODO this is a quick-&-dirty temporary implementation
/**
 * A coiled spring.  Assumes that the left end attaches to the wall, right end attaches to the hook.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  // constants
  var NUMBER_OF_COILS = 10; // number of coils in the spring
  var RADIUS_Y = 35; // vertical radius of the spring
  var MIN_LINE_WIDTH = 1; // lineWidth for minimum spring constant
  var DELTA_LINE_WIDTH = 0.005; // increase in line width per 1 unit of spring constant increase
  var NIB_LENGTH = 6; // length of the small pieces of wire (nib) at either end of the coil

  /**
   * @param {Spring} spring
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Object} [options]
   * @constructor
   */
  function SpringNode( spring, modelViewTransform, options ) {

    options = _.extend( {
      stroke: 'blue'
    }, options );

    var thisNode = this;

    Path.call( this );

    spring.lengthProperty.link( function( length ) {

      var viewLength = modelViewTransform.modelToViewX( length );
      var radiusX = ( viewLength - 2 * NIB_LENGTH ) / ( NUMBER_OF_COILS + 1 );
      var shape = new Shape();

      // nib at left end of spring
      shape.moveTo( 0, 0 );
      shape.lineTo( NIB_LENGTH, 0 );
      shape.subpath(); // prevent line between ellipses

      // coils
      for ( var i = 0; i < NUMBER_OF_COILS; i++ ) {
        shape.ellipse( radiusX * ( i + 1 ) + NIB_LENGTH, 0, radiusX, RADIUS_Y, 0 );
        shape.subpath(); // prevent line between ellipses
      }

      // nib at right end of spring
      shape.moveTo( viewLength - NIB_LENGTH, 0 );
      shape.lineTo( viewLength, 0 );

      thisNode.shape = shape;
    } );

    spring.springConstantProperty.link( function( springConstant ) {
      thisNode.lineWidth = MIN_LINE_WIDTH + DELTA_LINE_WIDTH * ( springConstant - spring.springConstantRange.min );
    } );

    this.mutate( options );
  }

  return inherit( Path, SpringNode );
} );
