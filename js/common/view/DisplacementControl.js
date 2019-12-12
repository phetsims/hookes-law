// Copyright 2015-2019, University of Colorado Boulder

/**
 * Control for spring displacement (x).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  const HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  const HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const NumberControl = require( 'SCENERY_PHET/NumberControl' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const SunConstants = require( 'SUN/SunConstants' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Util = require( 'DOT/Util' );

  // strings
  const displacementColonString = require( 'string!HOOKES_LAW/displacementColon' );
  const metersString = require( 'string!HOOKES_LAW/meters' );
  const pattern0Value1UnitsString = require( 'string!HOOKES_LAW/pattern.0value.1units' );

  // fill in the {1} units, but leave the {0} value alone.
  const VALUE_PATTERN = StringUtils.format( pattern0Value1UnitsString,
    SunConstants.VALUE_NUMBERED_PLACEHOLDER, metersString );

  /**
   * @param {BooleanProperty} displacementProperty units = m
   * @param {Range} displacementRange units = m
   * @param {NumberProperty} numberOfInteractionsInProgressProperty - number of interactions in progress that affect displacement
   * @param {Object} [options]
   * @constructor
   */
  function DisplacementControl( displacementProperty, displacementRange, numberOfInteractionsInProgressProperty, options ) {

    options = merge( {

      // NumberControl options
      delta: HookesLawConstants.DISPLACEMENT_TWEAKER_INTERVAL,
      startCallback: function() {
        phet.log && phet.log( '>>>>> DisplacementControl start interaction' );
        numberOfInteractionsInProgressProperty.set( numberOfInteractionsInProgressProperty.get() + 1 );
      },
      endCallback: function() {
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
        font: HookesLawConstants.CONTROL_PANEL_VALUE_FONT,
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
      constrainValue: function( value ) {
        // constrain to multiples of a specific interval, see #54
        return Util.roundToInterval( value, HookesLawConstants.DISPLACEMENT_THUMB_INTERVAL );
      }
    }, options.sliderOptions );

    // major ticks
    if ( options.sliderOptions.majorTickValues ) {
      options.sliderOptions.majorTicks = [];
      for ( let i = 0; i < options.sliderOptions.majorTickValues.length; i++ ) {
        const tickValue = options.sliderOptions.majorTickValues[ i ];
        assert && assert( Util.isInteger( tickValue ), 'not an integer tick: ' + tickValue );
        options.sliderOptions.majorTicks.push( {
          value: tickValue,
          label: new Text( tickValue, HookesLawConstants.MAJOR_TICK_LABEL_OPTIONS )
        } );
      }
    }

    NumberControl.call( this, displacementColonString, displacementProperty, displacementRange, options );
  }

  hookesLaw.register( 'DisplacementControl', DisplacementControl );

  return inherit( NumberControl, DisplacementControl );
} );
