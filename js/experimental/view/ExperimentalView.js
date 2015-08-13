// Copyright 2002-2015, University of Colorado Boulder

/**
 * View for the "Experimental" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var HookesLawQueryParameters = require( 'HOOKES_LAW/common/HookesLawQueryParameters' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ParametricSpringControls = require( 'HOOKES_LAW/experimental/view/ParametricSpringControls' );
  var ParametricSpringNode = require( 'HOOKES_LAW/common/view/ParametricSpringNode' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var WallNode = require( 'HOOKES_LAW/common/view/WallNode' );

  /**
   * @param {ExperimentalModel} model
   * @constructor
   */
  function ExperimentalView( model ) {

    ScreenView.call( this, HookesLawConstants.SCREEN_VIEW_OPTIONS );

    // A 100-unit vertical "wall", for comparison with the spring size
    var wallNode = new WallNode( new Dimension2( 25, 100 ), {
      left: 20,
      centerY: 375
    } );

    // spring
    var springNode = new ParametricSpringNode( {

      // initial values for Properties
      loops: model.loopsRange.defaultValue,
      radius: model.radiusRange.defaultValue,
      aspectRatio: model.aspectRatioRange.defaultValue,
      pointsPerLoop: model.pointsPerLoopRange.defaultValue,
      lineWidth: model.lineWidthRange.defaultValue,
      phase: model.phaseRange.defaultValue,
      deltaPhase: model.deltaPhaseRange.defaultValue,
      xScale: model.xScaleRange.defaultValue,

      // initial values for static fields
      frontColor: HookesLawQueryParameters.FRONT_COLOR,
      middleColor: HookesLawQueryParameters.MIDDLE_COLOR,
      backColor: HookesLawQueryParameters.BACK_COLOR,

      // use x,y exclusively for layout, because we're using boundsMethod:'none'
      x: wallNode.right,
      y: wallNode.centerY
    } );

    // control panel, scaled to fit
    var controls = new ParametricSpringControls( model, springNode );
    controls.setScaleMagnitude( Math.min( 1, this.layoutBounds.width / controls.width ) );
    controls.top = 0;
    controls.centerX = this.layoutBounds.centerX;

    this.addChild( controls );
    this.addChild( springNode );
    this.addChild( wallNode );

    // Reset All button, bottom right
    this.addChild( new ResetAllButton( {
      listener: function() {
        springNode.reset();
      },
      right: this.layoutBounds.maxX - 15,
      bottom: this.layoutBounds.maxY - 15
    } ) );
  }

  return inherit( ScreenView, ExperimentalView );
} );
