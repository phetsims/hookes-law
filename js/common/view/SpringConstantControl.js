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
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  // strings
  var unitsNewtonsPerMeter = require( 'string!HOOKES_LAW/units.newtonsPerMeter' );

  // constants
  var MAJOR_TICK_LABEL_OPTIONS = { font: HookesLawConstants.SLIDER_TICK_LABEL_FONT };
  var MINOR_TICK_SPACING = 100;

  /**
   * @param {string} title
   * @param {Property.<boolean>} springConstantProperty
   * @param {Range} springConstantRange
   * @param {Object} [options]
   * @constructor
   */
  function SpringConstantControl( title, springConstantProperty, springConstantRange, options ) {

    var majorTicks = [ {
      value: springConstantRange.min,
      label: new Text( Util.toFixed( springConstantRange.min, HookesLawConstants.SPRING_CONSTANT_DECIMAL_PLACES ), MAJOR_TICK_LABEL_OPTIONS )
    }, {
      value: springConstantRange.max / 2,
      label: new Text( Util.toFixed( springConstantRange.max / 2, HookesLawConstants.SPRING_CONSTANT_DECIMAL_PLACES ), MAJOR_TICK_LABEL_OPTIONS )
    }, {
      value: springConstantRange.max,
      label: new Text( Util.toFixed( springConstantRange.max, HookesLawConstants.SPRING_CONSTANT_DECIMAL_PLACES ), MAJOR_TICK_LABEL_OPTIONS )
    } ];

    options = _.extend( {
      titleFont: HookesLawConstants.CONTROL_PANEL_TITLE_FONT,
      valueFont: HookesLawConstants.CONTROL_PANEL_TITLE_FONT,
      decimalPlaces: HookesLawConstants.SPRING_CONSTANT_DECIMAL_PLACES,
      units: unitsNewtonsPerMeter,
      delta: HookesLawConstants.SPRING_CONSTANT_DELTA,
      majorTicks: majorTicks,
      minorTickSpacing: MINOR_TICK_SPACING,
      thumbFillEnabled: HookesLawColors.TOTAL_SPRING_FORCE
    }, options );

    NumberControl.call( this, title, springConstantProperty, springConstantRange, options );
  }

  return inherit( NumberControl, SpringConstantControl );
} );
