// Copyright 2015-2017, University of Colorado Boulder

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
  var IntroAnimation = require( 'HOOKES_LAW/intro/view/IntroAnimation' );
  var IntroSceneControl = require( 'HOOKES_LAW/intro/view/IntroSceneControl' );
  var IntroSystemNode = require( 'HOOKES_LAW/intro/view/IntroSystemNode' );
  var IntroViewProperties = require( 'HOOKES_LAW/intro/view/IntroViewProperties' );
  var IntroVisibilityControls = require( 'HOOKES_LAW/intro/view/IntroVisibilityControls' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  /**
   * @param {IntroModel} model
   * @param {Tandem} tandem
   * @constructor
   */
  function IntroScreenView( model, tandem ) {

    var self = this;

    ScreenView.call( this, _.extend( {}, HookesLawConstants.SCREEN_VIEW_OPTIONS, {

      // phet-io
      tandem: tandem
    } ) );

    // View length of 1 meter of displacement
    var unitDisplacementLength = HookesLawConstants.UNIT_DISPLACEMENT_X;

    // Properties that are specific to the view
    var viewProperties = new IntroViewProperties( tandem.createTandem( 'viewProperties' ) );

    // Visibility controls
    var visibilityControls = new IntroVisibilityControls( viewProperties, {
      maxWidth: 250, // constrain width for i18n, determining empirically
      tandem: tandem.createTandem( 'visibilityControls' )
    } );

    // Control for switching between 1 and 2 systems
    var sceneControl = new IntroSceneControl( viewProperties.numberOfSystemsProperty, {
      tandem: tandem.createTandem( 'sceneControl' )
    } );

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
      centerY: ( viewProperties.numberOfSystemsProperty.get() === 1 ) ? this.layoutBounds.centerY : ( 0.25 * this.layoutBounds.height ),
      tandem: tandem.createTandem( 'system1Node' )
    } );
    this.addChild( system1Node );
    assert && assert( system1Node.height <= this.layoutBounds.height / 2, 'system1Node is taller than the space available for it' );

    // System 2
    var system2Node = new IntroSystemNode( model.system2, viewProperties, {
      unitDisplacementLength: unitDisplacementLength,
      number: 2,
      left: system1Node.left,
      centerY: 0.75 * this.layoutBounds.height,
      visible: ( viewProperties.numberOfSystemsProperty.get() === 2 ),
      tandem: tandem.createTandem( 'system2Node' )
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
      bottom: this.layoutBounds.maxY - 15,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( resetAllButton );

    // Vertical position of system 1.
    // Instrumented and persistent for PhET-iO to support record/playback, see #53 and #62.
    var system1CenterYProperty = new NumberProperty( system1Node.centerY, {
      tandem: tandem.createTandem( 'system1CenterYProperty' )
    } );
    system1CenterYProperty.link( function( centerY ) {
      system1Node.centerY = centerY;
    } );

    // Opacity of system 2.
    // Instrumented and persistent for PhET-iO to support record/playback, see #53 and #62.
    var system2OpacityProperty = new NumberProperty( system2Node.opacity, {
      isValidValue: function( value ) { return value >= 0 && value <= 1; },
      tandem: tandem.createTandem( 'system2OpacityProperty' )
    } );
    system2OpacityProperty.link( function( opacity ) {
      system2Node.opacity = opacity;
    } );

    // @private When the number of systems changes, animate the systems.
    this.animation = null;
    viewProperties.numberOfSystemsProperty.lazyLink( function( numberOfSystems ) {
      self.animation && self.animation.stop();
      self.animation = new IntroAnimation( numberOfSystems, self.layoutBounds,
        system1CenterYProperty, system2OpacityProperty, system2Node, tandem );
      self.animation.finishEmitter.addListener( function() { self.animation = null; } );
      self.animation.start();
    } );
  }

  hookesLaw.register( 'IntroScreenView', IntroScreenView );

  return inherit( ScreenView, IntroScreenView, {

    // @public
    step: function( dt ) {
      this.animation && this.animation.step( dt );
    }
  } );
} );