// Copyright 2018, University of Colorado Boulder

/**
 * The animation that occurs when you switch between 1 and 2 systems in the Intro screen.
 * This is a chain of animations that is applied sequentially to the 2 system Nodes.
 *
 * @author Chris Malley (PixelZoom, Inc.)                                                                                                                                     x
 */
define( function( require ) {
  'use strict';

  // modules
  var Animation = require( 'TWIXT/Animation' );
  var Easing = require( 'TWIXT/Easing' );
  var Emitter = require( 'AXON/Emitter' );
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  var inherit = require( 'PHET_CORE/inherit' );

  // constants
  var STEPPER = 'manual'; // step must be called by the client
  var TRANSLATION_DURATION = 0.5; // duration of system 1 translation animation, in seconds
  var OPACITY_DURATION = 0.5; // duration of system 2 opacity animation, in seconds

  /**
   * @param {number} numberOfSystems
   * @param {Bounds2} layoutBounds - of the associated ScreenView
   * @param {NumberProperty} system1CenterYProperty - centerY of the Node for system 1
   * @param {NumberProperty} system2OpacityProperty - opacity of the Node for system 2
   * @param {Node} system2Node
   * @param {Tandem} tandem
   * @constructor
   */
  function IntroAnimation( numberOfSystems, layoutBounds,
                           system1CenterYProperty, system2OpacityProperty, system2Node, tandem ) {

    assert && assert( numberOfSystems === 1 || numberOfSystems === 2, 'invalid numberOfSystems: ' + numberOfSystems );

    var self = this;

    // @private which {Animation} in the chain should respond to start, stop and step
    this.activeAnimation = null;

    // @public emit() is called when the animation completes
    this.finishEmitter = new Emitter();

    var translateSystem1 = null; // {Animation} for system 1 translation
    var fadeSystem2 = null; // {Animation} for system 2 fade (opacity)

    if ( numberOfSystems === 1 ) {

      // Fade out system 2, then move system 1 to vertical center of layoutBounds.

      // Fade out system 2.
      fadeSystem2 = new Animation( {
        stepper: STEPPER,
        duration: OPACITY_DURATION, // seconds
        targets: [ {
          property: system2OpacityProperty,
          easing: Easing.LINEAR,
          to: 0
        } ]
      } );

      // Translate system 1.
      translateSystem1 = new Animation( {
        stepper: STEPPER,
        duration: TRANSLATION_DURATION, // seconds
        targets: [ {
          property: system1CenterYProperty,
          easing: Easing.LINEAR,
          to: layoutBounds.centerY // to centerY of layout bounds
        } ]
      } );

      // When the fade of system 2 completes, switch to translation of system 1.
      fadeSystem2.finishEmitter.addListener( function() {
        system2Node.visible = false; // Make system 2 invisible, so you can't interact with it.
        self.activeAnimation = translateSystem1;
        translateSystem1.start();
      } );

      // When the translation of system 1 completes, notify that the animation has completed.
      translateSystem1.finishEmitter.addListener( function() {
        self.activeAnimation = null;
        self.finishEmitter.emit();
      } );

      // Start with the animation of system 2.
      this.activeAnimation = fadeSystem2;
    }
    else {

      // Move system 1 to top of layoutBounds, then fade in system 2.

      // Translate system 1.
      translateSystem1 = new Animation( {
        stepper: STEPPER,
        duration: TRANSLATION_DURATION, // seconds
        targets: [ {
          property: system1CenterYProperty,
          easing: Easing.LINEAR,
          to: layoutBounds.minY + ( 0.25 * layoutBounds.height ) // towards top of layoutBounds
        } ]
      } );

      // Fade in system 2.
      fadeSystem2 = new Animation( {
        stepper: STEPPER,
        duration: OPACITY_DURATION, // seconds
        targets: [ {
          property: system2OpacityProperty,
          easing: Easing.LINEAR,
          to: 1
        } ]
      } );

      // When translation of system 1 completes, switch to fade of system 2.
      translateSystem1.finishEmitter.addListener( function() {
        system2Node.visible = true; // Make system 2 visible.
        self.activeAnimation = fadeSystem2;
        fadeSystem2.start();
      } );

      // When fade of system 2 completes, notify that the animation has completed.
      fadeSystem2.finishEmitter.addListener( function() {
        self.activeAnimation = null;
        self.finishEmitter.emit();
      } );

      // Start with the animation of system 1.
      this.activeAnimation = translateSystem1;
    }
  }

  hookesLaw.register( 'IntroAnimation', IntroAnimation );

  return inherit( Object, IntroAnimation, {

    // @public
    start: function() {
      this.activeAnimation && this.activeAnimation.start();
    },

    // @public
    stop: function() {
      this.activeAnimation && this.activeAnimation.stop();
    },

    // @public
    step: function( dt ) {
      this.activeAnimation && this.activeAnimation.step( dt );
    }
  } );
} );