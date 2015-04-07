// Copyright 2002-2015, University of Colorado Boulder

/**
 * The hook used to pull the spring.
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
  var RADIUS = 30;

  /**
   * @param {Property.<number>} displacementProperty
   * @param {Range} displacementRange
   * @param {Object} [options]
   * @constructor
   */
  function HookNode( displacementProperty, displacementRange, options ) {

    options = _.extend( {
      stroke: 'red',
      lineWidth: 8
    }, options );

    Path.call( this,
      new Shape()
        .arc( RADIUS, 0, RADIUS, Math.PI / 2, 0 )
        .lineTo( 200, 0 ),
      options );

    //TODO addInputListener to manipulate displacementProperty, constrained to displacementRange
  }

  return inherit( Path, HookNode );
} );
