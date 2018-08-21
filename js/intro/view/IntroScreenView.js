// Copyright 2015-2017, University of Colorado Boulder

/**
 * View for the "Intro" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Animation = require( 'TWIXT/Animation' );
  var Easing = require( 'TWIXT/Easing' );
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
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

    // @private Animations for system 1
    this.animationPosition1 = null;
    this.animationOpacity1 = null;

    // @private Animations for system 2
    this.animationPosition2 = null;
    this.animationOpacity2 = null;

    // The vertical position of system 1, controlled via a Property to support
    // animation and PhET-iO record & playback. See #46 and #53.
    var system1CenterYProperty = new NumberProperty( system1Node.centerY, {
      tandem: tandem.createTandem( 'system1CenterYProperty' )
    } );
    system1CenterYProperty.link( function( centerY ) {
      system1Node.centerY = centerY;
    } );

    // The opacity of system 2, controlled via a Property to support animation. See #46.
    var system2OpacityProperty = new NumberProperty( 0, {
      isValidValue: function( value ) { return value >= 0 && value <= 1; }
    } );
    system2OpacityProperty.link( function( opacity ) {
      system2Node.opacity = opacity;
    } );

    viewProperties.numberOfSystemsProperty.lazyLink( function( numberOfSystems ) {

      assert && assert( numberOfSystems === 1 || numberOfSystems === 2 );

      // Stop any animation that is in progress
      self.animationPosition1 && self.animationPosition1.stop();
      self.animationOpacity1 && self.animationOpacity1.stop();
      self.animationPosition2 && self.animationPosition2.stop();
      self.animationOpacity2 && self.animationOpacity2.stop();

      if ( numberOfSystems === 1 ) {

        // Fade out system 2, then move system 1 to vertical center of layoutBounds.

        // animate system 1 to the vertical center of the screen
        self.animationPosition1 = new Animation( {
          stepper: 'manual',
          duration: 0.5, // seconds
          targets: [ {
            property: system1CenterYProperty,
            easing: Easing.LINEAR,
            to: self.layoutBounds.centerY
          } ]
        } );

        self.animationPosition1.finishEmitter.addListener( function() {
          self.animationPosition1 = null;
        } );

        self.animationOpacity2 = new Animation( {
          stepper: 'manual',
          duration: 0.5, // seconds
          targets: [ {
            property: system2OpacityProperty,
            easing: Easing.LINEAR,
            to: 0
          } ]
        } );

        self.animationOpacity2.finishEmitter.addListener( function() {
          system2Node.visible = false;
          self.animationOpacity2 = null;
          self.animationPosition1.start();
        } );

        self.animationOpacity2.start();
      }
      else {

        // Move system 1 to top of layoutBounds, then fade in system 2.

        // animate system 1 to the top of the screen
        self.animationPosition1 = new Animation( {
          stepper: 'manual', // by calling step
          duration: 0.5, // seconds
          targets: [ {
            property: system1CenterYProperty,
            easing: Easing.LINEAR,
            to: self.layoutBounds.minY + ( 0.25 * self.layoutBounds.height )
          } ]
        } );

        self.animationPosition1.finishEmitter.addListener( function() {
          self.animationPosition1 = null;
          system2Node.visible = true;
          self.animationOpacity2.start();
        } );

        self.animationOpacity2 = new Animation( {
          stepper: 'manual', // by calling step
          duration: 0.5, // seconds
          targets: [ {
            property: system2OpacityProperty,
            easing: Easing.LINEAR,
            to: 1
          } ]
        } );

        self.animationOpacity2.finishEmitter.addListener( function() {
          self.animationOpacity2 = null;
        } );

        self.animationPosition1.start();
      }
    } );
  }

  hookesLaw.register( 'IntroScreenView', IntroScreenView );

  return inherit( ScreenView, IntroScreenView, {

    // @public
    step: function( dt ) {

      // step animations
      this.animationPosition1 && this.animationPosition1.step( dt );
      this.animationOpacity1 && this.animationOpacity1.step( dt );
      this.animationPosition2 && this.animationPosition2.step( dt );
      this.animationOpacity2 && this.animationOpacity2.step( dt );
    }
  } );
} );