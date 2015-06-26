// Copyright 2002-2015, University of Colorado Boulder

/**
 * Two springs in series, a robotic arm, and all of the visual representations that go with them.
 * Origin is at the point where the spring attaches to the wall.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var AppliedForceVectorNode = require( 'HOOKES_LAW/common/view/AppliedForceVectorNode' );
  var DisplacementVectorNode = require( 'HOOKES_LAW/common/view/DisplacementVectorNode' );
  var EquilibriumPositionNode = require( 'HOOKES_LAW/common/view/EquilibriumPositionNode' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var HookesLawSpringNode = require( 'HOOKES_LAW/common/view/HookesLawSpringNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NibNode = require( 'HOOKES_LAW/common/view/NibNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  var RoboticArmNode = require( 'HOOKES_LAW/common/view/RoboticArmNode' );
  var SeriesSpringControls = require( 'HOOKES_LAW/systems/view/SeriesSpringControls' );
  var SpringForceVectorNode = require( 'HOOKES_LAW/common/view/SpringForceVectorNode' );
  var Util = require( 'DOT/Util' );
  var WallNode = require( 'HOOKES_LAW/common/view/WallNode' );

  /**
   * @param {SeriesSystem} system
   * @param {SystemViewProperties} viewProperties
   * @param {Object} [options]
   * @constructor
   */
  function SeriesSystemNode( system, viewProperties, options ) {

    options = _.extend( {
      unitDisplacementLength: 1 // {number} view length of 1 meter of displacement
    }, options );

    // to improve readability
    var leftSpring = system.leftSpring;
    var rightSpring = system.rightSpring;
    var roboticArm = system.roboticArm;
    var equivalentSpring = system.equivalentSpring;

    // This sim operates in 1 dimension (x), so center everything on y = 0.
    var yOrigin = 0;

    // number of interactions in progress that affect displacement
    var numberOfInteractionsInProgressProperty = new Property( 0 );

    // Scene graph -----------------------------------------------------------------------------------------------------------------------------------

    // origin is at right-center of wall
    var wallNode = new WallNode( HookesLawConstants.WALL_SIZE, {
      right: options.unitDisplacementLength * leftSpring.leftProperty.get(),
      centerY: yOrigin
    } );

    var leftSpringNode = new HookesLawSpringNode( leftSpring, {
      unitDisplacementLength: options.unitDisplacementLength,
      loops: HookesLawConstants.SERIES_SPRINGS_LOOPS,
      frontColor: HookesLawColors.LEFT_SPRING_FRONT,
      middleColor: HookesLawColors.LEFT_SPRING_MIDDLE,
      backColor: HookesLawColors.LEFT_SPRING_BACK,
      left: options.unitDisplacementLength * leftSpring.leftProperty.get(),
      centerY: yOrigin
    } );

    var rightSpringNode = new HookesLawSpringNode( rightSpring, {
      unitDisplacementLength: options.unitDisplacementLength,
      loops: HookesLawConstants.SERIES_SPRINGS_LOOPS,
      frontColor: HookesLawColors.RIGHT_SPRING_FRONT,
      middleColor: HookesLawColors.RIGHT_SPRING_MIDDLE,
      backColor: HookesLawColors.RIGHT_SPRING_BACK,
      // left is based on rightSpring.leftProperty
      centerY: yOrigin
    } );

    // pincers grab this
    var nibNode = new NibNode( {
      fill: HookesLawColors.RIGHT_SPRING_MIDDLE,
      // x is based on rightSpring.leftProperty
      centerY: yOrigin
    } );

    var roboticArmNode = new RoboticArmNode( roboticArm, rightSpring.rightRangeProperty, numberOfInteractionsInProgressProperty, {
      unitDisplacementLength: options.unitDisplacementLength,
      x: options.unitDisplacementLength * roboticArm.right,
      y: yOrigin
    } );

    var equilibriumPositionNode = new EquilibriumPositionNode( wallNode.height, {
      centerX: options.unitDisplacementLength * equivalentSpring.equilibriumXProperty.get(),
      centerY: yOrigin
    } );

    var leftSpringForceVectorNode = new SpringForceVectorNode( leftSpring.springForceProperty, {
      valueVisibleProperty: viewProperties.valuesVisibleProperty,
      fill: HookesLawColors.LEFT_SPRING,
      // x is determined by leftSpring.rightProperty
      bottom: leftSpringNode.top - 25
    } );

    var leftAppliedForceVectorNode = new AppliedForceVectorNode( leftSpring.appliedForceProperty, {
      valueVisibleProperty: viewProperties.valuesVisibleProperty,
      fill: HookesLawColors.RIGHT_SPRING,
      // x is determined by leftSpring.rightProperty
      y: leftSpringForceVectorNode.y
    } );

    var rightSpringForceVectorNode = new SpringForceVectorNode( rightSpring.springForceProperty, {
      valueVisibleProperty: viewProperties.valuesVisibleProperty,
      fill: HookesLawColors.RIGHT_SPRING,
      // x is determined by rightSpring.rightProperty
      bottom: leftSpringForceVectorNode.top - 10
    } );

    var appliedForceVectorNode = new AppliedForceVectorNode( equivalentSpring.appliedForceProperty, {
      valueVisibleProperty: viewProperties.valuesVisibleProperty,
      // x is determined by rightSpring.rightProperty
      y: rightSpringForceVectorNode.y
    } );

    var totalSpringForceVectorNode = new SpringForceVectorNode( equivalentSpring.springForceProperty, {
      valueVisibleProperty: viewProperties.valuesVisibleProperty,
      // x is determined by rightSpring.rightProperty
      y: appliedForceVectorNode.y
    } );

    var displacementVectorNode = new DisplacementVectorNode( equivalentSpring.displacementProperty, {
      unitDisplacementLength: options.unitDisplacementLength,
      valueVisibleProperty: viewProperties.valuesVisibleProperty,
      x: equilibriumPositionNode.centerX,
      top: leftSpringNode.bottom + 8
    } );

    var springControls = new SeriesSpringControls( system, numberOfInteractionsInProgressProperty, {
      centerX: wallNode.left + ( roboticArmNode.right - wallNode.left ) / 2,
      top: wallNode.bottom + 25,
      maxWidth: roboticArmNode.right - wallNode.left // constrain width for i18n
    } );

    options.children = [
      wallNode, equilibriumPositionNode, roboticArmNode, leftSpringNode, rightSpringNode, nibNode,
      leftSpringForceVectorNode, leftAppliedForceVectorNode, rightSpringForceVectorNode,
      appliedForceVectorNode, totalSpringForceVectorNode, displacementVectorNode,
      springControls
    ];

    // Property observers ----------------------------------------------------------------------------------------------------------------------------

    // Attach visibility properties to their respective nodes.
    viewProperties.appliedForceVectorVisibleProperty.linkAttribute( appliedForceVectorNode, 'visible' );
    viewProperties.displacementVectorVisibleProperty.linkAttribute( displacementVectorNode, 'visible' );
    viewProperties.equilibriumPositionVisibleProperty.linkAttribute( equilibriumPositionNode, 'visible' );

    // move the right spring
    rightSpring.leftProperty.link( function( left ) {
      rightSpringNode.left = ( options.unitDisplacementLength * left );
    } );

    // switch between different spring force representations
    Property.multilink( [ viewProperties.springForceVectorVisibleProperty, viewProperties.springForceRepresentationProperty ],
      function( springForceVectorVisible, springForceRepresentation ) {
        // total
        totalSpringForceVectorNode.visible = springForceVectorVisible && springForceRepresentation === 'total';
        // components
        var componentsVisible = springForceVectorVisible && springForceRepresentation === 'components';
        rightSpringForceVectorNode.visible = leftSpringForceVectorNode.visible = leftAppliedForceVectorNode.visible = componentsVisible;
      } );

    // position the vectors
    equivalentSpring.rightProperty.link( function( right ) {
      appliedForceVectorNode.x = totalSpringForceVectorNode.x = ( options.unitDisplacementLength * right );
    } );
    leftSpring.rightProperty.link( function( right ) {
      leftSpringForceVectorNode.x = leftAppliedForceVectorNode.x = ( options.unitDisplacementLength * right );
    } );
    rightSpring.rightProperty.link( function( right ) {
      rightSpringForceVectorNode.x = nibNode.x = ( options.unitDisplacementLength * right );
    } );

    // Open pincers when displacement is zero and no user interactions affecting displacement are talking place.
    Property.multilink( [ numberOfInteractionsInProgressProperty, equivalentSpring.displacementProperty ],
      function( numberOfInteractions, displacement ) {
        assert && assert( numberOfInteractions >= 0 );
        var fixedDisplacement = Util.toFixedNumber( displacement, HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES );
        roboticArmNode.setPincersOpen( numberOfInteractions === 0 && fixedDisplacement === 0 );
      } );

    Node.call( this, options );
  }

  return inherit( Node, SeriesSystemNode );
} );
