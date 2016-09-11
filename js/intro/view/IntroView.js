// Copyright 2015, University of Colorado Boulder

/**
 * View for the "Intro" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var IntroSceneControl = require( 'HOOKES_LAW/intro/view/IntroSceneControl' );
  var IntroSystemNode = require( 'HOOKES_LAW/intro/view/IntroSystemNode' );
  var IntroViewProperties = require( 'HOOKES_LAW/intro/view/IntroViewProperties' );
  var IntroVisibilityControls = require( 'HOOKES_LAW/intro/view/IntroVisibilityControls' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var VBox = require( 'SCENERY/nodes/VBox' );

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
      maxWidth: 250 // constrain width for i18n, determining empirically
    } );

    // Control for switching between 1 and 2 systems
    var sceneControl = new IntroSceneControl( viewProperties.numberOfSystemsProperty );

    // horizontally center the controls
    this.addChild( new VBox( {
      spacing: 10,
      children: [ visibilityControls, sceneControl ],
      right: this.layoutBounds.right - 10,
      top: this.layoutBounds.top + 10
    } ) );

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

    // Tween instances for system 1
    var tweenPosition1;
    var tweenOpacity1;

    // Tween instances for system 2
    var tweenPosition2;
    var tweenOpacity2;

    viewProperties.numberOfSystemsProperty.lazyLink( function( numberOfSystems ) {

      assert && assert( numberOfSystems === 1 || numberOfSystems === 2 );

      // Stop any animation that is in progress
      tweenPosition1 && tweenPosition1.stop();
      tweenOpacity1 && tweenOpacity1.stop();
      tweenPosition2 && tweenPosition2.stop();
      tweenOpacity2 && tweenOpacity2.stop();

      // animate system 1 into position
      var tweenParameters;
      if ( numberOfSystems === 1 ) {

        tweenParameters = { y: system1Node.centerY, opacity: 1 };

        // fade out system 2
        tweenOpacity2 = new TWEEN.Tween( tweenParameters )
          .to( { opacity: 0 }, 500 )
          .onUpdate( function() {
            system2Node.opacity = tweenParameters.opacity;
          } )
          .onComplete( function() {
            system2Node.visible = false;
            tweenPosition1.start( phet.joist.elapsedTime );
          } );

        // move system 1 to center of screen
        tweenPosition1 = new TWEEN.Tween( tweenParameters )
          .to( { y: thisView.layoutBounds.centerY }, 500 )
          .onUpdate( function() {
            system1Node.centerY = tweenParameters.y;
          } );

        tweenOpacity2.start( phet.joist.elapsedTime );
      }
      else {

        tweenParameters = { y: system1Node.centerY, opacity: 0 };

        // move system 1 to top half of screen
        tweenPosition1 = new TWEEN.Tween( tweenParameters )
          .to( { y: 0.25 * thisView.layoutBounds.height }, 500 )
          .onUpdate( function() {
            system1Node.centerY = tweenParameters.y;
          } )
          .onComplete( function() {
            tweenOpacity2.start( phet.joist.elapsedTime );
          } );

        // fade in system 2
        tweenOpacity2 = new TWEEN.Tween( tweenParameters )
          .to( { opacity: 1 }, 500 )
          .onStart( function() {
            system2Node.opacity = 0;
            system2Node.visible = true;
          } )
          .onUpdate( function() {
            system2Node.opacity = tweenParameters.opacity;
          } );

        tweenPosition1.start( phet.joist.elapsedTime );
      }
    } );
  }

  hookesLaw.register( 'IntroView', IntroView );

  return inherit( ScreenView, IntroView );
} );