// Copyright 2002-2015, University of Colorado Boulder

/**
 * View for the "Introduction" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var IntroductionVisibilityPanel = require( 'HOOKES_LAW/introduction/view/IntroductionVisibilityPanel' );
  var IntroductionViewProperties = require( 'HOOKES_LAW/introduction/view/IntroductionViewProperties' );
  var NumberOfSystemsControl = require( 'HOOKES_LAW/introduction/view/NumberOfSystemsControl' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var SingleSpringSystemNode = require( 'HOOKES_LAW/introduction/view/SingleSpringSystemNode' );

  /**
   * @param {IntroductionModel} model
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function IntroductionView( model, modelViewTransform ) {

    var thisView = this;
    ScreenView.call( this, HookesLawConstants.SCREEN_VIEW_OPTIONS );

    // Properties that are specific to the view
    var viewProperties = new IntroductionViewProperties();

    // System 1
    var system1Node = new SingleSpringSystemNode( model.system1, modelViewTransform, viewProperties, {
      number: 1,
      left: this.layoutBounds.left + 60,
      centerY: ( viewProperties.numberOfSystemsProperty.get() === 1 ) ? this.layoutBounds.centerY : ( 0.25 * this.layoutBounds.height )
    } );
    this.addChild( system1Node );
    assert && assert( system1Node.height <= this.layoutBounds.height / 2, 'system1Node is taller than the space available for it' );

    // System 2
    var system2Node = new SingleSpringSystemNode( model.system2, modelViewTransform, viewProperties, {
      number: 2,
      left: system1Node.left,
      top: this.layoutBounds.centerY + 10,
      visible: ( viewProperties.numberOfSystemsProperty.get() === 2 )
    } );
    this.addChild( system2Node );
    assert && assert( system2Node.height <= this.layoutBounds.height / 2, 'system2Node is taller than the space available for it' );

    // Visibility controls
    var visibilityPanel = new IntroductionVisibilityPanel( viewProperties, {
      top: this.layoutBounds.top + 10,
      right: this.layoutBounds.right - 10
    } );
    this.addChild( visibilityPanel );

    // Control for number of systems
    var numberOfSystemsControl = new NumberOfSystemsControl( viewProperties.numberOfSystemsProperty, {
      centerX: visibilityPanel.centerX,
      top: visibilityPanel.bottom + 10
    } );
    this.addChild( numberOfSystemsControl );

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

  return inherit( ScreenView, IntroductionView );
} );