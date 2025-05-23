// Copyright 2015-2025, University of Colorado Boulder

/**
 * IntroSystemNode is the single-spring system for the "Intro" screen.
 * It includes one spring, a robotic arm, and all visual representations that go with them.
 * The origin is at the point where the spring attaches to the wall.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import { toFixedNumber } from '../../../../dot/js/util/toFixedNumber.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import Node, { NodeOptions, NodeTranslationOptions } from '../../../../scenery/js/nodes/Node.js';
import HookesLawColors from '../../common/HookesLawColors.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import SingleSpringSystem from '../../common/model/SingleSpringSystem.js';
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
import IntroViewProperties from './IntroViewProperties.js';

type SelfOptions = {
  systemNumber: number; // integer used to label the system
  unitDisplacementLength?: number; // view length of 1 meter of displacement
};

type IntroSystemNodeOptions = SelfOptions & NodeTranslationOptions & PickRequired<NodeOptions, 'tandem'>;

export default class IntroSystemNode extends Node {

  public constructor( system: SingleSpringSystem, viewProperties: IntroViewProperties, providedOptions: IntroSystemNodeOptions ) {

    const options = optionize<IntroSystemNodeOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      unitDisplacementLength: 1,

      // NodeOptions
      phetioVisiblePropertyInstrumented: false // see https://github.com/phetsims/hookes-law/issues/111
    }, providedOptions );

    assert && assert( Number.isInteger( options.systemNumber ) && options.systemNumber >= 1 );
    assert && assert( options.unitDisplacementLength > 0 );

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
      unitDisplacementLength: options.unitDisplacementLength,
      parametricSpringNodeOptions: {
        loops: HookesLawConstants.SINGLE_SPRING_LOOPS,
        frontColor: HookesLawColors.singleSpringFrontColorProperty,
        middleColor: HookesLawColors.singleSpringMiddleColorProperty,
        backColor: HookesLawColors.singleSpringBackColorProperty
      },
      x: xOrigin,
      y: yOrigin,
      tandem: options.tandem.createTandem( 'springNode' )
    } );

    // Piece on the spring the is grabbed by the robotic arm's grippers.
    const nibNode = new NibNode( {
      fill: HookesLawColors.singleSpringMiddleColorProperty,
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
      visibleProperty: viewProperties.equilibriumPositionVisibleProperty
    } );

    const appliedForceVectorNode = new AppliedForceVectorNode(
      spring.appliedForceProperty, viewProperties.valuesVisibleProperty, {
        // x is determined by spring.rightProperty
        bottom: springNode.y - 50, // determined empirically
        visibleProperty: viewProperties.appliedForceVectorVisibleProperty
      } );

    const springForceVectorNode = new SpringForceVectorNode(
      spring.springForceProperty, viewProperties.valuesVisibleProperty, {
        // x is determined by spring.rightProperty
        y: appliedForceVectorNode.y,
        visibleProperty: viewProperties.springForceVectorVisibleProperty
      } );

    const displacementVectorNode = new DisplacementVectorNode(
      spring.displacementProperty, viewProperties.valuesVisibleProperty, {
        unitDisplacementLength: options.unitDisplacementLength,
        x: equilibriumPositionNode.centerX,
        top: springNode.y + 50, // determined empirically
        visibleProperty: viewProperties.displacementVectorVisibleProperty
      } );

    const springControls = new IntroSpringControls( spring, numberOfInteractionsInProgressProperty, {
      systemNumber: options.systemNumber,
      centerX: wallNode.left + ( roboticArmNode.right - wallNode.left ) / 2,
      top: wallNode.bottom + 10,
      maxWidth: roboticArmNode.right - wallNode.left, // constrain width for i18n
      tandem: options.tandem.createTandem( 'springControls' )
    } );

    options.children = [
      equilibriumPositionNode, roboticArmNode, springNode, wallNode, nibNode,
      appliedForceVectorNode, springForceVectorNode, displacementVectorNode,
      springControls
    ];

    //------------------------------------------------
    // Property observers

    // Position the force vectors at the right end of the spring.
    spring.rightProperty.link( right => {
      appliedForceVectorNode.x = springForceVectorNode.x = nibNode.x = ( options.unitDisplacementLength * right );
    } );

    // Open robotic arm's grippers when displacement is zero and no user interactions affecting displacement are talking place.
    Multilink.multilink( [ numberOfInteractionsInProgressProperty, spring.displacementProperty ],
      ( numberOfInteractions, displacement ) => {
        assert && assert( numberOfInteractions >= 0 );
        const fixedDisplacement = toFixedNumber( displacement, HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES );
        roboticArmNode.setGrippersOpen( numberOfInteractions === 0 && fixedDisplacement === 0 );
      } );

    super( options );
  }
}

hookesLaw.register( 'IntroSystemNode', IntroSystemNode );