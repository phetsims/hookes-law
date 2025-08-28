// Copyright 2015-2025, University of Colorado Boulder

/**
 * RoboticArmNode is the view of the robotic arm used to pull the spring(s).
 * Origin is at the left-center of subcomponent redBox, at the right (fixed) end of the arm.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Range from '../../../../dot/js/Range.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Node, { NodeOptions, NodeTranslationOptions } from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import LinearGradient from '../../../../scenery/js/util/LinearGradient.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawColors from '../HookesLawColors.js';
import RoboticArm from '../model/RoboticArm.js';
import RoboticHandNode from './RoboticHandNode.js';
import SoundDragListener from '../../../../scenery-phet/js/SoundDragListener.js';
import SoundKeyboardDragListener, { SoundKeyboardDragListenerOptions } from '../../../../scenery-phet/js/SoundKeyboardDragListener.js';
import { roundToInterval } from '../../../../dot/js/util/roundToInterval.js';
import HookesLawConstants from '../HookesLawConstants.js';

const BOX_SIZE = new Dimension2( 20, 60 );
const BOX_GRADIENT = new LinearGradient( 0, 0, 0, BOX_SIZE.height )
  .addColorStop( 0, HookesLawColors.roboticArmFillProperty )
  .addColorStop( 0.5, 'white' )
  .addColorStop( 1, HookesLawColors.roboticArmFillProperty );

type SelfOptions = {
  unitDisplacementLength?: number; // view length of a 1m displacement
  displacementInterval?: number; // dragging the arm will snap to multiples of this interval
};

type RoboticArmNodeOptions = SelfOptions & NodeTranslationOptions & PickRequired<NodeOptions, 'tandem'>;

export default class RoboticArmNode extends Node {

  // Robotic hand, the draggable part of the robotic arm, attached to the left end of the telescoping arm.
  private readonly roboticHandNode: RoboticHandNode;

  // Height of the telescoping arm.
  public static readonly ARM_HEIGHT = 14;

  // Gradient for the telescoping arm.
  public static readonly ARM_GRADIENT = new LinearGradient( 0, 0, 0, RoboticArmNode.ARM_HEIGHT )
    .addColorStop( 0, HookesLawColors.roboticArmFillProperty )
    .addColorStop( 0.3, 'white' )
    .addColorStop( 1, HookesLawColors.roboticArmFillProperty );

  public constructor( roboticArm: RoboticArm,
                      leftRangeProperty: TReadOnlyProperty<Range>, // dynamic range of the left (movable) end of the arm, units = m
                      numberOfInteractionsInProgressProperty: Property<number>, // number of interactions in progress that affect displacement
                      providedOptions: RoboticArmNodeOptions ) {

    const options = optionize<RoboticArmNodeOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      unitDisplacementLength: 1,
      displacementInterval: HookesLawConstants.ROBOTIC_ARM_DISPLACEMENT_INTERVAL,

      // NodeOptions
      phetioVisiblePropertyInstrumented: false // see https://github.com/phetsims/hookes-law/issues/111
    }, providedOptions );

    // Red box at right end of the arm. Origin is at left-center.
    const redBox = new Rectangle( 0, 0, 7, 30, {
      stroke: 'black',
      fill: HookesLawColors.hingeColorProperty, // same color as hinge
      lineWidth: 0.5,
      left: 0,
      centerY: 0
    } );

    // Gradient box to the right of red box.
    const gradientBox = new Rectangle( 0, 0, BOX_SIZE.width, BOX_SIZE.height, {
      stroke: 'black',
      fill: BOX_GRADIENT,
      lineWidth: 0.5,
      left: redBox.right - 1,
      centerY: 0
    } );

    // Telescoping arm will be sized and positioned by roboticArm.leftProperty listener.
    const armNode = new Rectangle( 0, 0, 1, RoboticArmNode.ARM_HEIGHT, {
      fill: RoboticArmNode.ARM_GRADIENT,
      stroke: HookesLawColors.roboticArmStrokeProperty,
      lineWidth: 0.5
    } );

    // Robotic hand is draggable, other parts are not.
    const roboticHandNodeTandem = options.tandem.createTandem( 'roboticHandNode' );
    const roboticHandNode = new RoboticHandNode( roboticHandNodeTandem );
    roboticHandNode.touchArea = roboticHandNode.localBounds.dilatedXY( 0.3 * roboticHandNode.width, 0.2 * roboticHandNode.height );

    // Drag the hand.
    let startOffsetX = 0;
    const dragListener = new SoundDragListener( {

      allowTouchSnag: true,

      start: event => {
        numberOfInteractionsInProgressProperty.value += 1;
        const length = options.unitDisplacementLength * ( roboticArm.leftProperty.value - roboticArm.right );
        startOffsetX = roboticHandNode.globalToParentPoint( event.pointer.point ).x - length;
      },

      drag: event => {
        const parentX = roboticHandNode.globalToParentPoint( event.pointer.point ).x - startOffsetX;
        const length = parentX / options.unitDisplacementLength;
        let left = leftRangeProperty.value.constrainValue( roboticArm.right + length );

        // constrain to multiples of a specific interval, see https://github.com/phetsims/hookes-law/issues/54
        if ( options.displacementInterval ) {
          left = roundToInterval( left, options.displacementInterval );
        }

        roboticArm.leftProperty.value = left;
      },

      end: () => {
        numberOfInteractionsInProgressProperty.value -= 1;
      },

      tandem: roboticHandNodeTandem.createTandem( 'dragListener' )
    } );
    roboticHandNode.addInputListener( dragListener );

    // See https://github.com/phetsims/hookes-law/issues/106 for design history.
    let soundKeyboardDragListenerOptions: SoundKeyboardDragListenerOptions;
    if ( options.displacementInterval ) {

      // Options for stepwise dragging.
      // These values were tuned empirically, and are relevant to the Energy screen.
      soundKeyboardDragListenerOptions = {
        moveOnHoldInterval: 100, // ms
        dragDelta: options.displacementInterval,
        shiftDragDelta: options.displacementInterval // drag & shift-drag are the same!
      };
    }
    else {

      // Options for continuous dragging, in distance/s.
      // These values were tuned empirically, and are relevant to the Intro and Systems screens.
      soundKeyboardDragListenerOptions = {
        dragSpeed: 0.5,
        shiftDragSpeed: 0.1
      };
    }

    const keyboardDragListener = new SoundKeyboardDragListener(
      combineOptions<SoundKeyboardDragListenerOptions>( soundKeyboardDragListenerOptions, {
        start: event => {
          numberOfInteractionsInProgressProperty.value += 1;
        },
        drag: ( event, listener ) => {
          // To support all arrow keys and WASD keys, use the modelDelta component that is non-zero.
          // See https://github.com/phetsims/hookes-law/issues/130.
          const delta = ( listener.modelDelta.x !== 0 ) ? listener.modelDelta.x : listener.modelDelta.y;
          const newLeft = roboticArm.leftProperty.value + delta;
          roboticArm.leftProperty.value = leftRangeProperty.value.constrainValue( newLeft );
        },
        end: () => {
          numberOfInteractionsInProgressProperty.value -= 1;
        },
        tandem: roboticHandNodeTandem.createTandem( 'keyboardDragListener' )
      } ) );
    roboticHandNode.addInputListener( keyboardDragListener );

    roboticArm.leftProperty.link( left => {

      // Move the hand.
      roboticHandNode.x = options.unitDisplacementLength * ( left - roboticArm.right );

      // Resize the telescoping arm.
      const overlap = 10; // hide ends of arm behind hinge and box
      const armLength = ( gradientBox.left - roboticHandNode.right ) + ( 2 * overlap );
      armNode.setRect( 0, 0, armLength, RoboticArmNode.ARM_HEIGHT );
      armNode.right = gradientBox.left + overlap;
      armNode.centerY = 0;
    } );

    options.children = [ armNode, redBox, gradientBox, roboticHandNode ];

    super( options );

    this.roboticHandNode = roboticHandNode;
  }

  public setGrippersOpen( grippersOpen: boolean ): void {
    this.roboticHandNode.setGrippersOpen( grippersOpen );
  }
}

hookesLaw.register( 'RoboticArmNode', RoboticArmNode );