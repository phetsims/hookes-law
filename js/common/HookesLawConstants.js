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
  var Dimension2 = require( 'DOT/Dimension2' );
  var HookesLawFont = require( 'HOOKES_LAW/common/HookesLawFont' );

  return {
    SCREEN_VIEW_OPTIONS: { layoutBounds: new Bounds2( 0, 0, 1024, 618 ) },

    // number of decimal places for quantities
    SPRING_CONSTANT_DECIMAL_PLACES: 0,
    APPLIED_FORCE_DECIMAL_PLACES: 0,
    SPRING_FORCE_DECIMAL_PLACES: 0,
    DISPLACEMENT_DECIMAL_PLACES: 3,

    // delta for controls
    SPRING_CONSTANT_DELTA: 10,
    APPLIED_FORCE_DELTA: 1,

    // scale factors for vectors
    UNIT_FORCE_VECTOR_LENGTH: 1.75, // view length of a force vector whose magnitude is 1 N
    UNIT_DISPLACEMENT_VECTOR_LENGTH: 200, // view length of a displacement vector whose magnitude is 1 m

    // visual properties for UI components
    VECTOR_HEAD_SIZE: new Dimension2( 20, 10 ),
    CONTROL_PANEL_TITLE_FONT: new HookesLawFont( 18 ),
    SLIDER_TICK_LABEL_FONT: new HookesLawFont( 14 ),
    SLIDER_THUMB_SIZE: new Dimension2( 17, 34 ),
    SLIDER_TRACK_SIZE: new Dimension2( 180, 3 ),
    SLIDER_MAJOR_TICK_LENGTH: 20
  };
} );
