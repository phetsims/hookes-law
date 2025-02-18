// Copyright 2015-2025, University of Colorado Boulder

/**
 * Control for spring displacement (x).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import Range from '../../../../dot/js/Range.js';
import Utils from '../../../../dot/js/Utils.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
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

type SelfOptions = EmptySelfOptions;

type DisplacementControlOptions = SelfOptions &
  PickOptional<NumberControlOptions, 'phetioVisiblePropertyInstrumented'> &
  PickRequired<NumberControlOptions, 'tandem'>;

export default class DisplacementControl extends NumberControl {

  public constructor( displacementProperty: Property<number>,
                      displacementRange: Range,
                      numberOfInteractionsInProgressProperty: Property<number>, // number of interactions in progress that affect displacement
                      providedOptions: DisplacementControlOptions ) {

    const majorTickValues = [ displacementRange.min, displacementRange.getCenter(), displacementRange.max ];
    const majorTicks = [];
    for ( let i = 0; i < majorTickValues.length; i++ ) {
      const tickValue = majorTickValues[ i ];
      assert && assert( Number.isInteger( tickValue ), `not an integer tick: ${tickValue}` );
      majorTicks.push( {
        value: tickValue,
        label: new Text( tickValue, HookesLawConstants.MAJOR_TICK_LABEL_OPTIONS )
      } );
    }

    // fill in the {1} units, but leave the {0} value alone.
    const valuePatternProperty = new DerivedProperty(
      [ HookesLawStrings.pattern[ '0value' ][ '1unitsStringProperty' ], HookesLawStrings.metersStringProperty ],
      ( pattern, metersString ) => StringUtils.format( pattern, SunConstants.VALUE_NUMBERED_PLACEHOLDER, metersString )
    );

    const options = optionize<DisplacementControlOptions, SelfOptions, NumberControlOptions>()( {

      // NumberControlOptions
      delta: HookesLawConstants.DISPLACEMENT_TWEAKER_INTERVAL,
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
        decimalPlaces: HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES,
        valuePattern: valuePatternProperty
      },
      arrowButtonOptions: HookesLawConstants.ARROW_BUTTON_OPTIONS,
      sliderOptions: {
        majorTicks: majorTicks,
        minorTickSpacing: displacementRange.getLength() / 10,
        thumbFill: HookesLawColors.displacementColorProperty,
        constrainValue: value => {
          // constrain to multiples of a specific interval, see https://github.com/phetsims/hookes-law/issues/54
          return Utils.roundToInterval( value, HookesLawConstants.DISPLACEMENT_THUMB_INTERVAL );
        }
      },
      valueChangeSoundGeneratorOptions: {
        numberOfMiddleThresholds: displacementRange.getLength() / HookesLawConstants.DISPLACEMENT_THUMB_INTERVAL
      }
    }, providedOptions );

    super( HookesLawStrings.displacementColonStringProperty, displacementProperty, displacementRange, options );
  }
}

hookesLaw.register( 'DisplacementControl', DisplacementControl );