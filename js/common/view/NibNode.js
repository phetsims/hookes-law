// Copyright 2002-2015, University of Colorado Boulder

/**
 * The "nib" is the little piece attached to the right end of a spring that is grabbed
 * by the robotic arm's pincers.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  function NibNode( options ) {
    Rectangle.call( this, 0, 0, 12, 8, 2, 2, options );
  }

  return inherit( Rectangle, NibNode );
} );
