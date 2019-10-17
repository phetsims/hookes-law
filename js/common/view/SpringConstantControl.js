// Copyright 2015-2019, University of Colorado Boulder

/**
 * Control for spring constant (k).
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
  const newtonsPerMeterString = require( 'string!HOOKES_LAW/newtonsPerMeter' );
  const pattern0Value1UnitsString = require( 'string!HOOKES_LAW/pattern.0value.1units' );
  const springConstantString = require( 'string!HOOKES_LAW/springConstant' );

  // fill in the {1} units, but leave the {0} value alone.
  const VALUE_PATTERN = StringUtils.format( pattern0Value1UnitsString,
    SunConstants.VALUE_NUMBERED_PLACEHOLDER, newtonsPerMeterString );

  /**
   * @param {BooleanProperty} springConstantProperty units = N/m
   * @param {Range} springConstantRange units = N/m
   * @param {Object} [options]
   * @constructor
   */
  function SpringConstantControl( springConstantProperty, springConstantRange, options ) {

    options = merge( {
      title: springConstantString,
      
      // NumberControl options
      delta: HookesLawConstants.SPRING_CONSTANT_TWEAKER_INTERVAL,
      startCallback: function() {
        phet.log && phet.log( '>>>>> SpringConstantControl start interaction' );
      },
      endCallback: function() {
        phet.log && phet.log( '>>>>> SpringConstantControl end interaction' );
      },
      titleNodeOptions: {
        maxWidth: 200, // i18n, determined empirically
        font: HookesLawConstants.CONTROL_PANEL_TITLE_FONT
      },
      numberDisplayOptions: {
        maxWidth: 100, // i18n, determined empirically
        font: HookesLawConstants.CONTROL_PANEL_VALUE_FONT,
        decimalPlaces: HookesLawConstants.SPRING_CONSTANT_DECIMAL_PLACES,
        valuePattern: VALUE_PATTERN
      },
      arrowButtonOptions: HookesLawConstants.ARROW_BUTTON_OPTIONS,

      // slider options passed when control is initialized
      sliderOptions: null,

      // phet-io
      tandem: Tandem.required
    }, options );

    // sldier option defaults
    options.sliderOptions = merge( {
      majorTicksValues: null, // {number[]|null} values for major ticks
      minorTickSpacing: 100,
      thumbFill: HookesLawColors.SINGLE_SPRING,
      constrainValue: function( value ) {
        return Util.roundToInterval( value, HookesLawConstants.SPRING_CONSTANT_THUMB_INTERVAL );
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

    NumberControl.call( this, options.title, springConstantProperty, springConstantRange, options );
  }

  hookesLaw.register( 'SpringConstantControl', SpringConstantControl );

  return inherit( NumberControl, SpringConstantControl );
} );
