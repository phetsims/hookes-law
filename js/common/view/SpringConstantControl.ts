// Copyright 2015-2025, University of Colorado Boulder

/**
 * Control for spring constant (k).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Range from '../../../../dot/js/Range.js';
import Utils from '../../../../dot/js/Utils.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import NumberControl, { NumberControlOptions } from '../../../../scenery-phet/js/NumberControl.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import SunConstants from '../../../../sun/js/SunConstants.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawStrings from '../../HookesLawStrings.js';
import HookesLawColors from '../HookesLawColors.js';
import HookesLawConstants from '../HookesLawConstants.js';
import { toFixedNumber } from '../../../../dot/js/util/toFixedNumber.js';

// Steps for slider thumb, arrow buttons, and keyboard, in N.
// See https://github.com/phetsims/hookes-law/issues/106 for keyboard steps.
const SLIDER_THUMB_INTERVAL = 10;
const ARROW_BUTTON_INTERVAL = 1;
const KEYBOARD_STEP = 20;
const SHIFT_KEYBOARD_STEP = ARROW_BUTTON_INTERVAL;
const PAGE_KEYBOARD_STEP = 100;
assert && assert( KEYBOARD_STEP % SLIDER_THUMB_INTERVAL === 0,
  'KEYBOARD_STEP must be an integer multiple of SLIDER_THUMB_INTERVAL because of constrainValue.' );

type SelfOptions = {
  titleStringProperty?: TReadOnlyProperty<string>;
  majorTickValues: number[];
  minorTickSpacing: number;
};

type SpringConstantControlOptions = SelfOptions &
  PickOptional<NumberControlOptions, 'sliderOptions' | 'phetioVisiblePropertyInstrumented'> &
  PickRequired<NumberControlOptions, 'tandem'>;

export default class SpringConstantControl extends NumberControl {

  public constructor( springConstantProperty: Property<number>,
                      springConstantRange: Range,
                      provideOptions: SpringConstantControlOptions ) {

    // major ticks
    const majorTicks = [];
    for ( let i = 0; i < provideOptions.majorTickValues.length; i++ ) {
      const tickValue = provideOptions.majorTickValues[ i ];
      assert && assert( Number.isInteger( tickValue ), `not an integer tick: ${tickValue}` );
      majorTicks.push( {
        value: tickValue,
        label: new Text( tickValue, HookesLawConstants.MAJOR_TICK_LABEL_OPTIONS )
      } );
    }

    const valuePatternProperty = new DerivedProperty(
      [ HookesLawStrings.pattern[ '0value' ][ '1unitsStringProperty' ], HookesLawStrings.newtonsPerMeterStringProperty ],
      ( pattern, newtonsPerMeterString ) => StringUtils.format( pattern, SunConstants.VALUE_NUMBERED_PLACEHOLDER, newtonsPerMeterString )
    );

    const options = optionize<SpringConstantControlOptions, SelfOptions, NumberControlOptions>()( {

      // SelfOptions
      titleStringProperty: HookesLawStrings.springConstantStringProperty,

      // NumberControlOptions
      delta: ARROW_BUTTON_INTERVAL,
      titleNodeOptions: {
        maxWidth: 175, // i18n, determined empirically
        font: HookesLawConstants.CONTROL_PANEL_TITLE_FONT,
        tandem: Tandem.OPT_OUT
      },
      numberDisplayOptions: {
        maxWidth: 100, // i18n, determined empirically
        textOptions: {
          font: HookesLawConstants.CONTROL_PANEL_VALUE_FONT
        },
        decimalPlaces: HookesLawConstants.SPRING_CONSTANT_DECIMAL_PLACES,
        valuePattern: valuePatternProperty
      },
      arrowButtonOptions: HookesLawConstants.ARROW_BUTTON_OPTIONS,
      sliderOptions: {
        majorTicks: majorTicks,
        minorTickSpacing: provideOptions.minorTickSpacing,
        thumbFill: HookesLawColors.singleSpringMiddleColorProperty,
        constrainValue: value => {
          return Utils.roundToInterval( value, SLIDER_THUMB_INTERVAL );
        },
        keyboardStep: KEYBOARD_STEP,
        shiftKeyboardStep: SHIFT_KEYBOARD_STEP,
        pageKeyboardStep: PAGE_KEYBOARD_STEP
      },
      valueChangeSoundGeneratorOptions: {
        numberOfMiddleThresholds: toFixedNumber( springConstantRange.getLength() / KEYBOARD_STEP, 0 )
      }
    }, provideOptions );

    super( options.titleStringProperty, springConstantProperty, springConstantRange, options );
  }
}

hookesLaw.register( 'SpringConstantControl', SpringConstantControl );