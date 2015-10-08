// Copyright 2002-2015, University of Colorado Boulder

/**
 * Control for spring constant (k).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberControl = require( 'SCENERY_PHET/NumberControl' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  // strings
  var newtonsPerMeterString = require( 'string!HOOKES_LAW/newtonsPerMeter' );
  var springConstantString = require( 'string!HOOKES_LAW/springConstant' );

  /**
   * @param {Property.<boolean>} springConstantProperty units = N/m
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
      units: newtonsPerMeterString,
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

  return inherit( NumberControl, SpringConstantControl );
} );
