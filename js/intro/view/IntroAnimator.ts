// Copyright 2018-2025, University of Colorado Boulder

/**
 * IntroAnimator is responsible for animating the transition between 1 and 2 systems in the Intro screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Animation from '../../../../twixt/js/Animation.js';
import Easing from '../../../../twixt/js/Easing.js';
import hookesLaw from '../../hookesLaw.js';
import isSettingPhetioStateProperty from '../../../../tandem/js/isSettingPhetioStateProperty.js';

const STEPPER = null; // step method must be called by the client
const TRANSLATION_DURATION = 0.5; // duration of system 1 translation animation, in seconds
const OPACITY_DURATION = 0.5; // duration of system 2 opacity animation, in seconds

export default class IntroAnimator {

  // which Animation in the chain should be stepped
  private activeAnimation: Animation | null;

  public constructor( numberOfSystemsProperty: TReadOnlyProperty<number>,
                      system1Node: Node, system2Node: Node,
                      layoutBounds: Bounds2 ) {

    this.activeAnimation = null;

    // Initial state
    if ( numberOfSystemsProperty.value === 1 ) {
      system1Node.centerY = layoutBounds.centerY;
      system2Node.visible = false;
    }
    else {
      system1Node.centerY = ( 0.25 * layoutBounds.height );
      system2Node.visible = true;
    }
    system2Node.centerY = 0.75 * layoutBounds.height;

    // Vertical position of system 1.
    const system1CenterYProperty = new NumberProperty( system1Node.centerY );
    system1CenterYProperty.link( centerY => {
      system1Node.centerY = centerY;
    } );

    // Opacity of system 2.
    const system2OpacityProperty = new NumberProperty( system2Node.opacity, {
      isValidValue: value => ( value >= 0 && value <= 1 )
    } );
    system2OpacityProperty.link( opacity => {
      system2Node.opacity = opacity;
    } );

    let system1Animation: Animation | null = null; // animation for system 1 translation (up/down)
    let system2Animation: Animation | null = null; // animation for system 2 opacity (fade in/out)

    // Position of system 1 when there is 1 system, vertically centered in the screen.
    const system1CenterYForOneSystem = layoutBounds.centerY;

    // Position of system 1 when there are 2 systems, towards the top of the screen.
    const system1CenterXForTwoSystems = layoutBounds.minY + ( 0.25 * layoutBounds.height );

    // unlink not needed
    numberOfSystemsProperty.link( numberOfSystems => {

      // Stop any animations that are in progress.
      system1Animation && system1Animation.stop();
      system2Animation && system2Animation.stop();

      if ( isSettingPhetioStateProperty.value ) {

        // PhET typically does not instrument Animations; they are considered transient and not necessary for state.
        // So if setting PhET-iO state, skip the animation and move directly to the final state.
        system1CenterYProperty.value = ( numberOfSystems === 1 ) ? system1CenterYForOneSystem : system1CenterXForTwoSystems;
        system2OpacityProperty.value = ( numberOfSystems === 1 ) ? 0 : 1;
        system2Node.visible = ( numberOfSystems === 2 );
      }
      else {
        if ( numberOfSystems === 1 ) {

          // Fade out system 2, then move system 1 to vertical center of layoutBounds.

          // Fade out system 2.
          system2Animation = new Animation( {
            stepEmitter: STEPPER,
            duration: OPACITY_DURATION,
            targets: [ {
              property: system2OpacityProperty,
              easing: Easing.LINEAR,
              to: 0
            } ]
          } );

          // Translate system 1.
          system1Animation = new Animation( {
            stepEmitter: STEPPER,
            duration: TRANSLATION_DURATION,
            targets: [ {
              property: system1CenterYProperty,
              easing: Easing.LINEAR,
              to: system1CenterYForOneSystem
            } ]
          } );

          // When the fade of system 2 completes, switch to translation of system 1.
          system2Animation.finishEmitter.addListener( () => {
            system2Node.visible = false; // Make system 2 invisible, so you can't interact with it.
            this.activeAnimation = system1Animation;
            assert && assert( system1Animation );
            system1Animation!.start();
          } );

          // When the translation of system 1 completes, notify that the animation has completed.
          system1Animation.finishEmitter.addListener( () => {
            this.activeAnimation = null;
          } );

          // Start with the fade of system 2.
          this.activeAnimation = system2Animation;
        }
        else {

          // Move system 1 to top of layoutBounds, then fade in system 2.

          // Translate system 1.
          system1Animation = new Animation( {
            stepEmitter: STEPPER,
            duration: TRANSLATION_DURATION,
            targets: [ {
              property: system1CenterYProperty,
              easing: Easing.LINEAR,
              to: system1CenterXForTwoSystems
            } ]
          } );

          // Fade in system 2.
          system2Animation = new Animation( {
            stepEmitter: STEPPER,
            duration: OPACITY_DURATION,
            targets: [ {
              property: system2OpacityProperty,
              easing: Easing.LINEAR,
              to: 1
            } ]
          } );

          // When translation of system 1 completes, switch to fade of system 2.
          system1Animation.finishEmitter.addListener( () => {
            system2Node.visible = true; // Make system 2 visible.
            this.activeAnimation = system2Animation;
            assert && assert( system2Animation );
            system2Animation!.start();
          } );

          // When fade of system 2 completes, notify that the animation has completed.
          system2Animation.finishEmitter.addListener( () => {
            this.activeAnimation = null;
          } );

          // Start the translation of system 1.
          this.activeAnimation = system1Animation;
        }

        this.activeAnimation.start();
      }
    } );
  }

  public step( dt: number ): void {
    this.activeAnimation && this.activeAnimation.step( dt );
  }
}

hookesLaw.register( 'IntroAnimator', IntroAnimator );