// Copyright 2002-2015, University of Colorado Boulder

/**
 * Control panel for changing applied force.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowButton = require( 'SCENERY_PHET/buttons/ArrowButton' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawFont = require( 'HOOKES_LAW/common/HookesLawFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var Text = require( 'SCENERY/nodes/Text' );
  var ValueDisplay = require( 'HOOKES_LAW/common/view/ValueDisplay' );

  // strings
  var appliedForceColonString = require( 'string!HOOKES_LAW/appliedForceColon' );
  var pattern_0value_1units = require( 'string!HOOKES_LAW/pattern.0value.1units' );
  var unitsNewtons = require( 'string!HOOKES_LAW/units.newtons' );

  // constants
  var ARROW_BUTTON_OPTIONS = { /* TODO */ };
  var ARROW_BUTTON_DELTA = 1;

  /**
   * @param {Property.<number>} appliedForceProperty units = N
   * @param {Range} appliedForceRange
   * @param {Object} [options]
   * @constructor
   */
  function AppliedForceControlPanel( appliedForceProperty, appliedForceRange, options ) {

    options = _.extend( {
      fill: HookesLawColors.CONTROL_PANEL_FILL,
      xMargin: 15,
      yMargin: 15
    }, options );

    var titleNode = new Text( appliedForceColonString, { font: new HookesLawFont( 24 ) } );

    var leftArrowButton = new ArrowButton( 'left', function() {
      appliedForceProperty.set( Math.max( appliedForceProperty.get() - ARROW_BUTTON_DELTA, appliedForceRange.min ) );
    }, ARROW_BUTTON_OPTIONS );

    var rightArrowButton = new ArrowButton( 'right', function() {
      appliedForceProperty.set( Math.min( appliedForceProperty.get() + ARROW_BUTTON_DELTA, appliedForceRange.max ) );
    }, ARROW_BUTTON_OPTIONS );

    var valueDisplay = new ValueDisplay( appliedForceProperty, appliedForceRange, unitsNewtons, pattern_0value_1units );

    //TODO HSlider

    var content = new HBox( {
      children: [
        titleNode,
        valueDisplay,
        leftArrowButton,
        rightArrowButton
      ],
      spacing: 15
    } );

    Panel.call( this, content, options );

    appliedForceProperty.link( function( appliedForce ) {
      leftArrowButton.enabled = ( appliedForce > appliedForceRange.min );
      rightArrowButton.enabled = ( appliedForce < appliedForceRange.max );
    } );
  }

  return inherit( Panel, AppliedForceControlPanel );
} );
