// Copyright 2015-2022, University of Colorado Boulder

/**
 * IntroSystemNode is the single-spring system for the "Intro" screen.
 * It includes one spring, a robotic arm, and all visual representations that go with them.
 * The origin is at the point where the spring attaches to the wall.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import { Node } from '../../../../scenery/js/imports.js';
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
import IntroSpringControls from './IntroSpringControls.js';

export default class IntroSystemNode extends Node {
  /**
   * @param {SingleSpringSystem} system
   * @param {IntroViewProperties} viewProperties
   * @param {Object} [options]
   */
  constructor( system, viewProperties, options ) {

    options = merge( {
      unitDisplacementLength: 1, // {number} view length of 1 meter of displacement
      systemNumber: 1, // integer used to label the system

      // phet-io
      tandem: Tandem.REQUIRED
    }, options );

    // to improve readability
    const spring = system.spring;
    const roboticArm = system.roboticArm;

    // This sim operates in 1 dimension (x), so center everything on y = 0.
    const xOrigin = options.unitDisplacementLength * spring.leftProperty.value;
    const yOrigin = 0;

    // number of interactions in progress that affect displacement
    const numberOfInteractionsInProgressProperty = new NumberProperty( 0, {
      numberType: 'Integer',
      isValidValue: value => ( value >= 0 )
    } );

    //------------------------------------------------
    // Scene graph

    // origin is at right-center of wall
    const wallNode = new WallNode( HookesLawConstants.WALL_SIZE, {
      right: xOrigin,
      centerY: yOrigin
    } );

    const springNode = new HookesLawSpringNode( spring, {
      frontColor: HookesLawColors.SINGLE_SPRING_FRONT,
      middleColor: HookesLawColors.SINGLE_SPRING_MIDDLE,
      backColor: HookesLawColors.SINGLE_SPRING_BACK,
      loops: HookesLawConstants.SINGLE_SPRING_LOOPS,
      unitDisplacementLength: options.unitDisplacementLength,
      // use x,y exclusively for layout, other translation options are inaccurate because we're using boundsMethod:'none'
      x: xOrigin,
      y: yOrigin
    } );

    // pincers grab this
    const nibNode = new NibNode( {
      fill: HookesLawColors.SINGLE_SPRING_MIDDLE,
      // x is based on rightSpring.leftProperty
      centerY: yOrigin
    } );

    const roboticArmNode = new RoboticArmNode( roboticArm, spring.rightRangeProperty, numberOfInteractionsInProgressProperty, {
      unitDisplacementLength: options.unitDisplacementLength,
      x: options.unitDisplacementLength * roboticArm.right,
      y: yOrigin,
      tandem: options.tandem.createTandem( 'roboticArmNode' )
    } );

    const equilibriumPositionNode = new EquilibriumPositionNode( wallNode.height, {
      centerX: options.unitDisplacementLength * spring.equilibriumXProperty.value,
      centerY: yOrigin,
      tandem: options.tandem.createTandem( 'equilibriumPositionNode' )
    } );

    const appliedForceVectorNode = new AppliedForceVectorNode(
      spring.appliedForceProperty, viewProperties.valuesVisibleProperty, {
        // x is determined by spring.rightProperty
        // bottom determined empirically, springNode.top is not accurate because we're using boundsMethod:'none'
        bottom: springNode.y - 50,
        tandem: options.tandem.createTandem( 'appliedForceVectorNode' )
      } );

    const springForceVectorNode = new SpringForceVectorNode(
      spring.springForceProperty, viewProperties.valuesVisibleProperty, {
        // x is determined by spring.rightProperty
        y: appliedForceVectorNode.y,
        tandem: options.tandem.createTandem( 'springForceVectorNode' )
      } );

    const displacementVectorNode = new DisplacementVectorNode(
      spring.displacementProperty, viewProperties.valuesVisibleProperty, {
        unitDisplacementLength: options.unitDisplacementLength,
        x: equilibriumPositionNode.centerX,
        // top determined empirically, springNode.bottom is not accurate because we're using boundMethod:'none'
        top: springNode.y + 50,
        tandem: options.tandem.createTandem( 'displacementVectorNode' )
      } );

    const springControls = new IntroSpringControls( spring, numberOfInteractionsInProgressProperty, {
      systemNumber: options.systemNumber,
      centerX: wallNode.left + ( roboticArmNode.right - wallNode.left ) / 2,
      top: wallNode.bottom + 10,
      maxWidth: roboticArmNode.right - wallNode.left, // constrain width for i18n
      tandem: options.tandem.createTandem( 'springControls' )
    } );

    assert && assert( !options.children, 'IntroSystemNode sets children' );
    options.children = [
      equilibriumPositionNode, roboticArmNode, springNode, wallNode, nibNode,
      appliedForceVectorNode, springForceVectorNode, displacementVectorNode,
      springControls
    ];

    //------------------------------------------------
    // Property observers

    // Attach visibility properties to their respective nodes.
    viewProperties.appliedForceVectorVisibleProperty.linkAttribute( appliedForceVectorNode, 'visible' );
    viewProperties.springForceVectorVisibleProperty.linkAttribute( springForceVectorNode, 'visible' );
    viewProperties.displacementVectorVisibleProperty.linkAttribute( displacementVectorNode, 'visible' );
    viewProperties.equilibriumPositionVisibleProperty.linkAttribute( equilibriumPositionNode, 'visible' );

    // Position the force vectors at the right end of the spring.
    spring.rightProperty.link( right => {
      appliedForceVectorNode.x = springForceVectorNode.x = nibNode.x = ( options.unitDisplacementLength * right );
    } );

    // Open pincers when displacement is zero and no user interactions affecting displacement are talking place.
    Multilink.multilink( [ numberOfInteractionsInProgressProperty, spring.displacementProperty ],
      ( numberOfInteractions, displacement ) => {
        assert && assert( numberOfInteractions >= 0 );
        const fixedDisplacement = Utils.toFixedNumber( displacement, HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES );
        roboticArmNode.setPincersOpen( numberOfInteractions === 0 && fixedDisplacement === 0 );
      } );

    super( options );
  }
}

hookesLaw.register( 'IntroSystemNode', IntroSystemNode );