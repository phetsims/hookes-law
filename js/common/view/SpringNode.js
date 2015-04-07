// Copyright 2002-2015, University of Colorado Boulder

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
   * @param {Property.<number>} lengthProperty
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Object} [options]
   * @constructor
   */
  function SpringNode( lengthProperty, modelViewTransform, options ) {

    options = _.extend( {
      lineWidth: 2,
      stroke: 'blue'
    }, options );

    var thisNode = this;

    Path.call( this );

    lengthProperty.link( function( length ) {
      var radiusX = modelViewTransform.modelToViewX( length ) / ( NUMBER_OF_COILS + 1 );
      var shape = new Shape();
      for ( var i = 0; i < NUMBER_OF_COILS; i++ ) {
        if ( i > 0 ) { shape.subpath(); }  // prevent line between ellipses
        shape.ellipse( radiusX * ( i + 1 ), 0, radiusX, RADIUS_Y, 0 );
      }
      thisNode.shape = shape;
    } );

    this.mutate( options );
  }

  return inherit( Path, SpringNode, {
    //TODO prototype functions
  } );
} );
