// Copyright 2015-2022, University of Colorado Boulder

/**
 * SeriesSystemNode is two springs in series, a robotic arm, and all visual representations that go with them.
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
import SeriesSpringControls from './SeriesSpringControls.js';
import SpringForceRepresentation from './SpringForceRepresentation.js';

export default class SeriesSystemNode extends Node {

  /**
   * @param {SeriesSystem} system
   * @param {SystemsViewProperties} viewProperties
   * @param {Object} [options]
   */
  constructor( system, viewProperties, options ) {

    options = merge( {
      unitDisplacementLength: 1, // {number} view length of 1 meter of displacement
      tandem: Tandem.REQUIRED
    }, options );

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
      loops: HookesLawConstants.SERIES_SPRINGS_LOOPS,
      frontColor: HookesLawColors.LEFT_SPRING_FRONT,
      middleColor: HookesLawColors.LEFT_SPRING_MIDDLE,
      backColor: HookesLawColors.LEFT_SPRING_BACK,
      // use x,y exclusively for layout, other translation options are inaccurate because we're using boundsMethod:'none'
      x: options.unitDisplacementLength * leftSpring.leftProperty.value,
      y: yOrigin
    } );

    const rightSpringNode = new HookesLawSpringNode( rightSpring, {
      unitDisplacementLength: options.unitDisplacementLength,
      loops: HookesLawConstants.SERIES_SPRINGS_LOOPS,
      frontColor: HookesLawColors.RIGHT_SPRING_FRONT,
      middleColor: HookesLawColors.RIGHT_SPRING_MIDDLE,
      backColor: HookesLawColors.RIGHT_SPRING_BACK,
      // use x,y exclusively for layout, other translation options are inaccurate because we're using boundsMethod:'none'
      // x is based on rightSpring.leftProperty
      y: yOrigin
    } );

    // pincers grab this
    const nibNode = new NibNode( {
      fill: HookesLawColors.RIGHT_SPRING_MIDDLE,
      // x is based on rightSpring.rightProperty
      centerY: yOrigin
    } );

    const roboticArmNode = new RoboticArmNode( roboticArm, rightSpring.rightRangeProperty, numberOfInteractionsInProgressProperty, {
      unitDisplacementLength: options.unitDisplacementLength,
      x: options.unitDisplacementLength * roboticArm.right,
      y: yOrigin,
      tandem: options.tandem.createTandem( 'roboticArmNode' )
    } );

    const equilibriumPositionNode = new EquilibriumPositionNode( wallNode.height, {
      centerX: options.unitDisplacementLength * equivalentSpring.equilibriumXProperty.value,
      centerY: yOrigin,
      tandem: options.tandem.createTandem( 'equilibriumPositionNode' )
    } );

    const leftSpringForceVectorNode = new SpringForceVectorNode(
      leftSpring.springForceProperty, viewProperties.valuesVisibleProperty, {
        fill: HookesLawColors.LEFT_SPRING,
        decimalPlaces: HookesLawConstants.SERIES_SPRING_FORCE_COMPONENTS_DECIMAL_PLACES,
        // x is determined by leftSpring.rightProperty
        // bottom determined empirically, leftSpringNode.top is not accurate because we're using boundsMethod:'none'
        bottom: leftSpringNode.y - 65,
        tandem: options.tandem.createTandem( 'leftSpringForceVectorNode' )
      } );

    const leftAppliedForceVectorNode = new AppliedForceVectorNode(
      leftSpring.appliedForceProperty, viewProperties.valuesVisibleProperty, {
        fill: HookesLawColors.RIGHT_SPRING,
        // x is determined by leftSpring.rightProperty
        y: leftSpringForceVectorNode.y,
        tandem: options.tandem.createTandem( 'leftAppliedForceVectorNode' )
      } );

    const rightSpringForceVectorNode = new SpringForceVectorNode(
      rightSpring.springForceProperty, viewProperties.valuesVisibleProperty, {
        fill: HookesLawColors.RIGHT_SPRING,
        decimalPlaces: HookesLawConstants.SERIES_SPRING_FORCE_COMPONENTS_DECIMAL_PLACES,
        // x is determined by rightSpring.rightProperty
        bottom: leftSpringForceVectorNode.top - 10,
        tandem: options.tandem.createTandem( 'rightSpringForceVectorNode' )
      } );

    const appliedForceVectorNode = new AppliedForceVectorNode(
      equivalentSpring.appliedForceProperty, viewProperties.valuesVisibleProperty, {
        // x is determined by rightSpring.rightProperty
        y: rightSpringForceVectorNode.y,
        tandem: options.tandem.createTandem( 'appliedForceVectorNode' )
      } );

    const totalSpringForceVectorNode = new SpringForceVectorNode(
      equivalentSpring.springForceProperty, viewProperties.valuesVisibleProperty, {
        // x is determined by rightSpring.rightProperty
        y: appliedForceVectorNode.y,
        tandem: options.tandem.createTandem( 'totalSpringForceVectorNode' )
      } );

    const displacementVectorNode = new DisplacementVectorNode(
      equivalentSpring.displacementProperty, viewProperties.valuesVisibleProperty, {
        unitDisplacementLength: options.unitDisplacementLength,
        x: equilibriumPositionNode.centerX,
        // top determined empirically, leftSpringNode.bottom is not accurate because we're using boundMethod:'none'
        top: leftSpringNode.y + 50,
        tandem: options.tandem.createTandem( 'displacementVectorNode' )
      } );

    const springControls = new SeriesSpringControls( system, numberOfInteractionsInProgressProperty, {
      centerX: wallNode.left + ( roboticArmNode.right - wallNode.left ) / 2,
      top: wallNode.bottom + 25,
      maxWidth: roboticArmNode.right - wallNode.left, // constrain width for i18n
      tandem: options.tandem.createTandem( 'springControls' )
    } );

    assert && assert( !options.children, 'SeriesSystemNode sets children' );
    options.children = [
      equilibriumPositionNode, roboticArmNode, leftSpringNode, rightSpringNode, wallNode, nibNode,
      leftSpringForceVectorNode, leftAppliedForceVectorNode, rightSpringForceVectorNode,
      appliedForceVectorNode, totalSpringForceVectorNode, displacementVectorNode,
      springControls
    ];

    //------------------------------------------------
    // Property observers

    // Attach visibility properties to their respective nodes.
    viewProperties.appliedForceVectorVisibleProperty.linkAttribute( appliedForceVectorNode, 'visible' );
    viewProperties.displacementVectorVisibleProperty.linkAttribute( displacementVectorNode, 'visible' );
    viewProperties.equilibriumPositionVisibleProperty.linkAttribute( equilibriumPositionNode, 'visible' );

    // move the right spring
    rightSpring.leftProperty.link( left => {
      // use x for positioning, other translation options are inaccurate because we're using boundsMethod:'none'
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

    // Open pincers when displacement is zero and no user interactions affecting displacement are talking place.
    Multilink.multilink( [ numberOfInteractionsInProgressProperty, equivalentSpring.displacementProperty ],
      ( numberOfInteractions, displacement ) => {
        assert && assert( numberOfInteractions >= 0 );
        const fixedDisplacement = Utils.toFixedNumber( displacement, HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES );
        roboticArmNode.setPincersOpen( numberOfInteractions === 0 && fixedDisplacement === 0 );
      } );

    super( options );
  }
}

hookesLaw.register( 'SeriesSystemNode', SeriesSystemNode );