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
  var NumericValueControl = require( 'HOOKES_LAW/common/view/NumericValueControl' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  // strings
  var springConstantColonString = require( 'string!HOOKES_LAW/springConstantColon' );
  var unitsNewtonsPerMeter = require( 'string!HOOKES_LAW/units.newtonsPerMeter' );

  // constants
  var MAJOR_TICK_LABEL_OPTIONS = { font: HookesLawConstants.SLIDER_TICK_LABEL_FONT };
  var MINOR_TICK_SPACING = 100;

  /**
   * @param {Property.<boolean>} springConstantProperty
   * @param {Range} springConstantRange
   * @param {Object} [options]
   * @constructor
   */
  function SpringConstantControl( springConstantProperty, springConstantRange, options ) {

    var majorTicks = [
      { value: springConstantRange.min, label: new Text( Util.toFixed( springConstantRange.min, HookesLawConstants.SPRING_FORCE_DECIMAL_PLACES ), MAJOR_TICK_LABEL_OPTIONS ) },
      { value: springConstantRange.max / 2, label: new Text( Util.toFixed( springConstantRange.max / 2, HookesLawConstants.SPRING_FORCE_DECIMAL_PLACES ), MAJOR_TICK_LABEL_OPTIONS ) },
      { value: springConstantRange.max, label: new Text( Util.toFixed( springConstantRange.max, HookesLawConstants.SPRING_FORCE_DECIMAL_PLACES ), MAJOR_TICK_LABEL_OPTIONS ) }
    ];

    options = _.extend( {
      titleOptions: {
        font: HookesLawConstants.CONTROL_PANEL_TITLE_FONT
      },
      valueOptions: {
        font: HookesLawConstants.CONTROL_PANEL_TITLE_FONT,
        decimalPlaces: HookesLawConstants.SPRING_FORCE_DECIMAL_PLACES,
        units: unitsNewtonsPerMeter
      },
      arrowButtonOptions: {
        delta: HookesLawConstants.SPRING_FORCE_DELTA
      },
      sliderOptions: {
        majorTicks: majorTicks,
        minorTickSpacing: MINOR_TICK_SPACING,
        trackSize: HookesLawConstants.SLIDER_TRACK_SIZE,
        thumbSize: HookesLawConstants.SLIDER_THUMB_SIZE,
        majorTickLength: HookesLawConstants.SLIDER_MAJOR_TICK_LENGTH,
        minorTickStroke: 'rgba( 0, 0, 0, 0.3 )',
        thumbFillEnabled: HookesLawColors.SPRING_FORCE_VECTOR,
        thumbFillHighlighted: HookesLawColors.SPRING_FORCE_VECTOR.brighterColor()
      }
    }, options );

    NumericValueControl.call( this, springConstantColonString, springConstantProperty, springConstantRange, options );
  }

  return inherit( NumericValueControl, SpringConstantControl );
} );
