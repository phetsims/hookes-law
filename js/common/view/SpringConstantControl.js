// Copyright 2002-2015, University of Colorado Boulder

/**
 * Control for spring constant.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberControl = require( 'HOOKES_LAW/common/view/NumberControl' );

  // strings
  var unitsNewtonsPerMeter = require( 'string!HOOKES_LAW/units.newtonsPerMeter' );

  /**
   * @param {string} title
   * @param {Property.<boolean>} springConstantProperty
   * @param {Range} springConstantRange
   * @param {Object} [options]
   * @constructor
   */
  function SpringConstantControl( title, springConstantProperty, springConstantRange, options ) {

    options = _.extend( {
      titleFont: HookesLawConstants.CONTROL_PANEL_TITLE_FONT,
      valueFont: HookesLawConstants.CONTROL_PANEL_TITLE_FONT,
      decimalPlaces: HookesLawConstants.SPRING_CONSTANT_DECIMAL_PLACES,
      units: unitsNewtonsPerMeter,
      delta: HookesLawConstants.SPRING_CONSTANT_DELTA,
      majorTicks: [],
      minorTickSpacing: 100,
      thumbFillEnabled: HookesLawColors.TOTAL_SPRING_FORCE
    }, options );

    NumberControl.call( this, title, springConstantProperty, springConstantRange, options );
  }

  return inherit( NumberControl, SpringConstantControl );
} );
