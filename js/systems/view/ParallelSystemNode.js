// Copyright 2015-2020, University of Colorado Boulder

/**
 * Two springs in parallel, a robotic arm, and all of the visual representations that go with them.
 * Origin is at the point where the springs attach to the wall.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import HookesLawColors from '../../common/HookesLawColors.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import AppliedForceVectorNode from '../../common/view/AppliedForceVectorNode.js';
import DisplacementVectorNode from '../../common/view/DisplacementVectorNode.js';
import EquilibriumPositionNode from '../../common/view/EquilibriumPositionNode.js';
import HookesLawSpringNode from '../../common/view/HookesLawSpringNode.js';
import NibNode from '../../common/view/NibNode.js';
import RoboticArmNode from '../../common/view/RoboticArmNode.js';
import SpringForceVectorNode from '../../common/view/SpringForceVectorNode.js';
import WallNode from '../../common/view/WallNode.js';
import hookesLaw from '../../hookesLaw.js';
import ParallelSpringControls from './ParallelSpringControls.js';
import SpringForceRepresentation from './SpringForceRepresentation.js';

// constants
const WALL_SIZE = new Dimension2( HookesLawConstants.WALL_SIZE.width, 300 ); // wall is taller than other systems

class ParallelSystemNode extends Node {

  /**
   * @param {ParallelSystem} system
   * @param {SystemViewProperties} viewProperties
   * @param {Object} [options]
   */
  constructor( system, viewProperties, options ) {

    options = merge( {
      unitDisplacementLength: 1, // {number} view length of 1 meter of displacement
      tandem: Tandem.REQUIRED
    }, options );

    // to improve readability
    const topSpring = system.topSpring;
    const bottomSpring = system.bottomSpring;
    const roboticArm = system.roboticArm;
    const equivalentSpring = system.equivalentSpring;

    // This sim operates in 1 dimension (x), so center everything on y = 0.
    const yOrigin = 0;

    // number of interactions in progress that affect displacement
    const numberOfInteractionsInProgressProperty = new NumberProperty( 0, {
      numberType: 'Integer',
      isValidValue: value => ( value >= 0 )
    } );

    //------------------------------------------------
    // Scene graph

    // origin is at right-center of wall
    const wallNode = new WallNode( WALL_SIZE, {
      right: options.unitDisplacementLength * equivalentSpring.leftProperty.get(),
      centerY: yOrigin
    } );

    const topSpringNode = new HookesLawSpringNode( topSpring, {
      unitDisplacementLength: options.unitDisplacementLength,
      loops: HookesLawConstants.PARALLEL_SPRINGS_LOOPS,
      frontColor: HookesLawColors.TOP_SPRING_FRONT,
      middleColor: HookesLawColors.TOP_SPRING_MIDDLE,
      backColor: HookesLawColors.TOP_SPRING_BACK,
      // use x,y exclusively for layout, other translation options are inaccurate because we're using boundsMethod:'none'
      x: options.unitDisplacementLength * topSpring.leftProperty.get(),
      y: wallNode.top + ( 0.25 * wallNode.height )
    } );

    const bottomSpringNode = new HookesLawSpringNode( bottomSpring, {
      unitDisplacementLength: options.unitDisplacementLength,
      loops: HookesLawConstants.PARALLEL_SPRINGS_LOOPS,
      frontColor: HookesLawColors.BOTTOM_SPRING_FRONT,
      middleColor: HookesLawColors.BOTTOM_SPRING_MIDDLE,
      backColor: HookesLawColors.BOTTOM_SPRING_BACK,
      // use x,y exclusively for layout, other translation options are inaccurate because we're using boundsMethod:'none'
      x: options.unitDisplacementLength * bottomSpring.leftProperty.get(),
      y: wallNode.bottom - ( 0.25 * wallNode.height )
    } );

    const roboticArmNode = new RoboticArmNode( roboticArm, equivalentSpring.rightRangeProperty, numberOfInteractionsInProgressProperty, {
      unitDisplacementLength: options.unitDisplacementLength,
      x: options.unitDisplacementLength * roboticArm.right,
      y: yOrigin,
      tandem: options.tandem.createTandem( 'roboticArmNode' )
    } );

    // right ends of both springs are connected to this
    const trussOverlap = 10;
    const trussNode = new Line( 0, topSpringNode.y - trussOverlap, 0, bottomSpringNode.y + trussOverlap, {
      lineWidth: 4,
      stroke: 'black'
    } );

    // pincers grab this
    const nibNode = new NibNode( {
      fill: 'black',
      // x is determined by rightSpring.leftProperty
      centerY: yOrigin
    } );

    const equilibriumPositionNode = new EquilibriumPositionNode( wallNode.height, {
      centerX: options.unitDisplacementLength * equivalentSpring.equilibriumXProperty.get(),
      centerY: yOrigin,
      tandem: options.tandem.createTandem( 'equilibriumPositionNode' )
    } );

    const appliedForceVectorNode = new AppliedForceVectorNode(
      equivalentSpring.appliedForceProperty, viewProperties.valuesVisibleProperty, {
        // x is determined by bottomSpring.rightProperty
        // bottom determined empirically, topSpringNode.top is not accurate because we're using boundsMethod:'none'
        bottom: topSpringNode.y - 80,
        tandem: options.tandem.createTandem( 'appliedForceVectorNode' )
      } );

    const totalSpringForceVectorNode = new SpringForceVectorNode(
      equivalentSpring.springForceProperty, viewProperties.valuesVisibleProperty, {
        // x is determined by bottomSpring.rightProperty
        centerY: appliedForceVectorNode.centerY,
        tandem: options.tandem.createTandem( 'totalSpringForceVectorNode' )
      } );

    const topSpringForceVectorNode = new SpringForceVectorNode(
      topSpring.springForceProperty, viewProperties.valuesVisibleProperty, {
        fill: HookesLawColors.TOP_SPRING,
        decimalPlaces: HookesLawConstants.PARALLEL_SPRING_FORCE_COMPONENTS_DECIMAL_PLACES,
        // x is determined by topSpring.rightProperty
        centerY: totalSpringForceVectorNode.top,
        tandem: options.tandem.createTandem( 'topSpringForceVectorNode' )
      } );

    const bottomSpringForceVectorNode = new SpringForceVectorNode(
      bottomSpring.springForceProperty, viewProperties.valuesVisibleProperty, {
        fill: HookesLawColors.BOTTOM_SPRING,
        decimalPlaces: HookesLawConstants.PARALLEL_SPRING_FORCE_COMPONENTS_DECIMAL_PLACES,
        // x is determined by bottomSpring.rightProperty
        centerY: totalSpringForceVectorNode.bottom,
        tandem: options.tandem.createTandem( 'bottomSpringForceVectorNode' )
      } );

    const displacementVectorNode = new DisplacementVectorNode(
      equivalentSpring.displacementProperty, viewProperties.valuesVisibleProperty, {
        unitDisplacementLength: options.unitDisplacementLength,
        x: equilibriumPositionNode.centerX,
        // top determined empirically, bottomSpringNode.bottom is not accurate because we're using boundMethod:'none'
        top: bottomSpringNode.y + 50,
        tandem: options.tandem.createTandem( 'displacementVectorNode' )
      } );

    const springControls = new ParallelSpringControls( system, numberOfInteractionsInProgressProperty, {
      centerX: wallNode.left + ( roboticArmNode.right - wallNode.left ) / 2,
      top: wallNode.bottom + 25,
      maxWidth: roboticArmNode.right - wallNode.left, // constrain width for i18n
      tandem: options.tandem.createTandem( 'springControls' )
    } );

    assert && assert( !options.children, 'ParallelSystemNode sets children' );
    options.children = [
      equilibriumPositionNode, roboticArmNode, topSpringNode, bottomSpringNode, wallNode, trussNode, nibNode,
      topSpringForceVectorNode, bottomSpringForceVectorNode,
      appliedForceVectorNode, totalSpringForceVectorNode, displacementVectorNode,
      springControls
    ];

    //------------------------------------------------
    // Property observers

    // Attach visibility properties to their respective nodes.
    viewProperties.appliedForceVectorVisibleProperty.linkAttribute( appliedForceVectorNode, 'visible' );
    viewProperties.displacementVectorVisibleProperty.linkAttribute( displacementVectorNode, 'visible' );
    viewProperties.equilibriumPositionVisibleProperty.linkAttribute( equilibriumPositionNode, 'visible' );

    // switch between different spring force representations
    Property.multilink( [ viewProperties.springForceVectorVisibleProperty, viewProperties.springForceRepresentationProperty ],
      ( springForceVectorVisible, springForceRepresentation ) => {
        // total
        totalSpringForceVectorNode.visible =
          springForceVectorVisible && ( springForceRepresentation === SpringForceRepresentation.TOTAL );
        // components
        const componentsVisible =
          springForceVectorVisible && ( springForceRepresentation === SpringForceRepresentation.COMPONENTS );
        bottomSpringForceVectorNode.visible = topSpringForceVectorNode.visible = componentsVisible;
      } );

    // position the vectors and truss
    equivalentSpring.rightProperty.link( right => {
      trussNode.x = nibNode.x = appliedForceVectorNode.x = totalSpringForceVectorNode.x = ( options.unitDisplacementLength * right );
    } );
    topSpring.rightProperty.link( right => {
      topSpringForceVectorNode.x = options.unitDisplacementLength * right;
    } );
    bottomSpring.rightProperty.link( right => {
      bottomSpringForceVectorNode.x = options.unitDisplacementLength * right;
    } );

    // Open pincers when displacement is zero and no user interactions affecting displacement are talking place.
    Property.multilink( [ numberOfInteractionsInProgressProperty, equivalentSpring.displacementProperty ],
      ( numberOfInteractions, displacement ) => {
        assert && assert( numberOfInteractions >= 0 );
        const fixedDisplacement = Utils.toFixedNumber( displacement, HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES );
        roboticArmNode.setPincersOpen( numberOfInteractions === 0 && fixedDisplacement === 0 );
      } );

    super( options );
  }
}

hookesLaw.register( 'ParallelSystemNode', ParallelSystemNode );

export default ParallelSystemNode;