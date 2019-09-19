// Copyright 2015-2019, University of Colorado Boulder

/**
 * Control for applied force (F).
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
  const NumberControl = require( 'SCENERY_PHET/NumberControl' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const SunConstants = require( 'SUN/SunConstants' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Util = require( 'DOT/Util' );

  // strings
  const appliedForceColonString = require( 'string!HOOKES_LAW/appliedForceColon' );
  const newtonsString = require( 'string!HOOKES_LAW/newtons' );
  const pattern0Value1UnitsString = require( 'string!HOOKES_LAW/pattern.0value.1units' );

  // fill in the {1} units, but leave the {0} value alone.
  var VALUE_PATTERN = StringUtils.format( pattern0Value1UnitsString,
    SunConstants.VALUE_NUMBERED_PLACEHOLDER, newtonsString );

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
      label: new Text( appliedForceRange.min, HookesLawConstants.MAJOR_TICK_LABEL_OPTIONS )
    }, {
      value: appliedForceRange.min / 2,
      label: null
    }, {
      value: appliedForceRange.getCenter(),
      label: new Text( 0, HookesLawConstants.MAJOR_TICK_LABEL_OPTIONS )
    }, {
      value: appliedForceRange.max / 2,
      label: null
    }, {
      value: appliedForceRange.max,
      label: new Text( appliedForceRange.max, HookesLawConstants.MAJOR_TICK_LABEL_OPTIONS )
    } ];

    options = _.extend( {
      title: appliedForceColonString,

      // NumberControl options
      delta: HookesLawConstants.APPLIED_FORCE_TWEAKER_INTERVAL,
      startCallback: function() {
        phet.log && phet.log( '>>>>> AppliedForceControl start interaction' );
        numberOfInteractionsInProgressProperty.set( numberOfInteractionsInProgressProperty.get() + 1 );
      },
      endCallback: function() {
        numberOfInteractionsInProgressProperty.set( numberOfInteractionsInProgressProperty.get() - 1 );
        phet.log && phet.log( '>>>>> AppliedForceControl end interaction' );
      },

      // options passed to subcomponents
      titleNodeOptions: {
        maxWidth: 200, // i18n, determined empirically
        font: HookesLawConstants.CONTROL_PANEL_TITLE_FONT
      },
      numberDisplayOptions: {
        maxWidth: 100, // i18n, determined empirically
        font: HookesLawConstants.CONTROL_PANEL_VALUE_FONT,
        decimalPlaces: HookesLawConstants.APPLIED_FORCE_DECIMAL_PLACES,
        valuePattern: VALUE_PATTERN
      },
      sliderOptions: {
        majorTicks: majorTicks,
        minorTickSpacing: MINOR_TICK_SPACING,
        thumbFill: HookesLawColors.APPLIED_FORCE,
        constrainValue: function( value ) {
          return Util.roundToInterval( value, HookesLawConstants.APPLIED_FORCE_THUMB_INTERVAL );
        }
      },
      arrowButtonOptions: HookesLawConstants.ARROW_BUTTON_OPTIONS,

      // phet-io
      tandem: Tandem.required
    }, options );

    NumberControl.call( this, options.title, appliedForceProperty, appliedForceRange, options );
  }

  hookesLaw.register( 'AppliedForceControl', AppliedForceControl );

  return inherit( NumberControl, AppliedForceControl );
} );
