// Copyright 2002-2015, University of Colorado Boulder

/**
 * Control for applied force.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowButton = require( 'SCENERY_PHET/buttons/ArrowButton' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var HSlider = require( 'SUN/HSlider' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );
  var ValueDisplay = require( 'HOOKES_LAW/common/view/ValueDisplay' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var appliedForceColonString = require( 'string!HOOKES_LAW/appliedForceColon' );
  var pattern_0value_1units = require( 'string!HOOKES_LAW/pattern.0value.1units' );
  var unitsNewtons = require( 'string!HOOKES_LAW/units.newtons' );

  // constants
  var ARROW_BUTTON_OPTIONS = { /* TODO */ };
  var ARROW_BUTTON_DELTA = 1;
  var MAJOR_TICK_LABEL_OPTIONS = { font: HookesLawConstants.SLIDER_TICK_LABEL_FONT };
  var MINOR_TICK_SPACING = 20;

  /**
   * @param {Property.<number>} appliedForceProperty units = N
   * @param {Range} appliedForceRange
   * @param {Object} [options]
   * @constructor
   */
  function AppliedForceControl( appliedForceProperty, appliedForceRange, options ) {

    options = _.extend( {
      title: appliedForceColonString,
      decimalPlaces: 0,
      spacing: 5
    }, options );

    this.titleNode = new Text( options.title, { font: HookesLawConstants.CONTROL_PANEL_TITLE_FONT } ); // @private

    var valueDisplay = new ValueDisplay( appliedForceProperty, appliedForceRange, unitsNewtons, pattern_0value_1units, {
      font: HookesLawConstants.CONTROL_PANEL_TITLE_FONT
    } );

    var leftArrowButton = new ArrowButton( 'left', function() {
      appliedForceProperty.set( Math.max( appliedForceProperty.get() - ARROW_BUTTON_DELTA, appliedForceRange.min ) );
    }, ARROW_BUTTON_OPTIONS );

    var rightArrowButton = new ArrowButton( 'right', function() {
      appliedForceProperty.set( Math.min( appliedForceProperty.get() + ARROW_BUTTON_DELTA, appliedForceRange.max ) );
    }, ARROW_BUTTON_OPTIONS );

    var slider = new HSlider( appliedForceProperty, appliedForceRange, {
      trackSize: HookesLawConstants.SLIDER_TRACK_SIZE,
      thumbSize: HookesLawConstants.SLIDER_THUMB_SIZE,
      majorTickLength: HookesLawConstants.SLIDER_MAJOR_TICK_LENGTH,
      thumbFillEnabled: HookesLawColors.APPLIED_FORCE_VECTOR,
      thumbFillHighlighted: HookesLawColors.APPLIED_FORCE_VECTOR.brighterColor()
    } );
    slider.addMajorTick( appliedForceRange.min, new Text( Util.toFixed( appliedForceRange.min, options.decimalPlaces ), MAJOR_TICK_LABEL_OPTIONS ) );
    slider.addMajorTick( 0, new Text( Util.toFixed( 0, 0 ), MAJOR_TICK_LABEL_OPTIONS ) );
    slider.addMajorTick( appliedForceRange.max, new Text( Util.toFixed( appliedForceRange.max, options.decimalPlaces ), MAJOR_TICK_LABEL_OPTIONS ) );
    for ( var i = appliedForceRange.min; i < appliedForceRange.max; ) {
      slider.addMinorTick( i );
      i += MINOR_TICK_SPACING;
    }

    options.resize = false; // workaround for slider
    options.children = [
      new HBox( {
        spacing: 5,
        children: [ this.titleNode, valueDisplay ]
      } ),
      new HBox( {
        spacing: 15,
        resize: false,
        children: [ leftArrowButton, slider, rightArrowButton ]
      } )
    ];
    VBox.call( this, options );

    appliedForceProperty.link( function( appliedForce ) {
      leftArrowButton.enabled = ( appliedForce > appliedForceRange.min );
      rightArrowButton.enabled = ( appliedForce < appliedForceRange.max );
    } );
  }

  return inherit( VBox, AppliedForceControl, {

    setTitle: function( title ) {
      this.titleNode.text = title;
    },
    set title( value ) { this.setTitle( value ); },

    getTitle: function() {
      return this.titleNode.text;
    },
    get title() { return this.getTitle(); }
  } );
} );
