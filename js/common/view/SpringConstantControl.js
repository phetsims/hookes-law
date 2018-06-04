// Copyright 2015-2017, University of Colorado Boulder

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
      title: springConstantString,
      titleMaxWidth: 200, // i18n, determined empirically
      titleFont: HookesLawConstants.CONTROL_PANEL_TITLE_FONT,
      valueMaxWidth: 100, // i18n, determined empirically
      valueFont: HookesLawConstants.CONTROL_PANEL_VALUE_FONT,
      decimalPlaces: HookesLawConstants.SPRING_CONSTANT_DECIMAL_PLACES,
      valuePattern: VALUE_PATTERN,
      delta: HookesLawConstants.SPRING_CONSTANT_DELTA,
      majorTicksValues: null,
      minorTickSpacing: 100,
      thumbFillEnabled: HookesLawColors.SINGLE_SPRING
    }, options );

    // major ticks
    if ( options.majorTickValues ) {
      options.majorTicks = [];
      for ( var i = 0; i < options.majorTickValues.length; i++ ) {
        options.majorTicks.push( {
          value: options.majorTickValues[ i ],
          label: new Text( Util.toFixed( options.majorTickValues[ i ], HookesLawConstants.SPRING_CONSTANT_DECIMAL_PLACES ), HookesLawConstants.MAJOR_TICK_LABEL_OPTIONS )
        } );
      }
    }

    NumberControl.call( this, options.title, springConstantProperty, springConstantRange, options );
  }

  hookesLaw.register( 'SpringConstantControl', SpringConstantControl );

  return inherit( NumberControl, SpringConstantControl );
} );
