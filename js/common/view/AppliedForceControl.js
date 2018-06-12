// Copyright 2015-2018, University of Colorado Boulder

/**
 * Control for applied force (F).
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
  var appliedForceColonString = require( 'string!HOOKES_LAW/appliedForceColon' );
  var newtonsString = require( 'string!HOOKES_LAW/newtons' );
  var pattern0Value1UnitsString = require( 'string!HOOKES_LAW/pattern.0value.1units' );

  // fill in the {1} units, but leave the {0} value alone.
  var VALUE_PATTERN = StringUtils.format( pattern0Value1UnitsString, '{0}', newtonsString );

  // constants
  var MINOR_TICK_SPACING = 10;

  /**
   * @param {NumberProperty} appliedForceProperty units = N
   * @param {Range} appliedForceRange
   * @param {NumberProperty} numberOfInteractionsInProgressProperty - number of interactions in progress that affect displacement
   * @param {Object} [options]
   * @constructor
   */
  function AppliedForceControl( appliedForceProperty, appliedForceRange, numberOfInteractionsInProgressProperty, options ) {

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

      // NumberControl options
      title: appliedForceColonString,
      titleMaxWidth: 200, // i18n, determined empirically
      titleFont: HookesLawConstants.CONTROL_PANEL_TITLE_FONT,
      valueMaxWidth: 100, // i18n, determined empirically
      valueFont: HookesLawConstants.CONTROL_PANEL_VALUE_FONT,
      decimalPlaces: HookesLawConstants.APPLIED_FORCE_DECIMAL_PLACES,
      valuePattern: VALUE_PATTERN,
      delta: HookesLawConstants.APPLIED_FORCE_DELTA,
      majorTicks: majorTicks,
      minorTickSpacing: MINOR_TICK_SPACING,
      thumbFillEnabled: HookesLawColors.APPLIED_FORCE,
      startCallback: function() { numberOfInteractionsInProgressProperty.set( numberOfInteractionsInProgressProperty.get() + 1 ); },
      endCallback: function() { numberOfInteractionsInProgressProperty.set( numberOfInteractionsInProgressProperty.get() - 1 ); },

      // phet-io
      tandem: Tandem.required
    }, options );

    NumberControl.call( this, options.title, appliedForceProperty, appliedForceRange, options );
  }

  hookesLaw.register( 'AppliedForceControl', AppliedForceControl );

  return inherit( NumberControl, AppliedForceControl );
} );
