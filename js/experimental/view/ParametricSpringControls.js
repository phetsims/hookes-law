// Copyright 2002-2015, University of Colorado Boulder

/**
 * Controls for experimenting with a ParametricSpring.
 * Sliders with 'black' thumbs are parameters that will *not* be dynamically changed in the sim.
 * Sliders with 'red' thumbs are parameters that *will* be dynamically changed in the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberControl = require( 'HOOKES_LAW/common/view/NumberControl' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var VSeparator = require( 'SUN/VSeparator' );

  // strings - no need for i18n since this is a developer-only screen
  var aspectRatioString = 'aspect ratio:';
  var deltaPhaseString = 'delta phase:';
  var lineWidthString = 'line width:';
  var loopsString = "loops:";
  var phaseString = 'phase:';
  var pointsPerLoopString = 'points per loop:';
  var radiusString = 'radius:';
  var xScaleString = 'x scale:';

  // constants
  var CONTROL_FONT = new PhetFont( 22 );
  var TICK_LABEL_FONT = new PhetFont( 14 );

  /**
   * @param {ParametricSpring} spring
   * @param {Object} [options]
   * @constructor
   */
  function ParametricSpringControls( spring, options ) {

    options = _.extend( {
      fill: HookesLawColors.CONTROL_PANEL_FILL,
      stroke: HookesLawColors.CONTROL_PANEL_STROKE,
      xMargin: 20,
      yMargin: 10
    }, options );

    // controls, options tweaked empirically to match ranges
    var loopsControl = createNumberControl( loopsString, spring.loopsProperty, spring.loopsRange, {
      decimalPlaces: 0,
      delta: 1,
      minorTickSpacing: 1,
      thumbFillEnabled: 'black'
    } );
    var pointsPerLoopControl = createNumberControl( pointsPerLoopString, spring.pointsPerLoopProperty, spring.pointsPerLoopRange, {
      decimalPlaces: 0,
      delta: 1,
      minorTickSpacing: 10,
      thumbFillEnabled: 'black'
    } );
    var radiusControl = createNumberControl( radiusString, spring.radiusProperty, spring.radiusRange, {
      decimalPlaces: 0,
      delta: 1,
      minorTickSpacing: 5,
      thumbFillEnabled: 'black'
    } );
    var aspectRatioControl = createNumberControl( aspectRatioString, spring.aspectRatioProperty, spring.aspectRatioRange, {
      decimalPlaces: 1,
      delta: 0.1,
      minorTickSpacing: 0.5,
      thumbFillEnabled: 'black'
    } );
    var phaseControl = createNumberControl( phaseString, spring.phaseProperty, spring.phaseRange, {
      decimalPlaces: 1,
      delta: 0.1,
      minorTickSpacing: 1,
      thumbFillEnabled: 'black'
    } );
    var deltaPhaseControl = createNumberControl( deltaPhaseString, spring.deltaPhaseProperty, spring.deltaPhaseRange, {
      decimalPlaces: 1,
      delta: 0.1,
      minorTickSpacing: 1,
      thumbFillEnabled: 'black'
    } );
    var lineWidthControl = createNumberControl( lineWidthString, spring.lineWidthProperty, spring.lineWidthRange, {
      decimalPlaces: 1,
      delta: 0.1,
      minorTickSpacing: 1,
      thumbFillEnabled: 'red'
    } );
    var xScaleControl = createNumberControl( xScaleString, spring.xScaleProperty, spring.xScaleRange, {
      decimalPlaces: 1,
      delta: 0.1,
      minorTickSpacing: 0.5,
      thumbFillEnabled: 'red'
    } );

    // layout
    var xSpacing = 25;
    var ySpacing = 30;
    var content = new HBox( {
      children: [
        new VBox( { children: [ loopsControl, pointsPerLoopControl ], spacing: ySpacing } ),
        new VBox( { children: [ radiusControl, aspectRatioControl ], spacing: ySpacing } ),
        new VBox( { children: [ phaseControl, deltaPhaseControl ], spacing: ySpacing } ),
        new VSeparator( 225, HookesLawConstants.SEPARATOR_OPTIONS ),
        new VBox( { children: [ lineWidthControl, xScaleControl ], spacing: ySpacing } )
      ],
      spacing: xSpacing,
      align: 'top'
    } );

    Panel.call( this, content, options );
  }

  /**
   * Creates a NumberControl with labeled slider ticks at the min and max values.
   * @param {string} label
   * @param {Property.<number>} property
   * @param {Range} range
   * @param {Object} [options]
   */
  var createNumberControl = function( label, property, range, options ) {

    options = _.extend( {
      titleFont: CONTROL_FONT,
      valueFont: CONTROL_FONT,
      minorTickSpacing: 1,
      decimalPlaces: 0,
      delta: 1
    }, options );
    options.majorTicks = [
      { value: range.min, label: new Text( Util.toFixed( range.min, options.decimalPlaces ), { font: TICK_LABEL_FONT } ) },
      { value: range.max, label: new Text( Util.toFixed( range.max, options.decimalPlaces ), { font: TICK_LABEL_FONT } ) }
    ];

    return new NumberControl( label, property, range, options );
  };

  return inherit( Panel, ParametricSpringControls );
} );
