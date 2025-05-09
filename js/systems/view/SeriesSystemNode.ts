// Copyright 2015-2025, University of Colorado Boulder

/**
 * SeriesSystemNode is two springs in series, a robotic arm, and all visual representations that go with them.
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
import AppliedForceVectorNode from '../../common/view/AppliedForceVectorNode.js';
import DisplacementVectorNode from '../../common/view/DisplacementVectorNode.js';
import EquilibriumPositionNode from '../../common/view/EquilibriumPositionNode.js';
import HookesLawSpringNode from '../../common/view/HookesLawSpringNode.js';
import NibNode from '../../common/view/NibNode.js';
import RoboticArmNode from '../../common/view/RoboticArmNode.js';
import SpringForceVectorNode from '../../common/view/SpringForceVectorNode.js';
import WallNode from '../../common/view/WallNode.js';
import hookesLaw from '../../hookesLaw.js';
import SeriesSystem from '../model/SeriesSystem.js';
import SeriesSpringControls from './SeriesSpringControls.js';
import SpringForceRepresentation from './SpringForceRepresentation.js';
import SystemsViewProperties from './SystemsViewProperties.js';

type SelfOptions = {
  unitDisplacementLength?: number; // view length of 1 meter of displacement
};

type SeriesSystemNodeOptions = SelfOptions & NodeTranslationOptions & PickRequired<NodeOptions, 'tandem' | 'visibleProperty'>;

export default class SeriesSystemNode extends Node {

  public constructor( system: SeriesSystem, viewProperties: SystemsViewProperties, providedOptions: SeriesSystemNodeOptions ) {

    const options = optionize<SeriesSystemNodeOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      unitDisplacementLength: 1
    }, providedOptions );

    // to improve readability
    const leftSpring = system.leftSpring;
    const rightSpring = system.rightSpring;
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
    const wallNode = new WallNode( HookesLawConstants.WALL_SIZE, {
      right: options.unitDisplacementLength * leftSpring.leftProperty.value,
      centerY: yOrigin
    } );

    const leftSpringNode = new HookesLawSpringNode( leftSpring, {
      unitDisplacementLength: options.unitDisplacementLength,
      parametricSpringNodeOptions: {
        loops: HookesLawConstants.SERIES_SPRINGS_LOOPS,
        frontColor: HookesLawColors.spring1FrontColorProperty,
        middleColor: HookesLawColors.spring1MiddleColorProperty,
        backColor: HookesLawColors.spring1BackColorProperty
      },
      x: options.unitDisplacementLength * leftSpring.leftProperty.value,
      y: yOrigin,
      tandem: options.tandem.createTandem( 'leftSpringNode' )
    } );

    const rightSpringNode = new HookesLawSpringNode( rightSpring, {
      unitDisplacementLength: options.unitDisplacementLength,
      parametricSpringNodeOptions: {
        loops: HookesLawConstants.SERIES_SPRINGS_LOOPS,
        frontColor: HookesLawColors.spring2FrontColorProperty,
        middleColor: HookesLawColors.spring2MiddleColorProperty,
        backColor: HookesLawColors.spring2BackColorProperty
      },
      // x is based on rightSpring.leftProperty
      y: yOrigin,
      tandem: options.tandem.createTandem( 'rightSpringNode' )
    } );

    // Piece on the spring the is grabbed by the robotic arm's grippers.
    const nibNode = new NibNode( {
      fill: HookesLawColors.spring2MiddleColorProperty,
      // x is based on rightSpring.rightProperty
      centerY: yOrigin
    } );

    const roboticArmNode = new RoboticArmNode( roboticArm, equivalentSpring.rightRangeProperty, numberOfInteractionsInProgressProperty, {
      unitDisplacementLength: options.unitDisplacementLength,
      x: options.unitDisplacementLength * roboticArm.right,
      y: yOrigin,
      tandem: options.tandem.createTandem( 'roboticArmNode' )
    } );

    const equilibriumPositionNode = new EquilibriumPositionNode( wallNode.height, {
      centerX: options.unitDisplacementLength * equivalentSpring.equilibriumXProperty.value,
      centerY: yOrigin,
      visibleProperty: viewProperties.equilibriumPositionVisibleProperty
    } );

    const leftSpringForceVectorNode = new SpringForceVectorNode(
      leftSpring.springForceProperty, viewProperties.valuesVisibleProperty, {
        fill: HookesLawColors.spring1MiddleColorProperty,
        decimalPlaces: HookesLawConstants.SERIES_SPRING_FORCE_COMPONENTS_DECIMAL_PLACES,
        // x is determined by leftSpring.rightProperty
        bottom: leftSpringNode.y - 65 // determined empirically
      } );

    const leftAppliedForceVectorNode = new AppliedForceVectorNode(
      leftSpring.appliedForceProperty, viewProperties.valuesVisibleProperty, {
        fill: HookesLawColors.spring2MiddleColorProperty,
        // x is determined by leftSpring.rightProperty
        y: leftSpringForceVectorNode.y
      } );

    const rightSpringForceVectorNode = new SpringForceVectorNode(
      rightSpring.springForceProperty, viewProperties.valuesVisibleProperty, {
        fill: HookesLawColors.spring2MiddleColorProperty,
        decimalPlaces: HookesLawConstants.SERIES_SPRING_FORCE_COMPONENTS_DECIMAL_PLACES,
        // x is determined by rightSpring.rightProperty
        bottom: leftSpringForceVectorNode.top - 10
      } );

    const appliedForceVectorNode = new AppliedForceVectorNode(
      equivalentSpring.appliedForceProperty, viewProperties.valuesVisibleProperty, {
        // x is determined by rightSpring.rightProperty
        y: rightSpringForceVectorNode.y,
        visibleProperty: viewProperties.appliedForceVectorVisibleProperty
      } );

    const totalSpringForceVectorNode = new SpringForceVectorNode(
      equivalentSpring.springForceProperty, viewProperties.valuesVisibleProperty, {
        // x is determined by rightSpring.rightProperty
        y: appliedForceVectorNode.y
      } );

    const displacementVectorNode = new DisplacementVectorNode(
      equivalentSpring.displacementProperty, viewProperties.valuesVisibleProperty, {
        unitDisplacementLength: options.unitDisplacementLength,
        x: equilibriumPositionNode.centerX,
        // top determined empirically, leftSpringNode.bottom is not accurate because we're using boundMethod:'none'
        top: leftSpringNode.y + 50,
        visibleProperty: viewProperties.displacementVectorVisibleProperty
      } );

    const springControls = new SeriesSpringControls( system, numberOfInteractionsInProgressProperty, {
      centerX: wallNode.left + ( roboticArmNode.right - wallNode.left ) / 2,
      top: wallNode.bottom + 25,
      maxWidth: roboticArmNode.right - wallNode.left, // constrain width for i18n
      tandem: options.tandem.createTandem( 'springControls' )
    } );

    options.children = [
      equilibriumPositionNode, roboticArmNode, leftSpringNode, rightSpringNode, wallNode, nibNode,
      leftSpringForceVectorNode, leftAppliedForceVectorNode, rightSpringForceVectorNode,
      appliedForceVectorNode, totalSpringForceVectorNode, displacementVectorNode,
      springControls
    ];

    //------------------------------------------------
    // Property observers

    // move the right spring
    rightSpring.leftProperty.link( left => {
      rightSpringNode.x = ( options.unitDisplacementLength * left );
    } );

    // switch between different spring force representations
    Multilink.multilink( [ viewProperties.springForceVectorVisibleProperty, viewProperties.springForceRepresentationProperty ],
      ( springForceVectorVisible, springForceRepresentation ) => {

        // total
        totalSpringForceVectorNode.visible =
          springForceVectorVisible && ( springForceRepresentation === SpringForceRepresentation.TOTAL );

        // components
        const componentsVisible =
          springForceVectorVisible && ( springForceRepresentation === SpringForceRepresentation.COMPONENTS );
        rightSpringForceVectorNode.visible = leftSpringForceVectorNode.visible = leftAppliedForceVectorNode.visible = componentsVisible;
      } );

    // position the vectors
    equivalentSpring.rightProperty.link( right => {
      appliedForceVectorNode.x = totalSpringForceVectorNode.x = ( options.unitDisplacementLength * right );
    } );
    leftSpring.rightProperty.link( right => {
      leftSpringForceVectorNode.x = leftAppliedForceVectorNode.x = ( options.unitDisplacementLength * right );
    } );
    rightSpring.rightProperty.link( right => {
      rightSpringForceVectorNode.x = nibNode.x = ( options.unitDisplacementLength * right );
    } );

    // Open robotic arm's grippers when displacement is zero and no user interactions affecting displacement are talking place.
    Multilink.multilink( [ numberOfInteractionsInProgressProperty, equivalentSpring.displacementProperty ],
      ( numberOfInteractions, displacement ) => {
        assert && assert( numberOfInteractions >= 0 );
        const fixedDisplacement = toFixedNumber( displacement, HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES );
        roboticArmNode.setGrippersOpen( numberOfInteractions === 0 && fixedDisplacement === 0 );
      } );

    super( options );
  }
}

hookesLaw.register( 'SeriesSystemNode', SeriesSystemNode );