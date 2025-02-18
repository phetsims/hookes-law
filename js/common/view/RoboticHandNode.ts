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

const PINCER_RADIUS = 35;
const PINCER_LINE_WIDTH = 6;
const PINCER_OVERLAP = 2;

export default class RoboticHandNode extends InteractiveHighlighting( Node ) {

  private readonly topPincerClosedNode: Node;
  private readonly topPincerOpenNode: Node;
  private readonly bottomPincerClosedNode: Node;
  private readonly bottomPincerOpenNode: Node;

  public constructor( tandem: Tandem ) {

    const topPincerClosedShape = new Shape().arc( 0, 0, PINCER_RADIUS, -0.9 * Math.PI, -0.1 * Math.PI );
    const topPincerClosedNode = new Path( topPincerClosedShape, {
      stroke: HookesLawColors.pincersStrokeProperty,
      lineWidth: PINCER_LINE_WIDTH,
      left: 0,
      bottom: PINCER_OVERLAP
    } );

    const topPincerOpenShape = new Shape().arc( 0, 0, PINCER_RADIUS, -0.8 * Math.PI, 0 );
    const topPincerOpenNode = new Path( topPincerOpenShape, {
      stroke: HookesLawColors.pincersStrokeProperty,
      lineWidth: PINCER_LINE_WIDTH,
      right: topPincerClosedNode.right,
      bottom: 0
    } );

    const bottomPincerClosedShape = new Shape().arc( 0, 0, PINCER_RADIUS, 0.9 * Math.PI, 0.1 * Math.PI, true );
    const bottomPincerClosedNode = new Path( bottomPincerClosedShape, {
      stroke: HookesLawColors.pincersStrokeProperty,
      lineWidth: PINCER_LINE_WIDTH,
      left: 0,
      top: -PINCER_OVERLAP
    } );

    const bottomPincerOpenShape = new Shape().arc( 0, 0, PINCER_RADIUS, 0.8 * Math.PI, 0, true );
    const bottomPincerOpenNode = new Path( bottomPincerOpenShape, {
      stroke: HookesLawColors.pincersStrokeProperty,
      lineWidth: PINCER_LINE_WIDTH,
      right: bottomPincerClosedNode.right,
      top: 0
    } );

    // hinge, where the pincers are attached
    const hingeNode = new HingeNode( {
      x: topPincerClosedNode.right - 12, // dependent on image file
      centerY: 0 // dependent on image file
    } );

    super( {
      children: [
        topPincerClosedNode, topPincerOpenNode,
        bottomPincerClosedNode, bottomPincerOpenNode,
        hingeNode
      ],
      cursor: 'pointer',
      tagName: 'div',
      focusable: true,
      tandem: tandem,
      phetioInputEnabledPropertyInstrumented: true,
      phetioVisiblePropertyInstrumented: false
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
}

hookesLaw.register( 'RoboticHandNode', RoboticHandNode );