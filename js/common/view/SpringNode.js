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
  var RADIUS_Y = 40;

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
      var radiusX = viewLength / ( NUMBER_OF_COILS + 1 );
      var shape = new Shape();
      for ( var i = 0; i < NUMBER_OF_COILS; i++ ) {
        shape.ellipse( radiusX * ( i + 1 ), 0, radiusX, RADIUS_Y, 0 );
        shape.subpath(); // prevent line between ellipses
      }
      shape.moveTo( viewLength, 0 );
      shape.lineTo( viewLength + 6, 0 );
      thisNode.shape = shape;
    } );

    this.mutate( options );
  }

  return inherit( Path, SpringNode );
} );
