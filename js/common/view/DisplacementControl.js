// Copyright 2015-2018, University of Colorado Boulder

/**
 * Control for spring displacement (x).
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
  var displacementColonString = require( 'string!HOOKES_LAW/displacementColon' );
  var metersString = require( 'string!HOOKES_LAW/meters' );
  var pattern0Value1UnitsString = require( 'string!HOOKES_LAW/pattern.0value.1units' );

  // fill in the {1} units, but leave the {0} value alone.
  var VALUE_PATTERN = StringUtils.format( pattern0Value1UnitsString, '{0}', metersString );

  /**
   * @param {BooleanProperty} displacementProperty units = m
   * @param {Range} displacementRange units = m
   * @param {NumberProperty} numberOfInteractionsInProgressProperty - number of interactions in progress that affect displacement
   * @param {Object} [options]
   * @constructor
   */
  function DisplacementControl( displacementProperty, displacementRange, numberOfInteractionsInProgressProperty, options ) {

    options = _.extend( {
      majorTicksValues: null, // {number[]|null} values for major ticks

      // NumberControl options
      titleMaxWidth: 200, // i18n, determined empirically
      titleFont: HookesLawConstants.CONTROL_PANEL_TITLE_FONT,
      valueMaxWidth: 100, // i18n, determined empirically
      valueFont: HookesLawConstants.CONTROL_PANEL_VALUE_FONT,
      decimalPlaces: HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES,
      valuePattern: VALUE_PATTERN,
      delta: HookesLawConstants.DISPLACEMENT_DELTA,
      minorTickSpacing: 1,
      thumbFillEnabled: HookesLawColors.DISPLACEMENT,
      startCallback: function() {
        phet.log && phet.log( 'DisplacementControl start drag' );
        numberOfInteractionsInProgressProperty.set( numberOfInteractionsInProgressProperty.get() + 1 );
      },
      endCallback: function() {
        numberOfInteractionsInProgressProperty.set( numberOfInteractionsInProgressProperty.get() - 1 );
        phet.log && phet.log( 'DisplacementControl end drag' );
      },
      constrainValue: function( value ) {
        // constrain to multiples of a specific interval, see #54
        return Util.roundToInterval( value, HookesLawConstants.DISPLACEMENT_INTERVAL );
      },

      // phet-io
      tandem: Tandem.required
    }, options );

    // major ticks
    if ( options.majorTickValues ) {
      options.majorTicks = [];
      for ( var i = 0; i < options.majorTickValues.length; i++ ) {
        options.majorTicks.push( {
          value: options.majorTickValues[ i ],
          label: new Text( Util.toFixed( options.majorTickValues[ i ], 0 ), HookesLawConstants.MAJOR_TICK_LABEL_OPTIONS )
        } );
      }
    }

    NumberControl.call( this, displacementColonString, displacementProperty, displacementRange, options );
  }

  hookesLaw.register( 'DisplacementControl', DisplacementControl );

  return inherit( NumberControl, DisplacementControl );
} );
