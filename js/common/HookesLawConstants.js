// Copyright 2015-2020, University of Colorado Boulder

/**
 * Constants for this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../axon/js/Property.js';
import Dimension2 from '../../../dot/js/Dimension2.js';
import hookesLaw from '../hookesLaw.js';
import HookesLawColors from './HookesLawColors.js';
import HookesLawFont from './HookesLawFont.js';

// constants
const APPLIED_FORCE_DECIMAL_PLACES = 1;

const HookesLawConstants = {

  SCREEN_OPTIONS: { backgroundColorProperty: new Property( 'white' ) },

  // number of decimal places for displayed values
  APPLIED_FORCE_DECIMAL_PLACES: APPLIED_FORCE_DECIMAL_PLACES,
  SPRING_FORCE_DECIMAL_PLACES: APPLIED_FORCE_DECIMAL_PLACES,
  SERIES_SPRING_FORCE_COMPONENTS_DECIMAL_PLACES: APPLIED_FORCE_DECIMAL_PLACES, // series system
  PARALLEL_SPRING_FORCE_COMPONENTS_DECIMAL_PLACES: APPLIED_FORCE_DECIMAL_PLACES + 1, // parallel system
  SPRING_CONSTANT_DECIMAL_PLACES: 0,
  DISPLACEMENT_DECIMAL_PLACES: 3,
  ENERGY_DECIMAL_PLACES: 1,

  // slider thumb intervals
  APPLIED_FORCE_THUMB_INTERVAL: 5, // N
  SPRING_CONSTANT_THUMB_INTERVAL: 10, // N/m
  DISPLACEMENT_THUMB_INTERVAL: 0.05, // m

  // tweaker intervals
  APPLIED_FORCE_TWEAKER_INTERVAL: 1, // N
  SPRING_CONSTANT_TWEAKER_INTERVAL: 1, // N/m
  DISPLACEMENT_TWEAKER_INTERVAL: 0.01, // m

  // drag intervals
  ROBOTIC_ARM_DISPLACEMENT_INTERVAL: 0.05, // m, Energy screen only, see #54

  // unit vectors, for 1-dimensional model-view transforms
  UNIT_DISPLACEMENT_X: 225, // view length of a 1m displacement vector, when drawn in the x dimension
  UNIT_FORCE_X: 1.45, // view length of a 1N force vector, when drawn in the x dimension
  UNIT_FORCE_Y: 0.25, // view length of a 1N force vector, when drawn in the y dimension
  UNIT_ENERGY_Y: 1.1, // view length of a 1J energy vector, when drawn in the y dimension
  ENERGY_UNIT_FORCE_X: 0.4, // Energy screen: view length of a 1N force vector, when drawn in the x dimension

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
  CHECKBOX_OPTIONS: {
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
    tailLineWidth: 3,
    useArrowNode: false
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
  },
  ARROW_BUTTON_OPTIONS: {
    touchAreaXDilation: 10,
    touchAreaYDilation: 10
  }
};

hookesLaw.register( 'HookesLawConstants', HookesLawConstants );

export default HookesLawConstants;