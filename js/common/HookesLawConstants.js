// Copyright 2015, University of Colorado Boulder

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
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawFont = require( 'HOOKES_LAW/common/HookesLawFont' );
  var Property = require( 'AXON/Property' );
  var Color = require( 'SCENERY/util/Color' );

  var HookesLawConstants = {

    SCREEN_OPTIONS: { backgroundColorProperty: new Property( Color.toColor( 'white' ) ) },
    SCREEN_VIEW_OPTIONS: { layoutBounds: new Bounds2( 0, 0, 1024, 618 ) },

    // number of decimal places for quantities
    SPRING_CONSTANT_DECIMAL_PLACES: 0,
    APPLIED_FORCE_DECIMAL_PLACES: 0,
    SPRING_FORCE_DECIMAL_PLACES: 0,
    DISPLACEMENT_DECIMAL_PLACES: 3,
    ENERGY_DECIMAL_PLACES: 1,

    // deltas for controls
    SPRING_CONSTANT_DELTA: 10, // units = N/m
    APPLIED_FORCE_DELTA: 1, // units = N
    DISPLACEMENT_DELTA: 0.001, // units = m

    // unit vectors, for 1-dimensional model-view transforms
    UNIT_DISPLACEMENT_X: 225, // view length of a 1m displacement vector, when drawn in the x dimension
    UNIT_FORCE_X: 1.45, // view length of a 1N force vector, when drawn in the x dimension
    UNIT_FORCE_Y: 0.25, // view length of a 1N force vector, when drawn in the y dimension
    UNIT_ENERGY_Y: 1.1, // view length of a 1J energy vector, when drawn in the y dimension

    // specific to parallel system, where spring-force components require a decimal place
    PARALLEL_COMPONENTS_SPRING_FORCE_DECIMAL_PLACES: 1,
    PARALLEL_COMPONENTS_APPLIED_FORCE_DELTA: 0.1,

    // specific to Energy screen, where ranges are different
    ENERGY_UNIT_FORCE_X: 0.4, // view length of a 1N force vector, when drawn in the x dimension

    // fonts
    CONTROL_PANEL_TITLE_FONT: new HookesLawFont( 18 ),
    CONTROL_PANEL_VALUE_FONT: new HookesLawFont( 18 ),
    VECTOR_VALUE_FONT: new HookesLawFont( 18 ),
    BAR_GRAPH_VALUE_FONT: new HookesLawFont( 18 ),
    BAR_GRAPH_AXIS_FONT: new HookesLawFont( 16 ),
    XY_PLOT_VALUE_FONT: new HookesLawFont( 18 ),
    XY_PLOT_AXIS_FONT: new HookesLawFont( 16 ),

    // sizes and lengths for UI components
    WALL_SIZE: new Dimension2( 25, 170 ),
    VECTOR_HEAD_SIZE: new Dimension2( 20, 10 ),
    SLIDER_THUMB_SIZE: new Dimension2( 17, 34 ),
    SLIDER_TRACK_SIZE: new Dimension2( 180, 3 ),
    SLIDER_MAJOR_TICK_LENGTH: 20,
    FORCE_Y_AXIS_LENGTH: 250,
    ENERGY_Y_AXIS_LENGTH: 250,

    // number of loops in the spring coil for various systems
    SINGLE_SPRING_LOOPS: 12,
    SERIES_SPRINGS_LOOPS: 8,
    PARALLEL_SPRINGS_LOOPS: 8,

    // options
    CHECK_BOX_OPTIONS: {
      boxWidth: 18,
      spacing: 8
    },
    CONTROL_TEXT_OPTIONS: {
      font: new HookesLawFont( 18 )
    },
    DISPLACEMENT_VECTOR_OPTIONS: {
      stroke: HookesLawColors.DISPLACEMENT,
      headWidth: 20,
      headHeight: 10,
      headLineWidth: 3,
      tailLineWidth: 3
    },
    MAJOR_TICK_LABEL_OPTIONS: {
      font: new HookesLawFont( 14 )
    },
    RADIO_BUTTON_OPTIONS: {
      radius: 8
    },
    SEPARATOR_OPTIONS: {
      stroke: HookesLawColors.SEPARATOR_STROKE
    },
    SPRING_PANEL_OPTIONS: {
      fill: HookesLawColors.CONTROL_PANEL_FILL,
      stroke: HookesLawColors.CONTROL_PANEL_STROKE,
      xMargin: 20,
      yMargin: 5
    },
    VISIBILITY_PANEL_OPTIONS: {
      fill: HookesLawColors.CONTROL_PANEL_FILL,
      stroke: HookesLawColors.CONTROL_PANEL_STROKE,
      xMargin: 15,
      yMargin: 15
    }
  };

  hookesLaw.register( 'HookesLawConstants', HookesLawConstants );

  return HookesLawConstants;
} );
