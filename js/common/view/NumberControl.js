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
  var Color = require( 'SCENERY/util/Color' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HookesLawFont = require( 'HOOKES_LAW/common/HookesLawFont' );
  var HSlider = require( 'SUN/HSlider' );
  var inherit = require( 'PHET_CORE/inherit' );
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
      // title
      titleFont: new HookesLawFont( 12 ),
      // value
      valueFont: new HookesLawFont( 12 ),
      decimalPlaces: 0,
      units: '',
      // arrow buttons
      delta: 1,
      // slider
      majorTicks: [],
      minorTickSpacing: 1,
      trackSize: new Dimension2( 180, 3 ),
      thumbSize: new Dimension2( 17, 34 ),
      majorTickLength: 20,
      minorTickStroke: 'rgba( 0, 0, 0, 0.3 )',
      thumbFillEnabled: 'green'
    }, options );
    options.thumbFillHighlighted = options.thumbFillHighlighted || Color.toColor( options.thumbFillEnabled ).brighterColor();

    var delta = options.delta; // to improve readability

    var titleNode = new Text( title, { font: options.titleFont } );

    var numberDisplay = new NumberDisplay( numberProperty, numberRange, options.units, pattern_0value_1units, {
      valueFont: options.valueFont,
      decimalPlaces: options.decimalPlaces
    } );

    var leftArrowButton = new ArrowButton( 'left', function() {
      var value = numberProperty.get() - delta;
      value = Math.round( value / delta ) * delta; // constrain to delta
      value = Math.max( value, numberRange.min ); // constrain to range
      numberProperty.set( value );
    }, {
      delta: options.delta
    } );

    var rightArrowButton = new ArrowButton( 'right', function() {
      var value = numberProperty.get() + delta;
      value = Math.round( value / delta ) * delta; // constrain to delta
      value = Math.min( value, numberRange.max ); // constrain to range
      numberProperty.set( value );
    }, {
      delta: options.delta
    } );

    var slider = new HSlider( numberProperty, numberRange, _.extend( {
      constrainValue: function( value ) {
        // constrain to delta
        value = Math.round( value / options.delta ) * options.delta;
        // constrain to range
        return numberRange.constrainValue( value );
      }
    }, options ) );

    // major ticks
    var majorTicks = options.majorTicks;
    for ( var i = 0; i < majorTicks.length; i++ ) {
      slider.addMajorTick( majorTicks[ i ].value, majorTicks[ i ].label );
    }

    // minor ticks, exclude values where we already have major ticks
    for ( var minorTickValue = numberRange.min; minorTickValue <= numberRange.max; ) {
      if ( !_.find( majorTicks, function( majorTick ) { return majorTick.value === minorTickValue; } ) ) {
        slider.addMinorTick( minorTickValue );
      }
      minorTickValue += options.minorTickSpacing;
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
