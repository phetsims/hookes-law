// Copyright 2002-2015, University of Colorado Boulder

/**
 * Controls for the "Experimental" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CheckBox = require( 'SUN/CheckBox' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberControl = require( 'HOOKES_LAW/common/view/NumberControl' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings - no need for i18n since this is a developer-only screen
  var aspectRatioString = 'aspect ratio:';
  var deltaPhaseString = 'delta phase:';
  var lineWidthString = 'line width:';
  var loopsString = "loops:";
  var phaseString = 'phase:';
  var pitchSizeString = 'pitch size:';
  var pointsPerLoopString = 'points per loop:';
  var radiusString = 'radius:';
  var separateFrontAndBackString = 'separate front & back';

  // constants
  var CONTROL_FONT = new PhetFont( 22 );
  var TICK_LABEL_FONT = new PhetFont( 14 );

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

  /**
   * @param {ExperimentalModel} model
   * @param {Object} [options]
   * @constructor
   */
  function ExperimentalControls( model, options ) {

    options = _.extend( {
      fill: 'rgb(240,240,240)',
      xMargin: 35,
      yMargin: 10
    }, options );

    // controls, options tweaked empirically to match ranges
    var loopsControl = createNumberControl( loopsString, model.loopsProperty, model.loopsRange, {
      decimalPlaces: 0,
      delta: 1,
      minorTickSpacing: 1
    } );
    var radiusControl = createNumberControl( radiusString, model.radiusProperty, model.radiusRange, {
      decimalPlaces: 0,
      delta: 1,
      minorTickSpacing: 10
    } );
    var aspectRatioControl = createNumberControl( aspectRatioString, model.aspectRatioProperty, model.aspectRatioRange, {
      decimalPlaces: 1,
      delta: 0.1,
      minorTickSpacing: 0.5
    } );
    var pointsPerLoopControl = createNumberControl( pointsPerLoopString, model.pointsPerLoopProperty, model.pointsPerLoopRange, {
      decimalPlaces: 0,
      delta: 1,
      minorTickSpacing: 10
    } );
    var lineWidthControl = createNumberControl( lineWidthString, model.lineWidthProperty, model.lineWidthRange, {
      decimalPlaces: 1,
      delta: 0.1,
      minorTickSpacing: 1
    } );
    var phaseControl = createNumberControl( phaseString, model.phaseProperty, model.phaseRange, {
      decimalPlaces: 1,
      delta: 0.1,
      minorTickSpacing: 1
    } );
    var deltaPhaseControl = createNumberControl( deltaPhaseString, model.deltaPhaseProperty, model.deltaPhaseRange, {
      decimalPlaces: 1,
      delta: 0.1,
      minorTickSpacing: 1
    } );
    var pitchSizeControl = createNumberControl( pitchSizeString, model.pitchSizeProperty, model.pitchSizeRange, {
      decimalPlaces: 1,
      delta: 0.1,
      minorTickSpacing: 0.1
    } );
    var frontAndBackCheckBox = new CheckBox( new Text( separateFrontAndBackString, { font: CONTROL_FONT } ), model.frontAndBackProperty );

    // layout
    var xSpacing = 40;
    var ySpacing = 30;
    var content = new HBox( {
      children: [
        new VBox( { children: [ loopsControl, radiusControl, aspectRatioControl ], spacing: ySpacing } ),
        new VBox( { children: [ pointsPerLoopControl, lineWidthControl ], spacing: ySpacing } ),
        new VBox( { children: [ phaseControl, deltaPhaseControl ], spacing: ySpacing } ),
        new VBox( { children: [ pitchSizeControl, frontAndBackCheckBox ], spacing: ySpacing } )
      ],
      spacing: xSpacing,
      align: 'top'
    } );

    Panel.call( this, content, options );
  }

  return inherit( Panel, ExperimentalControls );
} );
