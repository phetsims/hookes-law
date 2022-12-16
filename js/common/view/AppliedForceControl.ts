// Copyright 2015-2022, University of Colorado Boulder

/**
 * Control for applied force (F).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import Utils from '../../../../dot/js/Utils.js';
import Range from '../../../../dot/js/Range.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import NumberControl, { NumberControlOptions } from '../../../../scenery-phet/js/NumberControl.js';
import { Text } from '../../../../scenery/js/imports.js';
import SunConstants from '../../../../sun/js/SunConstants.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawStrings from '../../HookesLawStrings.js';
import HookesLawColors from '../HookesLawColors.js';
import HookesLawConstants from '../HookesLawConstants.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import optionize from '../../../../phet-core/js/optionize.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import DerivedProperty from '../../../../axon/js/DerivedProperty.js';

// constants
const MINOR_TICK_SPACING = 10;

type SelfOptions = {
  titleStringProperty?: TReadOnlyProperty<string>;
};

type AppliedForceControlOptions = SelfOptions & PickRequired<NumberControlOptions, 'tandem'>;

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
      delta: HookesLawConstants.APPLIED_FORCE_TWEAKER_INTERVAL,
      startCallback: () => {
        phet.log && phet.log( '>>>>> AppliedForceControl start interaction' );
        numberOfInteractionsInProgressProperty.value = ( numberOfInteractionsInProgressProperty.value + 1 );
      },
      endCallback: () => {
        numberOfInteractionsInProgressProperty.value = ( numberOfInteractionsInProgressProperty.value - 1 );
        phet.log && phet.log( '>>>>> AppliedForceControl end interaction' );
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
        decimalPlaces: HookesLawConstants.APPLIED_FORCE_DECIMAL_PLACES,
        valuePattern: valuePatternProperty
      },
      sliderOptions: {
        majorTicks: majorTicks,
        minorTickSpacing: MINOR_TICK_SPACING,
        thumbFill: HookesLawColors.APPLIED_FORCE,
        constrainValue: value => {
          return Utils.roundToInterval( value, HookesLawConstants.APPLIED_FORCE_THUMB_INTERVAL );
        }
      },
      arrowButtonOptions: HookesLawConstants.ARROW_BUTTON_OPTIONS
    }, providedOptions );

    super( options.titleStringProperty, appliedForceProperty, appliedForceRange, options );
  }
}

hookesLaw.register( 'AppliedForceControl', AppliedForceControl );