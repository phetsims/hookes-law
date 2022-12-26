// Copyright 2015-2022, University of Colorado Boulder

/**
 * Constants for this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../dot/js/Dimension2.js';
import StrictOmit from '../../../phet-core/js/types/StrictOmit.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import { HSeparatorOptions, TextOptions } from '../../../scenery/js/imports.js';
import { AquaRadioButtonOptions } from '../../../sun/js/AquaRadioButton.js';
import { ArrowButtonOptions } from '../../../sun/js/buttons/ArrowButton.js';
import { CheckboxOptions } from '../../../sun/js/Checkbox.js';
import { PanelOptions } from '../../../sun/js/Panel.js';
import hookesLaw from '../hookesLaw.js';
import HookesLawColors from './HookesLawColors.js';

// constants
const APPLIED_FORCE_DECIMAL_PLACES = 1;

const AQUA_RADIO_BUTTON_OPTIONS: StrictOmit<AquaRadioButtonOptions, 'tandem'> = {
  radius: 8
};

const ARROW_BUTTON_OPTIONS: StrictOmit<ArrowButtonOptions, 'tandem'> = {
  touchAreaXDilation: 10,
  touchAreaYDilation: 10
};

const CHECKBOX_OPTIONS: StrictOmit<CheckboxOptions, 'tandem'> = {
  boxWidth: 18,
  spacing: 8
};

const CONTROL_TEXT_OPTIONS: StrictOmit<TextOptions, 'tandem'> = {
  font: new PhetFont( 18 )
};

const HSEPARATOR_OPTIONS: HSeparatorOptions = {
  stroke: HookesLawColors.SEPARATOR_STROKE
};

const MAJOR_TICK_LABEL_OPTIONS: StrictOmit<TextOptions, 'tandem'> = {
  font: new PhetFont( 14 )
};

const SPRING_PANEL_OPTIONS: StrictOmit<PanelOptions, 'tandem'> = {
  fill: HookesLawColors.CONTROL_PANEL_FILL,
  stroke: HookesLawColors.CONTROL_PANEL_STROKE,
  xMargin: 20,
  yMargin: 5
};

const VISIBILITY_PANEL_OPTIONS: StrictOmit<PanelOptions, 'tandem'> = {
  fill: HookesLawColors.CONTROL_PANEL_FILL,
  stroke: HookesLawColors.CONTROL_PANEL_STROKE,
  xMargin: 15,
  yMargin: 15
};

const HookesLawConstants = {

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
  CONTROL_PANEL_TITLE_FONT: new PhetFont( 18 ),
  CONTROL_PANEL_VALUE_FONT: new PhetFont( 18 ),
  VECTOR_VALUE_FONT: new PhetFont( 18 ),
  BAR_GRAPH_VALUE_FONT: new PhetFont( 18 ),
  BAR_GRAPH_AXIS_FONT: new PhetFont( 16 ),
  XY_PLOT_VALUE_FONT: new PhetFont( 18 ),
  XY_PLOT_AXIS_FONT: new PhetFont( 16 ),

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
  AQUA_RADIO_BUTTON_OPTIONS: AQUA_RADIO_BUTTON_OPTIONS,
  ARROW_BUTTON_OPTIONS: ARROW_BUTTON_OPTIONS,
  CHECKBOX_OPTIONS: CHECKBOX_OPTIONS,
  CONTROL_TEXT_OPTIONS: CONTROL_TEXT_OPTIONS,
  HSEPARATOR_OPTIONS: HSEPARATOR_OPTIONS,
  MAJOR_TICK_LABEL_OPTIONS: MAJOR_TICK_LABEL_OPTIONS,
  SPRING_PANEL_OPTIONS: SPRING_PANEL_OPTIONS,
  VISIBILITY_PANEL_OPTIONS: VISIBILITY_PANEL_OPTIONS
};

hookesLaw.register( 'HookesLawConstants', HookesLawConstants );

export default HookesLawConstants;