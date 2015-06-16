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
  var ExperimentalControls = require( 'HOOKES_LAW/experimental/view/ExperimentalControls' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ParametricSpringNode = require( 'HOOKES_LAW/experimental/view/ParametricSpringNode' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var WallNode = require( 'HOOKES_LAW/common/view/WallNode' );

  /**
   * @param {ExperimentalModel} model
   * @constructor
   */
  function ExperimentalView( model ) {

    ScreenView.call( this, HookesLawConstants.SCREEN_VIEW_OPTIONS );

    // control panel, scaled to fit
    var controls = new ExperimentalControls( model );
    this.addChild( controls );
    controls.setScaleMagnitude( Math.min( 1, this.layoutBounds.width / controls.width ) );
    controls.top = 0;
    controls.centerX = this.layoutBounds.centerX;

    // spring
    var springNode = new ParametricSpringNode( model, {
      left: 50,
      centerY: 375
    } );
    this.addChild( springNode );

    // A 100-unit vertical "wall", for comparison with the spring size
    this.addChild( new WallNode( new Dimension2( 25, 100 ), {
      left: 10,
      centerY: springNode.centerY
    } ) );

    // Reset All button, bottom right
    this.addChild( new ResetAllButton( {
      listener: function() {
        model.reset();
      },
      right: this.layoutBounds.maxX - 15,
      bottom: this.layoutBounds.maxY - 15
    } ) );
  }

  return inherit( ScreenView, ExperimentalView );
} );