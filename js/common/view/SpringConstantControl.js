// Copyright 2015-2018, University of Colorado Boulder

/**
 * Control for spring constant (k).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberControl = require( 'SCENERY_PHET/NumberControl' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Tandem = require( 'TANDEM/Tandem' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  // strings
  var newtonsPerMeterString = require( 'string!HOOKES_LAW/newtonsPerMeter' );
  var pattern0Value1UnitsString = require( 'string!HOOKES_LAW/pattern.0value.1units' );
  var springConstantString = require( 'string!HOOKES_LAW/springConstant' );

  // fill in the {1} units, but leave the {0} value alone.
  var VALUE_PATTERN = StringUtils.format( pattern0Value1UnitsString, '{0}', newtonsPerMeterString );

  /**
   * @param {BooleanProperty} springConstantProperty units = N/m
   * @param {Range} springConstantRange units = N/m
   * @param {Object} [options]
   * @constructor
   */
  function SpringConstantControl( springConstantProperty, springConstantRange, options ) {

    options = _.extend( {
      majorTicksValues: null, // {number[]|null} values for major ticks

      // NumberControl options
      title: springConstantString,
      titleMaxWidth: 200, // i18n, determined empirically
      titleFont: HookesLawConstants.CONTROL_PANEL_TITLE_FONT,
      valueMaxWidth: 100, // i18n, determined empirically
      valueFont: HookesLawConstants.CONTROL_PANEL_VALUE_FONT,
      decimalPlaces: HookesLawConstants.SPRING_CONSTANT_DECIMAL_PLACES,
      valuePattern: VALUE_PATTERN,
      delta: HookesLawConstants.SPRING_CONSTANT_TWEAKER_INTERVAL,
      minorTickSpacing: 100,
      thumbFillEnabled: HookesLawColors.SINGLE_SPRING,
      startCallback: function() {
        phet.log && phet.log( 'SpringConstantControl start drag' );
      },
      endCallback: function() {
        phet.log && phet.log( 'SpringConstantControl end drag' );
      },
      constrainValue: function( value ) {
        return Util.roundToInterval( value, HookesLawConstants.SPRING_CONSTANT_THUMB_INTERVAL );
      },

      // phet-io
      tandem: Tandem.required
    }, options );

    // major ticks
    if ( options.majorTickValues ) {
      options.majorTicks = [];
      for ( var i = 0; i < options.majorTickValues.length; i++ ) {
        var tickValue = options.majorTickValues[ i ];
        assert && assert( Util.isInteger( tickValue ), 'not an integer tick: ' + tickValue );
        options.majorTicks.push( {
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
