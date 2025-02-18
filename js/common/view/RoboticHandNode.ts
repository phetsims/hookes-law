// Copyright 2025, University of Colorado Boulder

/**
 * RoboticHandNode is the hand part of the robotic arm. It's the part that is draggable.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import InteractiveHighlighting from '../../../../scenery/js/accessibility/voicing/InteractiveHighlighting.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Shape from '../../../../kite/js/Shape.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import HookesLawColors from '../HookesLawColors.js';
import HingeNode from './HingeNode.js';
import hookesLaw from '../../hookesLaw.js';
import Tandem from '../../../../tandem/js/Tandem.js';

// Attributes of the grippers, the finger-like parts of the hand.
const GRIPPER_RADIUS = 35;
const GRIPPER_LINE_WIDTH = 6;
const GRIPPER_OVERLAP = 2;

export default class RoboticHandNode extends InteractiveHighlighting( Node ) {

  private readonly topGripperClosedNode: Node;    // Top gripper in the closed position.
  private readonly topGripperOpenNode: Node;      // Top gripper in the open position.
  private readonly bottomGripperClosedNode: Node; // Bottom gripper in the closed position.
  private readonly bottomGripperOpenNode: Node;   // Bottom gripper in the open position.

  public constructor( tandem: Tandem ) {

    const topGripperClosedShape = new Shape().arc( 0, 0, GRIPPER_RADIUS, -0.9 * Math.PI, -0.1 * Math.PI );
    const topGripperClosedNode = new Path( topGripperClosedShape, {
      stroke: HookesLawColors.grippersStrokeProperty,
      lineWidth: GRIPPER_LINE_WIDTH,
      left: 0,
      bottom: GRIPPER_OVERLAP
    } );

    const topGripperOpenShape = new Shape().arc( 0, 0, GRIPPER_RADIUS, -0.8 * Math.PI, 0 );
    const topGripperOpenNode = new Path( topGripperOpenShape, {
      stroke: HookesLawColors.grippersStrokeProperty,
      lineWidth: GRIPPER_LINE_WIDTH,
      right: topGripperClosedNode.right,
      bottom: 0
    } );

    const bottomGripperClosedShape = new Shape().arc( 0, 0, GRIPPER_RADIUS, 0.9 * Math.PI, 0.1 * Math.PI, true );
    const bottomGripperClosedNode = new Path( bottomGripperClosedShape, {
      stroke: HookesLawColors.grippersStrokeProperty,
      lineWidth: GRIPPER_LINE_WIDTH,
      left: 0,
      top: -GRIPPER_OVERLAP
    } );

    const bottomGripperOpenShape = new Shape().arc( 0, 0, GRIPPER_RADIUS, 0.8 * Math.PI, 0, true );
    const bottomGripperOpenNode = new Path( bottomGripperOpenShape, {
      stroke: HookesLawColors.grippersStrokeProperty,
      lineWidth: GRIPPER_LINE_WIDTH,
      right: bottomGripperClosedNode.right,
      top: 0
    } );

    // hinge, where the grippers are attached
    const hingeNode = new HingeNode( {
      x: topGripperClosedNode.right - 12, // dependent on image file
      centerY: 0 // dependent on image file
    } );

    super( {
      children: [
        topGripperClosedNode, topGripperOpenNode,
        bottomGripperClosedNode, bottomGripperOpenNode,
        hingeNode
      ],
      cursor: 'pointer',
      tagName: 'div',
      focusable: true,
      tandem: tandem,
      phetioInputEnabledPropertyInstrumented: true,
      phetioVisiblePropertyInstrumented: false
    } );

    this.topGripperClosedNode = topGripperClosedNode;
    this.topGripperOpenNode = topGripperOpenNode;
    this.bottomGripperClosedNode = bottomGripperClosedNode;
    this.bottomGripperOpenNode = bottomGripperOpenNode;
  }

  /**
   * Used to open and close the grippers, the finger-like parts of the hand.
   */
  public setGrippersOpen( grippersOpen: boolean ): void {
    this.topGripperOpenNode.visible = this.bottomGripperOpenNode.visible = grippersOpen;
    this.topGripperClosedNode.visible = this.bottomGripperClosedNode.visible = !grippersOpen;
  }
}

hookesLaw.register( 'RoboticHandNode', RoboticHandNode );