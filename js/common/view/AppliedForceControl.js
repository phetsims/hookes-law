// Copyright 2015-2021, University of Colorado Boulder

/**
 * Control for applied force (F).
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
  SunConstants.VALUE_NUMBERED_PLACEHOLDER, HookesLawStrings.newtons );

// constants
const MINOR_TICK_SPACING = 10;

class AppliedForceControl extends NumberControl {
  /**
   * @param {NumberProperty} appliedForceProperty units = N
   * @param {Range} appliedForceRange
   * @param {NumberProperty} numberOfInteractionsInProgressProperty - number of interactions in progress that affect displacement
   * @param {Object} [options]
   */
  constructor( appliedForceProperty, appliedForceRange, numberOfInteractionsInProgressProperty, options ) {

    // major ticks
    assert && assert( appliedForceRange.min < 0 && Math.abs( appliedForceRange.min ) === Math.abs( appliedForceRange.max ) ); // range is symmetric
    assert && assert( Number.isInteger( appliedForceRange.max ) && Number.isInteger( appliedForceRange.max / 2 ) ); // major ticks are on integer values
    assert && assert( Number.isInteger( appliedForceRange.max / MINOR_TICK_SPACING ) ); // minor ticks are on integer values
    const majorTicks = [ {
      value: appliedForceRange.min,
      label: new Text( appliedForceRange.min, HookesLawConstants.MAJOR_TICK_LABEL_OPTIONS )
    }, {
      value: appliedForceRange.min / 2,
      label: null
    }, {
      value: appliedForceRange.getCenter(),
      label: new Text( 0, HookesLawConstants.MAJOR_TICK_LABEL_OPTIONS )
    }, {
      value: appliedForceRange.max / 2,
      label: null
    }, {
      value: appliedForceRange.max,
      label: new Text( appliedForceRange.max, HookesLawConstants.MAJOR_TICK_LABEL_OPTIONS )
    } ];

    options = merge( {
      title: HookesLawStrings.appliedForceColon,

      // NumberControl options
      delta: HookesLawConstants.APPLIED_FORCE_TWEAKER_INTERVAL,
      startCallback: () => {
        phet.log && phet.log( '>>>>> AppliedForceControl start interaction' );
        numberOfInteractionsInProgressProperty.set( numberOfInteractionsInProgressProperty.get() + 1 );
      },
      endCallback: () => {
        numberOfInteractionsInProgressProperty.set( numberOfInteractionsInProgressProperty.get() - 1 );
        phet.log && phet.log( '>>>>> AppliedForceControl end interaction' );
      },

      // options passed to subcomponents
      titleNodeOptions: {
        maxWidth: 200, // i18n, determined empirically
        font: HookesLawConstants.CONTROL_PANEL_TITLE_FONT
      },
      numberDisplayOptions: {
        maxWidth: 100, // i18n, determined empirically
        textOptions: {
          font: HookesLawConstants.CONTROL_PANEL_VALUE_FONT
        },
        decimalPlaces: HookesLawConstants.APPLIED_FORCE_DECIMAL_PLACES,
        valuePattern: VALUE_PATTERN
      },
      sliderOptions: {
        majorTicks: majorTicks,
        minorTickSpacing: MINOR_TICK_SPACING,
        thumbFill: HookesLawColors.APPLIED_FORCE,
        constrainValue: value => {
          return Utils.roundToInterval( value, HookesLawConstants.APPLIED_FORCE_THUMB_INTERVAL );
        }
      },
      arrowButtonOptions: HookesLawConstants.ARROW_BUTTON_OPTIONS,

      // phet-io
      tandem: Tandem.REQUIRED
    }, options );

    super( options.title, appliedForceProperty, appliedForceRange, options );
  }
}

hookesLaw.register( 'AppliedForceControl', AppliedForceControl );

export default AppliedForceControl;