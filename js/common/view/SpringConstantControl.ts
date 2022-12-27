// Copyright 2015-2022, University of Colorado Boulder

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
import { Text } from '../../../../scenery/js/imports.js';
import SunConstants from '../../../../sun/js/SunConstants.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawStrings from '../../HookesLawStrings.js';
import HookesLawColors from '../HookesLawColors.js';
import HookesLawConstants from '../HookesLawConstants.js';

type SelfOptions = {
  titleStringProperty?: TReadOnlyProperty<string>;
  majorTickValues: number[];
  minorTickSpacing: number;
};

type SpringConstantControlOptions = SelfOptions &
  PickOptional<NumberControlOptions, 'sliderOptions'> &
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
      delta: HookesLawConstants.SPRING_CONSTANT_TWEAKER_INTERVAL,
      startCallback: () => {
        phet.log && phet.log( '>>>>> SpringConstantControl start interaction' );
      },
      endCallback: () => {
        phet.log && phet.log( '>>>>> SpringConstantControl end interaction' );
      },
      titleNodeOptions: {
        maxWidth: 200, // i18n, determined empirically
        font: HookesLawConstants.CONTROL_PANEL_TITLE_FONT
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
        thumbFill: HookesLawColors.SINGLE_SPRING,
        constrainValue: value => {
          return Utils.roundToInterval( value, HookesLawConstants.SPRING_CONSTANT_THUMB_INTERVAL );
        }
      }
    }, provideOptions );

    super( options.titleStringProperty, springConstantProperty, springConstantRange, options );
  }
}

hookesLaw.register( 'SpringConstantControl', SpringConstantControl );
