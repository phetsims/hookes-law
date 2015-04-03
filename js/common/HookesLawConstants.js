// Copyright 2002-2015, University of Colorado Boulder

/**
 * Constants for this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var Range = require( 'DOT/Range' );

  return {
    SCREEN_VIEW_OPTIONS: { layoutBounds: new Bounds2( 0, 0, 1024, 618 ) },
    APPLIED_FORCE_RANGE: new Range( -50, 50 ),
    APPLIED_FORCE_DECIMAL_PLACES: 0
  };
} );
