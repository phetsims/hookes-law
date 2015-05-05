// Copyright 2002-2015, University of Colorado Boulder

/**
 * Control for changing a Property of type {number}.
 * Consists of a labeled value, slider and arrow buttons.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowButton = require( 'SCENERY_PHET/buttons/ArrowButton' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HSlider = require( 'SUN/HSlider' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var NumberDisplay = require( 'HOOKES_LAW/common/view/NumberDisplay' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var pattern_0value_1units = require( 'string!HOOKES_LAW/pattern.0value.1units' );

  /**
   * @param {string} title
   * @param {Property.<number>} numberProperty
   * @param {Range} numberRange
   * @param {Object} [options]
   * @constructor
   */
  function NumberControl( title, numberProperty, numberRange, options ) {

    options = _.extend( {
      titleOptions: { font: new PhetFont( 12 ) },
      valueOptions: { font: new PhetFont( 12 ), decimalPlaces: 0, units: '' },
      arrowButtonOptions: { delta: 1 },
      sliderOptions: { majorTicks: [], minorTickSpacing: 1 }
    }, options );

    var titleNode = new Text( title, options.titleOptions );

    var numberDisplay = new NumberDisplay( numberProperty, numberRange, options.valueOptions.units, pattern_0value_1units, options.valueOptions );

    var leftArrowButton = new ArrowButton( 'left', function() {
      numberProperty.set( Math.max( numberProperty.get() - options.arrowButtonOptions.delta, numberRange.min ) );
    }, options.arrowButtonOptions );

    var rightArrowButton = new ArrowButton( 'right', function() {
      numberProperty.set( Math.min( numberProperty.get() + options.arrowButtonOptions.delta, numberRange.max ) );
    }, options.arrowButtonOptions );

    var slider = new HSlider( numberProperty, numberRange, options.sliderOptions );

    // major ticks
    var majorTicks = options.sliderOptions.majorTicks;
    for ( var i = 0; i < majorTicks.length; i++ ) {
      slider.addMajorTick( majorTicks[ i ].value, majorTicks[ i ].label );
    }

    // minor ticks, exclude values where we already have major ticks
    for ( var minorTickValue = numberRange.min; minorTickValue <= numberRange.max; ) {
      if ( ! _.find( majorTicks, function( majorTick) { return majorTick.value === minorTickValue; } ) ) {
        slider.addMinorTick( minorTickValue );
      }
      minorTickValue += options.sliderOptions.minorTickSpacing;
    }

    options.spacing = 5;
    options.resize = false; // workaround for slider
    options.children = [
      new HBox( {
        spacing: 5,
        children: [ titleNode, numberDisplay ]
      } ),
      new HBox( {
        spacing: 15,
        resize: false,
        children: [ leftArrowButton, slider, rightArrowButton ]
      } )
    ];
    VBox.call( this, options );

    numberProperty.link( function( value ) {
      leftArrowButton.enabled = ( value > numberRange.min );
      rightArrowButton.enabled = ( value < numberRange.max );
    } );
  }

  return inherit( VBox, NumberControl );
} );
