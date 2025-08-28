// Copyright 2015-2025, University of Colorado Boulder

/**
 * Control for applied force (F).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import NumberControl, { NumberControlOptions } from '../../../../scenery-phet/js/NumberControl.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import SunConstants from '../../../../sun/js/SunConstants.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawStrings from '../../HookesLawStrings.js';
import HookesLawColors from '../HookesLawColors.js';
import HookesLawConstants from '../HookesLawConstants.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import { toFixedNumber } from '../../../../dot/js/util/toFixedNumber.js';
import { roundToInterval } from '../../../../dot/js/util/roundToInterval.js';
import { springControlLayoutFunction } from '../HookesLawUtils.js';

const MINOR_TICK_SPACING = 10;

// Steps for slider thumb, arrow buttons, and keyboard, in N/m.
// See https://github.com/phetsims/hookes-law/issues/106 for keyboard steps.
const SLIDER_THUMB_INTERVAL = 5;
const ARROW_BUTTON_INTERVAL = 1;
const KEYBOARD_STEP = 10;
const SHIFT_KEYBOARD_STEP = ARROW_BUTTON_INTERVAL;
const PAGE_KEYBOARD_STEP = 25;
assert && assert( KEYBOARD_STEP % SLIDER_THUMB_INTERVAL === 0,
  'KEYBOARD_STEP must be an integer multiple of SLIDER_THUMB_INTERVAL because of constrainValue.' );

type SelfOptions = {
  titleStringProperty?: TReadOnlyProperty<string>;
};

type AppliedForceControlOptions = SelfOptions &
  PickOptional<NumberControlOptions, 'phetioVisiblePropertyInstrumented'> &
  PickRequired<NumberControlOptions, 'tandem'>;

export default class AppliedForceControl extends NumberControl {

  public constructor( appliedForceProperty: Property<number>,
                      appliedForceRange: Range,
                      numberOfInteractionsInProgressProperty: Property<number>, // number of interactions in progress that affect displacement
                      providedOptions: AppliedForceControlOptions ) {

    // major ticks
    assert && assert( appliedForceRange.min < 0 && Math.abs( appliedForceRange.min ) === Math.abs( appliedForceRange.max ) ); // range is symmetric
    assert && assert( Number.isInteger( appliedForceRange.max ) && Number.isInteger( appliedForceRange.max / 2 ) ); // major ticks are on integer values
    assert && assert( Number.isInteger( appliedForceRange.max / MINOR_TICK_SPACING ) ); // minor ticks are on integer values
    const majorTicks = [
      {
        value: appliedForceRange.min,
        label: new Text( appliedForceRange.min, HookesLawConstants.MAJOR_TICK_LABEL_OPTIONS )
      },
      {
        value: appliedForceRange.min / 2
        // no label
      },
      {
        value: appliedForceRange.getCenter(),
        label: new Text( 0, HookesLawConstants.MAJOR_TICK_LABEL_OPTIONS )
      },
      {
        value: appliedForceRange.max / 2
        // no label
      },
      {
        value: appliedForceRange.max,
        label: new Text( appliedForceRange.max, HookesLawConstants.MAJOR_TICK_LABEL_OPTIONS )
      }
    ];

    const valuePatternProperty = new DerivedProperty(
      [ HookesLawStrings.pattern[ '0value' ][ '1unitsStringProperty' ], HookesLawStrings.newtonsStringProperty ],
      ( pattern, newtonString ) => StringUtils.format( pattern, SunConstants.VALUE_NUMBERED_PLACEHOLDER, newtonString )
    );

    const options = optionize<AppliedForceControlOptions, SelfOptions, NumberControlOptions>()( {

      // SelfOptions
      titleStringProperty: HookesLawStrings.appliedForceColonStringProperty,

      // NumberControlOptions
      layoutFunction: springControlLayoutFunction,
      delta: ARROW_BUTTON_INTERVAL,
      startCallback: () => {
        numberOfInteractionsInProgressProperty.value += 1;
      },
      endCallback: () => {
        numberOfInteractionsInProgressProperty.value -= 1;
      },
      titleNodeOptions: {
        maxWidth: 200, // i18n, determined empirically
        font: HookesLawConstants.CONTROL_PANEL_TITLE_FONT,
        tandem: Tandem.OPT_OUT
      },
      numberDisplayOptions: {
        maxWidth: 100, // i18n, determined empirically
        textOptions: {
          font: HookesLawConstants.CONTROL_PANEL_VALUE_FONT
        },
        decimalPlaces: HookesLawConstants.APPLIED_FORCE_DECIMAL_PLACES,
        valuePattern: valuePatternProperty
      },
      sliderOptions: {
        majorTicks: majorTicks,
        minorTickSpacing: MINOR_TICK_SPACING,
        thumbFill: HookesLawColors.appliedForceColorProperty,
        constrainValue: value => roundToInterval( value, SLIDER_THUMB_INTERVAL ),
        keyboardStep: KEYBOARD_STEP,
        shiftKeyboardStep: SHIFT_KEYBOARD_STEP,
        pageKeyboardStep: PAGE_KEYBOARD_STEP
      },
      arrowButtonOptions: HookesLawConstants.ARROW_BUTTON_OPTIONS,
      valueChangeSoundGeneratorOptions: {
        numberOfMiddleThresholds: toFixedNumber( appliedForceRange.getLength() / KEYBOARD_STEP, 0 )
      }
    }, providedOptions );

    super( options.titleStringProperty, appliedForceProperty, appliedForceRange, options );
  }
}

hookesLaw.register( 'AppliedForceControl', AppliedForceControl );