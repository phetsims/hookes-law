// Copyright 2002-2015, University of Colorado Boulder

/**
 * View for the "Intro" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var IntroSceneControl = require( 'HOOKES_LAW/intro/view/IntroSceneControl' );
  var IntroSystemNode = require( 'HOOKES_LAW/intro/view/IntroSystemNode' );
  var IntroViewProperties = require( 'HOOKES_LAW/intro/view/IntroViewProperties' );
  var IntroVisibilityControls = require( 'HOOKES_LAW/intro/view/IntroVisibilityControls' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );

  /**
   * @param {IntroModel} model
   * @constructor
   */
  function IntroView( model ) {

    var thisView = this;
    ScreenView.call( this, HookesLawConstants.SCREEN_VIEW_OPTIONS );

    // View length of 1 meter of displacement
    var unitDisplacementLength = HookesLawConstants.UNIT_DISPLACEMENT_X;

    // Properties that are specific to the view
    var viewProperties = new IntroViewProperties();

    // Visibility controls
    var visibilityControls = new IntroVisibilityControls( viewProperties, {
      top: this.layoutBounds.top + 10,
      right: this.layoutBounds.right - 10,
      maxWidth: 250 // constrain width for i18n, determining empirically
    } );
    this.addChild( visibilityControls );

    // Control for switching between 1 and 2 systems
    var sceneControl = new IntroSceneControl( viewProperties.numberOfSystemsProperty, {
      centerX: visibilityControls.centerX,
      top: visibilityControls.bottom + 10
    } );
    this.addChild( sceneControl );

    // System 1
    var system1Node = new IntroSystemNode( model.system1, viewProperties, {
      unitDisplacementLength: unitDisplacementLength,
      number: 1,
      left: this.layoutBounds.left + 15, //careful! position this so that max applied force vector doesn't go offscreen or overlap control panel
      centerY: ( viewProperties.numberOfSystemsProperty.get() === 1 ) ? this.layoutBounds.centerY : ( 0.25 * this.layoutBounds.height )
    } );
    this.addChild( system1Node );
    assert && assert( system1Node.height <= this.layoutBounds.height / 2, 'system1Node is taller than the space available for it' );

    // System 2
    var system2Node = new IntroSystemNode( model.system2, viewProperties, {
      unitDisplacementLength: unitDisplacementLength,
      number: 2,
      left: system1Node.left,
      centerY: 0.75 * this.layoutBounds.height,
      visible: ( viewProperties.numberOfSystemsProperty.get() === 2 )
    } );
    this.addChild( system2Node );
    assert && assert( system2Node.height <= this.layoutBounds.height / 2, 'system2Node is taller than the space available for it' );

    // Reset All button, bottom right
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
        viewProperties.reset();
      },
      right: this.layoutBounds.maxX - 15,
      bottom: this.layoutBounds.maxY - 15
    } );
    this.addChild( resetAllButton );

    viewProperties.numberOfSystemsProperty.lazyLink( function( numberOfSystems ) {

      assert && assert( numberOfSystems === 1 || numberOfSystems === 2 );

      // animate system 1 into position
      var tweenPosition, tweenOpacity, tweenParameters;
      if ( numberOfSystems === 1 ) {
        tweenParameters = { y: system1Node.centerY, opacity: 1 };
        // fade out system 2
        tweenOpacity = new TWEEN.Tween( tweenParameters )
          .to( { opacity: 0 }, 500 )
          .onUpdate( function() { system2Node.opacity = tweenParameters.opacity; } )
          .onComplete( function() {
            system2Node.visible = false;
            system2Node.opacity = 1;
            tweenPosition.start();
          } );
        // move system 1 to center of screen
        tweenPosition = new TWEEN.Tween( tweenParameters )
          .to( { y: thisView.layoutBounds.centerY }, 500 )
          .onUpdate( function() { system1Node.centerY = tweenParameters.y; } );
        tweenOpacity.start();
      }
      else {
        tweenParameters = { y: system1Node.centerY, opacity: 0 };
        // move system 1 to top half of screen
        tweenPosition = new TWEEN.Tween( tweenParameters )
          .to( { y: 0.25 * thisView.layoutBounds.height }, 500 )
          .onUpdate( function() { system1Node.centerY = tweenParameters.y; } )
          .onComplete( function() { tweenOpacity.start(); } );
        // fade in system 2
        system2Node.opacity = 0;
        system2Node.visible = true;
        tweenOpacity = new TWEEN.Tween( tweenParameters )
          .to( { opacity: 1 }, 500 )
          .onUpdate( function() { system2Node.opacity = tweenParameters.opacity; } );
        tweenPosition.start();
      }
    } );
  }

  return inherit( ScreenView, IntroView );
} );