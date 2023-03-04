// Copyright 2015-2023, University of Colorado Boulder

/**
 * The robotic arm used to pull the spring(s).
 * Origin is at the left-center of the red box.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import Range from '../../../../dot/js/Range.js';
import Utils from '../../../../dot/js/Utils.js';
import { Shape } from '../../../../kite/js/imports.js';
import { DragListener, LinearGradient, Node, NodeOptions, NodeTranslationOptions, Path, PathOptions, Rectangle } from '../../../../scenery/js/imports.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawColors from '../HookesLawColors.js';
import HookesLawConstants from '../HookesLawConstants.js';
import HingeNode from './HingeNode.js';
import RoboticArm from '../model/RoboticArm.js';
import Property from '../../../../axon/js/Property.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import optionize from '../../../../phet-core/js/optionize.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';

// constants
const PINCER_RADIUS = 35;
const PINCER_LINE_WIDTH = 6;
const PINCER_OVERLAP = 2;
const ARM_HEIGHT = 14;
const ARM_GRADIENT = new LinearGradient( 0, 0, 0, ARM_HEIGHT )
  .addColorStop( 0, HookesLawColors.ROBOTIC_ARM_FILL )
  .addColorStop( 0.3, 'white' )
  .addColorStop( 1, HookesLawColors.ROBOTIC_ARM_FILL );
const BOX_SIZE = new Dimension2( 20, 60 );
const BOX_GRADIENT = new LinearGradient( 0, 0, 0, BOX_SIZE.height )
  .addColorStop( 0, HookesLawColors.ROBOTIC_ARM_FILL )
  .addColorStop( 0.5, 'white' )
  .addColorStop( 1, HookesLawColors.ROBOTIC_ARM_FILL );

type SelfOptions = {
  unitDisplacementLength?: number; // view length of a 1m displacement
  displacementInterval?: number | null; // dragging the arm will snap to multiples of this interval, null if no snapping
};

type RoboticArmNodeOptions = SelfOptions & NodeTranslationOptions & PickRequired<NodeOptions, 'tandem'>;

export default class RoboticArmNode extends Node {

  private readonly topPincerClosedNode: Node;
  private readonly topPincerOpenNode: Node;
  private readonly bottomPincerClosedNode: Node;
  private readonly bottomPincerOpenNode: Node;

  public constructor( roboticArm: RoboticArm,
                      leftRangeProperty: TReadOnlyProperty<Range>, // dynamic range of the left (movable) end of the arm, units = m
                      numberOfInteractionsInProgressProperty: Property<number>, // number of interactions in progress that affect displacement
                      providedOptions: RoboticArmNodeOptions ) {

    const options = optionize<RoboticArmNodeOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      unitDisplacementLength: 1,
      displacementInterval: null,

      // NodeOptions
      cursor: 'pointer',
      phetioInputEnabledPropertyInstrumented: true,
      visiblePropertyOptions: { phetioReadOnly: true }
    }, providedOptions );

    // red box at right end of the arm, origin is at left-center
    const redBox = new Rectangle( 0, 0, 7, 30, {
      stroke: 'black',
      fill: HookesLawColors.HINGE, // same color as hinge
      lineWidth: 0.5,
      left: 0,
      centerY: 0
    } );

    // gradient box to the right of red box
    const gradientBox = new Rectangle( 0, 0, BOX_SIZE.width, BOX_SIZE.height, {
      stroke: 'black',
      fill: BOX_GRADIENT,
      lineWidth: 0.5,
      left: redBox.right - 1,
      centerY: 0
    } );

    // arm will be sized and positioned by Property observer
    const armNode = new Rectangle( 0, 0, 1, ARM_HEIGHT, {
      fill: ARM_GRADIENT,
      stroke: HookesLawColors.ROBOTIC_ARM_STROKE,
      lineWidth: 0.5
    } );

    const topPincerClosedNode = createTopPincerClosed( {
      stroke: HookesLawColors.PINCERS_STROKE,
      lineWidth: PINCER_LINE_WIDTH,
      left: 0,
      bottom: PINCER_OVERLAP
    } );

    const topPincerOpenNode = new Path( new Shape().arc( 0, 0, PINCER_RADIUS, -0.8 * Math.PI, 0 ), {
      stroke: HookesLawColors.PINCERS_STROKE,
      lineWidth: PINCER_LINE_WIDTH,
      right: topPincerClosedNode.right,
      bottom: 0
    } );

    const bottomPincerClosedNode = createBottomPincerClosed( {
      stroke: HookesLawColors.PINCERS_STROKE,
      lineWidth: PINCER_LINE_WIDTH,
      left: 0,
      top: -PINCER_OVERLAP
    } );

    const bottomPincerOpenNode = new Path( new Shape().arc( 0, 0, PINCER_RADIUS, 0.8 * Math.PI, 0, true ), {
      stroke: HookesLawColors.PINCERS_STROKE,
      lineWidth: PINCER_LINE_WIDTH,
      right: bottomPincerClosedNode.right,
      top: 0
    } );

    // hinge, where the pincers are attached
    const hingeNode = new HingeNode( {
      x: topPincerClosedNode.right - 12, // dependent on image file
      centerY: 0 // dependent on image file
    } );

    // pincers and hinge are draggable, other parts are not
    const draggableNode = new Node( {
      children: [
        topPincerClosedNode, topPincerOpenNode,
        bottomPincerClosedNode, bottomPincerOpenNode,
        hingeNode
      ]
    } );
    draggableNode.touchArea = draggableNode.localBounds.dilatedXY( 0.3 * draggableNode.width, 0.2 * draggableNode.height );

    // Drag the pincers or hinge
    let startOffsetX = 0;
    const dragHandler = new DragListener( {

      allowTouchSnag: true,

      start: event => {
        numberOfInteractionsInProgressProperty.value = ( numberOfInteractionsInProgressProperty.value + 1 );
        const length = options.unitDisplacementLength * ( roboticArm.leftProperty.value - roboticArm.right );
        startOffsetX = draggableNode.globalToParentPoint( event.pointer.point ).x - length;
      },

      drag: event => {
        const parentX = draggableNode.globalToParentPoint( event.pointer.point ).x - startOffsetX;
        const length = parentX / options.unitDisplacementLength;
        let left = leftRangeProperty.value.constrainValue( roboticArm.right + length );

        // constrain to multiples of a specific interval, see #54
        if ( options.displacementInterval ) {
          left = Utils.roundToInterval( left, options.displacementInterval );
        }
        left = Utils.toFixedNumber( left, HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES );

        phet.log && phet.log( '>>>>> RoboticArmNode drag' );
        roboticArm.leftProperty.value = left;
      },

      end: () => {
        numberOfInteractionsInProgressProperty.value = ( numberOfInteractionsInProgressProperty.value - 1 );
      },

      // phet-io
      tandem: options.tandem.createTandem( 'dragListener' )
    } );
    draggableNode.addInputListener( dragHandler );

    roboticArm.leftProperty.link( left => {

      // move the pincers and hinge
      draggableNode.x = options.unitDisplacementLength * ( left - roboticArm.right );

      // resize the arm
      const overlap = 10; // hide ends of arm behind hinge and box
      const armLength = ( gradientBox.left - draggableNode.right ) + ( 2 * overlap );
      armNode.setRect( 0, 0, armLength, ARM_HEIGHT );
      armNode.right = gradientBox.left + overlap;
      armNode.centerY = 0;
    } );

    options.children = [ armNode, redBox, gradientBox, draggableNode ];

    super( options );

    // We are not PhET-iO instrumenting the subcomponents of this Node, and it is one of those subcomponents
    // that is draggable.  So instrument this Node's inputEnabledProperty, and use it to control the interactivity
    // of the subcomponent.
    this.inputEnabledProperty.link( inputEnabled => {
      draggableNode.inputEnabledProperty.value = inputEnabled;
    } );

    this.topPincerClosedNode = topPincerClosedNode;
    this.topPincerOpenNode = topPincerOpenNode;
    this.bottomPincerClosedNode = bottomPincerClosedNode;
    this.bottomPincerOpenNode = bottomPincerOpenNode;
  }

  public setPincersOpen( pincersOpen: boolean ): void {
    this.topPincerOpenNode.visible = this.bottomPincerOpenNode.visible = pincersOpen;
    this.topPincerClosedNode.visible = this.bottomPincerClosedNode.visible = !pincersOpen;
  }

  /**
   * Creates an icon that represents this node.
   */
  public static createIcon( options: NodeOptions ): Node {

    const topPincerNode = createTopPincerClosed( {
      stroke: HookesLawColors.PINCERS_STROKE,
      lineWidth: PINCER_LINE_WIDTH,
      bottom: PINCER_OVERLAP
    } );

    const bottomPincerNode = createBottomPincerClosed( {
      stroke: HookesLawColors.PINCERS_STROKE,
      lineWidth: PINCER_LINE_WIDTH,
      top: -PINCER_OVERLAP
    } );

    const hingeNode = new HingeNode( {
      left: topPincerNode.right - 12,
      centerY: 0
    } );

    const armNode = new Rectangle( 0, 0, 20, ARM_HEIGHT, {
      fill: ARM_GRADIENT,
      stroke: HookesLawColors.ROBOTIC_ARM_STROKE,
      lineWidth: 0.5,
      left: hingeNode.right - 5,
      centerY: hingeNode.centerY
    } );

    options.children = [ topPincerNode, bottomPincerNode, armNode, hingeNode ];
    return new Node( options );
  }
}

/**
 * Creates the top pincer in closed position.
 */
function createTopPincerClosed( options: PathOptions ): Node {
  return new Path( new Shape().arc( 0, 0, PINCER_RADIUS, -0.9 * Math.PI, -0.1 * Math.PI ), options );
}

/**
 * Creates the bottom pincer in closed position.
 */
function createBottomPincerClosed( options: PathOptions ): Node {
  return new Path( new Shape().arc( 0, 0, PINCER_RADIUS, 0.9 * Math.PI, 0.1 * Math.PI, true ), options );
}

hookesLaw.register( 'RoboticArmNode', RoboticArmNode );