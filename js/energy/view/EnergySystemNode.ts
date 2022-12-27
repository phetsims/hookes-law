// Copyright 2015-2022, University of Colorado Boulder

/**
 * EnergySystemNode is a single-spring system for the "Energy" screen.
 * It includes one spring, a robotic arm, and all representations & controls that go with them.
 * The origin is at the point where the spring attaches to the wall.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Utils from '../../../../dot/js/Utils.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { Node, NodeOptions, NodeTranslationOptions } from '../../../../scenery/js/imports.js';
import HookesLawColors from '../../common/HookesLawColors.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import SingleSpringSystem from '../../common/model/SingleSpringSystem.js';
import AppliedForceVectorNode from '../../common/view/AppliedForceVectorNode.js';
import DisplacementVectorNode from '../../common/view/DisplacementVectorNode.js';
import EquilibriumPositionNode from '../../common/view/EquilibriumPositionNode.js';
import HookesLawSpringNode from '../../common/view/HookesLawSpringNode.js';
import NibNode from '../../common/view/NibNode.js';
import RoboticArmNode from '../../common/view/RoboticArmNode.js';
import WallNode from '../../common/view/WallNode.js';
import hookesLaw from '../../hookesLaw.js';
import EnergySpringControls from './EnergySpringControls.js';
import EnergyViewProperties from './EnergyViewProperties.js';

type SelfOptions = {
  unitDisplacementLength?: number; // view length of 1 meter of displacement
};

type EnergySystemNodeOptions = SelfOptions & NodeTranslationOptions & PickRequired<NodeOptions, 'tandem'>;

export default class EnergySystemNode extends Node {

  public constructor( system: SingleSpringSystem, viewProperties: EnergyViewProperties, providedOptions: EnergySystemNodeOptions ) {

    const options = optionize<EnergySystemNodeOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      unitDisplacementLength: 1
    }, providedOptions );

    assert && assert( options.unitDisplacementLength > 0 );

    // to improve readability
    const spring = system.spring;
    const roboticArm = system.roboticArm;

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
    const wallNode = new WallNode( HookesLawConstants.WALL_SIZE, {
      right: options.unitDisplacementLength * spring.leftProperty.value,
      centerY: yOrigin
    } );

    const springNode = new HookesLawSpringNode( spring, {
      frontColor: HookesLawColors.SINGLE_SPRING_FRONT,
      middleColor: HookesLawColors.SINGLE_SPRING_MIDDLE,
      backColor: HookesLawColors.SINGLE_SPRING_BACK,
      loops: HookesLawConstants.SINGLE_SPRING_LOOPS,
      unitDisplacementLength: options.unitDisplacementLength,
      // use x,y exclusively for layout, other translation options are inaccurate because we're using boundsMethod:'none'
      x: options.unitDisplacementLength * spring.leftProperty.value,
      y: yOrigin
    } );

    // pincers grab this
    const nibNode = new NibNode( {
      fill: HookesLawColors.SINGLE_SPRING_MIDDLE,
      // x is determined by rightSpring.leftProperty
      centerY: yOrigin
    } );

    const roboticArmNode = new RoboticArmNode( roboticArm, spring.rightRangeProperty, numberOfInteractionsInProgressProperty, {
      unitDisplacementLength: options.unitDisplacementLength,

      // constrain dragging to multiples of this interval, see https://github.com/phetsims/hookes-law/issues/54
      displacementInterval: HookesLawConstants.ROBOTIC_ARM_DISPLACEMENT_INTERVAL,
      x: options.unitDisplacementLength * roboticArm.right,
      y: yOrigin,
      tandem: options.tandem.createTandem( 'roboticArmNode' )
    } );

    const equilibriumPositionNode = new EquilibriumPositionNode( wallNode.height, {
      centerX: options.unitDisplacementLength * spring.equilibriumXProperty.value,
      centerY: yOrigin,
      visibleProperty: viewProperties.equilibriumPositionVisibleProperty,
      tandem: options.tandem.createTandem( 'equilibriumPositionNode' )
    } );

    const appliedForceVectorNode = new AppliedForceVectorNode(
      spring.appliedForceProperty, viewProperties.valuesVisibleProperty, {
        unitLength: HookesLawConstants.ENERGY_UNIT_FORCE_X, // view length of a 1N force vector
        // x is determined by spring.rightProperty
        // bottom determined empirically, springNode.top is not accurate because we're using boundMethod:'none'
        bottom: springNode.y - 50,
        visibleProperty: viewProperties.appliedForceVectorVisibleProperty,
        tandem: options.tandem.createTandem( 'appliedForceVectorNode' )
      } );

    const displacementVectorNode = new DisplacementVectorNode(
      spring.displacementProperty, viewProperties.valuesVisibleProperty, {
        unitDisplacementLength: options.unitDisplacementLength,
        x: equilibriumPositionNode.centerX,
        // top determined empirically, springNode.bottom is not accurate because we're using boundMethod:'none'
        top: springNode.y + 50,
        visibleProperty: viewProperties.displacementVectorVisibleProperty,
        tandem: options.tandem.createTandem( 'displacementVectorNode' )
      } );

    const springControls = new EnergySpringControls( spring, numberOfInteractionsInProgressProperty, {
      centerX: wallNode.left + ( roboticArmNode.right - wallNode.left ) / 2,
      top: wallNode.bottom + 10,
      maxWidth: roboticArmNode.right - wallNode.left, // constrain width for i18n
      tandem: options.tandem.createTandem( 'springControls' )
    } );

    options.children = [
      equilibriumPositionNode, roboticArmNode, springNode, wallNode, nibNode,
      appliedForceVectorNode, displacementVectorNode,
      springControls
    ];

    //------------------------------------------------
    // Property observers

    // Position the force vectors at the right end of the spring.
    spring.rightProperty.link( right => {
      appliedForceVectorNode.x = nibNode.x = ( options.unitDisplacementLength * right );
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

hookesLaw.register( 'EnergySystemNode', EnergySystemNode );