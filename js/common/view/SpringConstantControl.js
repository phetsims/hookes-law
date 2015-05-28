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
      majorTicksValues: null,
      minorTickSpacing: 100,
      thumbFillEnabled: HookesLawColors.TOTAL_SPRING_FORCE
    }, options );

    // major ticks
    if ( options.majorTickValues ) {
      options.majorTicks = [];
      for ( var i = 0; i < options.majorTickValues.length; i++ ) {
        options.majorTicks.push( {
          value: options.majorTickValues[ i ],
          label: new Text( Util.toFixed( options.majorTickValues[ i ], HookesLawConstants.SPRING_CONSTANT_DECIMAL_PLACES ), MAJOR_TICK_LABEL_OPTIONS )
        } );
      }
    }

    NumberControl.call( this, title, springConstantProperty, springConstantRange, options );
  }

  return inherit( NumberControl, SpringConstantControl );
} );
