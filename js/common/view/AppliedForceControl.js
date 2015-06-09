// Copyright 2002-2015, University of Colorado Boulder

/**
 * Control for applied force (F).
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
  var appliedForceColonString = require( 'string!HOOKES_LAW/appliedForceColon' );
  var newtonsString = require( 'string!HOOKES_LAW/newtons' );

  // constants
  var MINOR_TICK_SPACING = 10;

  /**
   * @param {Property.<number>} appliedForceProperty units = N
   * @param {Range} appliedForceRange
   * @param {number} numberOfInteractionsInProgress - number of interactions in progress that affect displacement
   * @param {Object} [options]
   * @constructor
   */
  function AppliedForceControl( appliedForceProperty, appliedForceRange, numberOfInteractionsInProgress, options ) {

    // major ticks
    assert && assert( appliedForceRange.min < 0 && Math.abs( appliedForceRange.min ) === Math.abs( appliedForceRange.max ) ); // range is symmetric
    assert && assert( Util.isInteger( appliedForceRange.max ) && Util.isInteger( appliedForceRange.max / 2 ) ); // major ticks are on integer values
    assert && assert( Util.isInteger( appliedForceRange.max / MINOR_TICK_SPACING ) ); // minor ticks are on integer values
    var majorTicks = [ {
      value: appliedForceRange.min,
      label: new Text( Util.toFixed( appliedForceRange.min, HookesLawConstants.APPLIED_FORCE_DECIMAL_PLACES ), HookesLawConstants.MAJOR_TICK_LABEL_OPTIONS )
    }, {
      value: appliedForceRange.min / 2,
      label: null
    }, {
      value: appliedForceRange.getCenter(),
      label: new Text( Util.toFixed( 0, 0 ), HookesLawConstants.MAJOR_TICK_LABEL_OPTIONS )
    }, {
      value: appliedForceRange.max / 2,
      label: null
    }, {
      value: appliedForceRange.max,
      label: new Text( Util.toFixed( appliedForceRange.max, HookesLawConstants.APPLIED_FORCE_DECIMAL_PLACES ), HookesLawConstants.MAJOR_TICK_LABEL_OPTIONS )
    } ];

    options = _.extend( {
      title: appliedForceColonString,
      titleFont: HookesLawConstants.CONTROL_PANEL_TITLE_FONT,
      valueFont: HookesLawConstants.CONTROL_PANEL_VALUE_FONT,
      decimalPlaces: HookesLawConstants.APPLIED_FORCE_DECIMAL_PLACES,
      units: newtonsString,
      delta: HookesLawConstants.APPLIED_FORCE_DELTA,
      majorTicks: majorTicks,
      minorTickSpacing: MINOR_TICK_SPACING,
      thumbFillEnabled: HookesLawColors.APPLIED_FORCE,
      startCallback: function() { numberOfInteractionsInProgress.set( numberOfInteractionsInProgress.get() + 1 ); },
      endCallback: function() { numberOfInteractionsInProgress.set( numberOfInteractionsInProgress.get() - 1 ); }
    }, options );

    NumberControl.call( this, options.title, appliedForceProperty, appliedForceRange, options );
  }

  return inherit( NumberControl, AppliedForceControl );
} );
