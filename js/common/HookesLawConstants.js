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
    APPLIED_FORCE_RANGE: new Range( -50, 50 ), // N
    APPLIED_FORCE_DECIMAL_PLACES: 0,
    SPRING_CONSTANT_RANGE: new Range( 5, 55 ), // N/m
    SPRING_FORCE_DECIMAL_PLACES: 0,
    DISPLACEMENT_DECIMAL_PLACES: 2,
    UNIT_FORCE_VECTOR_LENGTH: 2  // view length of a force vector whose magnitude is 1 N
  };
} );
