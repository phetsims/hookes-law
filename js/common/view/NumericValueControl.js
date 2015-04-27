// Copyright 2002-2015, University of Colorado Boulder

/**
 * Control for changing a numeric value.
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
  var ValueDisplay = require( 'HOOKES_LAW/common/view/ValueDisplay' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var pattern_0value_1units = require( 'string!HOOKES_LAW/pattern.0value.1units' );

  /**
   * @param {string} title
   * @param {Property.<number>} valueProperty
   * @param {Range} valueRange
   * @param {Object} [options]
   * @constructor
   */
  function NumericValueControl( title, valueProperty, valueRange, options ) {

    options = _.extend( {
      titleOptions: { font: new PhetFont( 12 ) },
      valueOptions: { font: new PhetFont( 12 ), decimalPlaces: 0, units: '' },
      arrowButtonOptions: { delta: 1 },
      sliderOptions: { majorTicks: [], minorTickSpacing: 1 }
    }, options );

    var titleNode = new Text( title, options.titleOptions );

    var valueDisplay = new ValueDisplay( valueProperty, valueRange, options.valueOptions.units, pattern_0value_1units, options.valueOptions );

    var leftArrowButton = new ArrowButton( 'left', function() {
      valueProperty.set( Math.max( valueProperty.get() - options.arrowButtonOptions.delta, valueRange.min ) );
    }, options.arrowButtonOptions );

    var rightArrowButton = new ArrowButton( 'right', function() {
      valueProperty.set( Math.min( valueProperty.get() + options.arrowButtonOptions.delta, valueRange.max ) );
    }, options.arrowButtonOptions );

    var slider = new HSlider( valueProperty, valueRange, options.sliderOptions );

    // major ticks
    var majorTicks = options.sliderOptions.majorTicks;
    for ( var i = 0; i < majorTicks.length; i++ ) {
      slider.addMajorTick( majorTicks[ i ].value, majorTicks[ i ].label );
    }

    // minor ticks, exclude values where we already have major ticks
    for ( var minorTickValue = valueRange.min; minorTickValue <= valueRange.max; ) {
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
        children: [ titleNode, valueDisplay ]
      } ),
      new HBox( {
        spacing: 15,
        resize: false,
        children: [ leftArrowButton, slider, rightArrowButton ]
      } )
    ];
    VBox.call( this, options );

    valueProperty.link( function( value ) {
      leftArrowButton.enabled = ( value > valueRange.min );
      rightArrowButton.enabled = ( value < valueRange.max );
    } );
  }

  return inherit( VBox, NumericValueControl );
} );
