// Copyright 2015-2022, University of Colorado Boulder

// @ts-nocheck
/**
 * Control for spring constant (k).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import NumberControl from '../../../../scenery-phet/js/NumberControl.js';
import { Text } from '../../../../scenery/js/imports.js';
import SunConstants from '../../../../sun/js/SunConstants.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawStrings from '../../HookesLawStrings.js';
import HookesLawColors from '../HookesLawColors.js';
import HookesLawConstants from '../HookesLawConstants.js';

// fill in the {1} units, but leave the {0} value alone.
const VALUE_PATTERN = StringUtils.format( HookesLawStrings.pattern[ '0value' ][ '1units' ],
  SunConstants.VALUE_NUMBERED_PLACEHOLDER, HookesLawStrings.newtonsPerMeter );

export default class SpringConstantControl extends NumberControl {

  /**
   * @param {BooleanProperty} springConstantProperty units = N/m
   * @param {Range} springConstantRange units = N/m
   * @param {Object} [options]
   */
  constructor( springConstantProperty, springConstantRange, options ) {

    options = merge( {
      title: HookesLawStrings.springConstantStringProperty,

      // NumberControl options
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
        valuePattern: VALUE_PATTERN
      },
      arrowButtonOptions: HookesLawConstants.ARROW_BUTTON_OPTIONS,

      // slider options passed when control is initialized
      sliderOptions: null,

      // phet-io
      tandem: Tandem.REQUIRED
    }, options );

    // slider option defaults
    options.sliderOptions = merge( {
      majorTicksValues: null, // {number[]|null} values for major ticks
      minorTickSpacing: 100,
      thumbFill: HookesLawColors.SINGLE_SPRING,
      constrainValue: value => {
        return Utils.roundToInterval( value, HookesLawConstants.SPRING_CONSTANT_THUMB_INTERVAL );
      }
    }, options.sliderOptions );

    // major ticks
    if ( options.sliderOptions.majorTickValues ) {
      options.sliderOptions.majorTicks = [];
      for ( let i = 0; i < options.sliderOptions.majorTickValues.length; i++ ) {
        const tickValue = options.sliderOptions.majorTickValues[ i ];
        assert && assert( Number.isInteger( tickValue ), `not an integer tick: ${tickValue}` );
        options.sliderOptions.majorTicks.push( {
          value: tickValue,
          label: new Text( tickValue, HookesLawConstants.MAJOR_TICK_LABEL_OPTIONS )
        } );
      }
    }

    super( options.title, springConstantProperty, springConstantRange, options );
  }
}

hookesLaw.register( 'SpringConstantControl', SpringConstantControl );
