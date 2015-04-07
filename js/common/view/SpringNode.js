// Copyright 2002-2015, University of Colorado Boulder

//TODO this is a quick-&-dirty temporary implementation
/**
 * A coiled spring.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var Subpath = require( 'KITE/util/Subpath' );

  // constants
  var NUMBER_OF_COILS = 10;
  var RADIUS_Y = 35;
  var NIB_LENGTH = 6;

  /**
   * @param {Spring} spring
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Object} [options]
   * @constructor
   */
  function SpringNode( spring, modelViewTransform, options ) {

    options = _.extend( {
      lineWidth: 2,
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

    this.mutate( options );
  }

  return inherit( Path, SpringNode );
} );
