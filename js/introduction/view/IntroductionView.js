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
  var NumberOfSystemsControl = require( 'HOOKES_LAW/common/view/NumberOfSystemsControl' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var SystemNode = require( 'HOOKES_LAW/common/view/SystemNode' );
  var VisibilityPanel = require( 'HOOKES_LAW/common/view/VisibilityPanel' );
  var VisibilityProperties = require( 'HOOKES_LAW/common/view/VisibilityProperties' );

  /**
   * @param {IntroductionModel} model
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function IntroductionView( model, modelViewTransform ) {

    assert && assert( model.numberOfSystemsProperty.get() === 1, 'initial layout assumes 1 system' );

    var thisView = this;
    ScreenView.call( this, HookesLawConstants.SCREEN_VIEW_OPTIONS );

    // Properties that are specific to the visibility of things in the view
    var visibilityProperties = new VisibilityProperties();

    // System 1
    var system1 = new SystemNode( model.spring1, modelViewTransform, visibilityProperties, {
      number: 1,
      left: this.layoutBounds.left + 60,
      centerY: this.layoutBounds.centerY
    } );
    this.addChild( system1 );

    // System 2
    var system2 = new SystemNode( model.spring2, modelViewTransform, visibilityProperties, {
      number: 2,
      left: system1.left,
      top: this.layoutBounds.centerY + 10,
      visible: false
    } );
    this.addChild( system2 );

    // Visibility controls
    var visibilityPanel = new VisibilityPanel( visibilityProperties, {
      top: this.layoutBounds.top + 10,
      right: this.layoutBounds.right - 10
    } );
    this.addChild( visibilityPanel );

    // Control for number of systems
    var numberOfSystemsControl = new NumberOfSystemsControl( model.numberOfSystemsProperty, {
      centerX: visibilityPanel.centerX,
      top: visibilityPanel.bottom + 10
    } );
    this.addChild( numberOfSystemsControl );

    // Reset All button, bottom right
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
        visibilityProperties.reset();
      },
      right: this.layoutBounds.maxX - 15,
      bottom: this.layoutBounds.maxY - 15
    } );
    this.addChild( resetAllButton );

    model.numberOfSystemsProperty.lazyLink( function( numberOfSystems ) {

      assert && assert( numberOfSystems === 1 || numberOfSystems === 2 );

      // animate system 1 into position
      var tweenPosition, tweenOpacity, parameters;
      if ( numberOfSystems === 1 ) {
        parameters = { y: system1.centerY, opacity: 1 };
        // fade out system 2
        tweenOpacity = new TWEEN.Tween( parameters )
          .to( { opacity: 0 }, 500 )
          .onUpdate( function() { system2.opacity = parameters.opacity } )
          .onComplete( function() {
            system2.visible = false;
            system2.opacity = 1;
            tweenPosition.start();
          } );
        // move system 1 to center of screen
        tweenPosition = new TWEEN.Tween( parameters )
          .to( { y: thisView.layoutBounds.centerY }, 500 )
          .onUpdate( function() { system1.centerY = parameters.y; } );
        tweenOpacity.start();
      }
      else {
        parameters = { y: system1.bottom, opacity: 0 };
        // move system 1 to top of screen
        tweenPosition = new TWEEN.Tween( parameters )
          .to( { y: thisView.layoutBounds.centerY - 10 }, 500 )
          .onUpdate( function() { system1.bottom = parameters.y; } )
          .onComplete( function() { tweenOpacity.start() } );
        // fade in system 2
        system2.opacity = 0;
        system2.visible = true;
        tweenOpacity = new TWEEN.Tween( parameters )
          .to( { opacity: 1 }, 500 )
          .onUpdate( function() { system2.opacity = parameters.opacity } );
        tweenPosition.start();
      }
    } );
  }

  return inherit( ScreenView, IntroductionView );
} );