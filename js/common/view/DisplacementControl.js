// Copyright 2015-2020, University of Colorado Boulder

/**
 * Control for spring displacement (x).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import NumberControl from '../../../../scenery-phet/js/NumberControl.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import SunConstants from '../../../../sun/js/SunConstants.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import hookesLaw from '../../hookesLaw.js';
import hookesLawStrings from '../../hookesLawStrings.js';
import HookesLawColors from '../HookesLawColors.js';
import HookesLawConstants from '../HookesLawConstants.js';

// fill in the {1} units, but leave the {0} value alone.
const VALUE_PATTERN = StringUtils.format( hookesLawStrings.pattern[ '0value' ][ '1units' ],
  SunConstants.VALUE_NUMBERED_PLACEHOLDER, hookesLawStrings.meters );

class DisplacementControl extends NumberControl {
  /**
   * @param {BooleanProperty} displacementProperty units = m
   * @param {Range} displacementRange units = m
   * @param {NumberProperty} numberOfInteractionsInProgressProperty - number of interactions in progress that affect displacement
   * @param {Object} [options]
   */
  constructor( displacementProperty, displacementRange, numberOfInteractionsInProgressProperty, options ) {

    options = merge( {

      // NumberControl options
      delta: HookesLawConstants.DISPLACEMENT_TWEAKER_INTERVAL,
      startCallback: () => {
        phet.log && phet.log( '>>>>> DisplacementControl start interaction' );
        numberOfInteractionsInProgressProperty.set( numberOfInteractionsInProgressProperty.get() + 1 );
      },
      endCallback: () => {
        numberOfInteractionsInProgressProperty.set( numberOfInteractionsInProgressProperty.get() - 1 );
        phet.log && phet.log( '>>>>> DisplacementControl end interaction' );
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
        decimalPlaces: HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES,
        valuePattern: VALUE_PATTERN
      },
      arrowButtonOptions: HookesLawConstants.ARROW_BUTTON_OPTIONS,

      // slider options passed in when DisplacementControl is instantiated
      sliderOptions: null,

      // phet-io
      tandem: Tandem.REQUIRED
    }, options );

    // options passed to NumberControl's HSlider subcomponent
    options.sliderOptions = merge( {
      majorTicksValues: null, // {number[]|null} values for major ticks
      minorTickSpacing: 1,
      thumbFill: HookesLawColors.DISPLACEMENT,
      constrainValue: value => {
        // constrain to multiples of a specific interval, see #54
        return Utils.roundToInterval( value, HookesLawConstants.DISPLACEMENT_THUMB_INTERVAL );
      }
    }, options.sliderOptions );

    // major ticks
    if ( options.sliderOptions.majorTickValues ) {
      options.sliderOptions.majorTicks = [];
      for ( let i = 0; i < options.sliderOptions.majorTickValues.length; i++ ) {
        const tickValue = options.sliderOptions.majorTickValues[ i ];
        assert && assert( Number.isInteger( tickValue ), 'not an integer tick: ' + tickValue );
        options.sliderOptions.majorTicks.push( {
          value: tickValue,
          label: new Text( tickValue, HookesLawConstants.MAJOR_TICK_LABEL_OPTIONS )
        } );
      }
    }

    super( hookesLawStrings.displacementColon, displacementProperty, displacementRange, options );
  }
}

hookesLaw.register( 'DisplacementControl', DisplacementControl );

export default DisplacementControl;