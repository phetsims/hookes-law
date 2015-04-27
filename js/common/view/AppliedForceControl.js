// Copyright 2002-2015, University of Colorado Boulder

/**
 * Control for applied force.
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
  var appliedForceColonString = require( 'string!HOOKES_LAW/appliedForceColon' );
  var unitsNewtons = require( 'string!HOOKES_LAW/units.newtons' );

  // constants
  var MAJOR_TICK_LABEL_OPTIONS = { font: HookesLawConstants.SLIDER_TICK_LABEL_FONT };
  var MINOR_TICK_SPACING = 10;

  /**
   * @param {Property.<number>} appliedForceProperty units = N
   * @param {Range} appliedForceRange
   * @param {Object} [options]
   * @constructor
   */
  function AppliedForceControl( appliedForceProperty, appliedForceRange, options ) {

    // major ticks
    assert && assert( appliedForceRange.min < 0 && Math.abs( appliedForceRange.min ) === Math.abs( appliedForceRange.max ) ); // range is symmetric
    assert && assert( Util.isInteger( appliedForceRange.max ) && Util.isInteger( appliedForceRange.max / 2 ) ); // major ticks are on integer values
    assert && assert( Util.isInteger( appliedForceRange.max / MINOR_TICK_SPACING ) ); // minor ticks are on integer values
    var majorTicks = [
      { value: appliedForceRange.min, label: new Text( Util.toFixed( appliedForceRange.min, HookesLawConstants.APPLIED_FORCE_DECIMAL_PLACES ), MAJOR_TICK_LABEL_OPTIONS ) },
      { value: appliedForceRange.min / 2, label: null },
      { value: 0, label: new Text( Util.toFixed( 0, 0 ), MAJOR_TICK_LABEL_OPTIONS ) },
      { value: appliedForceRange.max / 2, label: null },
      { value:  appliedForceRange.max, label: new Text( Util.toFixed( appliedForceRange.max, HookesLawConstants.APPLIED_FORCE_DECIMAL_PLACES ), MAJOR_TICK_LABEL_OPTIONS ) }
    ];

    options = _.extend( {
      titleOptions: {
        font: HookesLawConstants.CONTROL_PANEL_TITLE_FONT
      },
      valueOptions: {
        font: HookesLawConstants.CONTROL_PANEL_TITLE_FONT,
        decimalPlaces: HookesLawConstants.APPLIED_FORCE_DECIMAL_PLACES,
        units: unitsNewtons
      },
      arrowButtonOptions: {
        delta: HookesLawConstants.APPLIED_FORCE_DELTA
      },
      sliderOptions: {
        majorTicks: majorTicks,
        minorTickSpacing: MINOR_TICK_SPACING,
        trackSize: HookesLawConstants.SLIDER_TRACK_SIZE,
        thumbSize: HookesLawConstants.SLIDER_THUMB_SIZE,
        majorTickLength: HookesLawConstants.SLIDER_MAJOR_TICK_LENGTH,
        minorTickStroke: 'rgba( 0, 0, 0, 0.3 )',
        thumbFillEnabled: HookesLawColors.APPLIED_FORCE_VECTOR,
        thumbFillHighlighted: HookesLawColors.APPLIED_FORCE_VECTOR.brighterColor()
      }
    }, options );

    NumericValueControl.call( this, appliedForceColonString, appliedForceProperty, appliedForceRange, options );
  }

  return inherit( NumericValueControl, AppliedForceControl );
} );
