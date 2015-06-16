// Copyright 2002-2015, University of Colorado Boulder

/**
 * Controls for the "Experimental" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var HBox = require( 'SCENERY/nodes/HBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberControl = require( 'HOOKES_LAW/common/view/NumberControl' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // constants
  var CONTROL_FONT = new PhetFont( 16 );
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
      majorTicks: [
        { value: range.min, label: new Text( range.min, { font: TICK_LABEL_FONT } ) },
        { value: range.max, label: new Text( range.max, { font: TICK_LABEL_FONT } ) }
      ],
      minorTickSpacing: 1,
      decimalPlaces: 0,
      delta: 1
    }, options );

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

    // controls
    var radiusControl = createNumberControl( 'radius:', model.radiusProperty, model.radiusRange, {
      decimalPlaces: 0,
      delta: 1,
      minorTickSpacing: 5
    } );
    var aspectRatioControl = createNumberControl( 'aspect ratio:', model.aspectRatioProperty, model.aspectRatioRange, {
      decimalPlaces: 2,
      delta: 0.01,
      minorTickSpacing: 0.5
    } );
    var pointsPerLoopControl = createNumberControl( 'points per loop:', model.pointsPerLoopProperty, model.pointsPerLoopRange, {
      decimalPlaces: 0,
      delta: 1,
      minorTickSpacing: 10
    } );
    var lineWidthControl = createNumberControl( 'line width:', model.lineWidthProperty, model.lineWidthRange, {
      decimalPlaces: 1,
      delta: 0.1,
      minorTickSpacing: 1
    } );
    var phaseControl = createNumberControl( 'phase:', model.phaseProperty, model.phaseRange, {
      decimalPlaces: 1,
      delta: 0.1,
      minorTickSpacing: 1
    } );
    var deltaPhaseControl = createNumberControl( 'delta phase:', model.deltaPhaseProperty, model.deltaPhaseRange, {
      decimalPlaces: 2,
      delta: 0.1,
      minorTickSpacing: 1
    } );
    var pitchSizeControl = createNumberControl( 'pitch size:', model.pitchSizeProperty, model.pitchSizeRange, {
      decimalPlaces: 2,
      delta: 0.01,
      minorTickSpacing: 0.1
    } );

    // layout
    var xSpacing = 40;
    var ySpacing = 30;
    var content = new HBox( {
      children: [
        new VBox( { children: [ radiusControl, aspectRatioControl ], spacing: ySpacing } ),
        new VBox( { children: [ pointsPerLoopControl, lineWidthControl ], spacing: ySpacing } ),
        new VBox( { children: [ phaseControl, deltaPhaseControl ], spacing: ySpacing } ),
        new VBox( { children: [ pitchSizeControl ], spacing: ySpacing } )
      ],
      spacing: xSpacing,
      align: 'top'
    } );

    Panel.call( this, content, options );
  }

  return inherit( Panel, ExperimentalControls );
} );
