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
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  var RoboticArmNode = require( 'HOOKES_LAW/common/view/RoboticArmNode' );
  var SeriesSpringControls = require( 'HOOKES_LAW/systems/view/SeriesSpringControls' );
  var SpringForceVectorNode = require( 'HOOKES_LAW/common/view/SpringForceVectorNode' );
  var SpringNode = require( 'HOOKES_LAW/common/view/SpringNode' );
  var WallNode = require( 'HOOKES_LAW/common/view/WallNode' );

  /**
   * @param {SeriesSystem} system
   * @param {ModelViewTransform2} modelViewTransform
   * @param {SystemViewProperties} viewProperties
   * @param {Object} [options]
   * @constructor
   */
  function SeriesSystemNode( system, modelViewTransform, viewProperties, options ) {

    options = options || {};

    Node.call( this );

    // to improve readability
    var leftSpring = system.leftSpring;
    var rightSpring = system.rightSpring;
    var roboticArm = system.roboticArm;
    var equivalentSpring = system.equivalentSpring;

    // This sim operates in 1 dimension (x), so center everything on y = 0.
    var yOrigin = modelViewTransform.modelToViewY( 0 );

    // Scene graph -----------------------------------------------------------------------------------------------------------------------------------

    // origin is at right-center of wall
    var wallNode = new WallNode( HookesLawConstants.WALL_SIZE, {
      right: modelViewTransform.modelToViewX( leftSpring.leftProperty.get() ),
      centerY: yOrigin
    } );

    var leftSpringNode = new SpringNode( leftSpring, modelViewTransform, {
      numberOfCoils: 6,
      stroke: HookesLawColors.LEFT_SPRING_FORCE,
      left: modelViewTransform.modelToViewX( leftSpring.leftProperty.get() ),
      centerY: yOrigin
    } );

    var rightSpringNode = new SpringNode( rightSpring, modelViewTransform, {
      numberOfCoils: 6,
      stroke: HookesLawColors.RIGHT_SPRING_FORCE,
      // left is based on rightSpring.leftProperty
      centerY: yOrigin
    } );

    var roboticArmNode = new RoboticArmNode( roboticArm, rightSpring.rightRangeProperty, equivalentSpring.equilibriumXProperty.get(), modelViewTransform, {
      x: modelViewTransform.modelToViewX( roboticArm.right ),
      y: yOrigin
    } );

    var equilibriumPositionNode = new EquilibriumPositionNode( wallNode.height, {
      centerX: modelViewTransform.modelToViewX( equivalentSpring.equilibriumXProperty.get() ),
      centerY: yOrigin
    } );

    var leftSpringForceVectorNode = new SpringForceVectorNode( leftSpring.springForceProperty, {
      valueVisibleProperty: viewProperties.valuesVisibleProperty,
      fill: HookesLawColors.LEFT_SPRING_FORCE,
      // x is determined by leftSpring.rightProperty
      bottom: leftSpringNode.top - 25
    } );

    var leftAppliedForceVectorNode = new AppliedForceVectorNode( leftSpring.appliedForceProperty, {
      valueVisibleProperty: viewProperties.valuesVisibleProperty,
      fill: HookesLawColors.RIGHT_SPRING_FORCE,
      // x is determined by leftSpring.rightProperty
      y: leftSpringForceVectorNode.y
    } );

    var rightSpringForceVectorNode = new SpringForceVectorNode( rightSpring.springForceProperty, {
      valueVisibleProperty: viewProperties.valuesVisibleProperty,
      fill: HookesLawColors.RIGHT_SPRING_FORCE,
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
      modelViewTransform: modelViewTransform,
      valueVisibleProperty: viewProperties.valuesVisibleProperty,
      x: equilibriumPositionNode.centerX,
      top: leftSpringNode.bottom + 8
    } );

    var springControls = new SeriesSpringControls( system, {
      scale: 0.75,
      centerX: wallNode.left + ( roboticArmNode.right - wallNode.left ) / 2,
      top: wallNode.bottom + 25
    } );

    options.children = [
      wallNode, equilibriumPositionNode, roboticArmNode, leftSpringNode, rightSpringNode,
      leftSpringForceVectorNode, leftAppliedForceVectorNode, rightSpringForceVectorNode,
      appliedForceVectorNode, totalSpringForceVectorNode, displacementVectorNode,
      springControls
    ];

    // Property observers ----------------------------------------------------------------------------------------------------------------------------

    // Attach visibility properties to their respective nodes.
    viewProperties.appliedForceVectorVisibleProperty.linkAttribute( appliedForceVectorNode, 'visible' );
    viewProperties.displacementVectorVisibleProperty.linkAttribute( displacementVectorNode, 'visible' );
    viewProperties.equilibriumPositionVisibleProperty.linkAttribute( equilibriumPositionNode, 'visible' );

    // switch between different spring force representations
    Property.multilink( [ viewProperties.springForceVectorVisibleProperty, viewProperties.springForceRepresentationProperty ],
      function( springForceVectorVisible, springForceRepresentation ) {
        // total
        totalSpringForceVectorNode.visible = springForceVectorVisible && springForceRepresentation === 'total';
        // components
        var componentsVisible = springForceVectorVisible && springForceRepresentation === 'components';
        rightSpringForceVectorNode.visible = leftSpringForceVectorNode.visible = leftAppliedForceVectorNode.visible = componentsVisible;
      } );

    rightSpring.leftProperty.link( function( left ) {
      rightSpringNode.left = modelViewTransform.modelToViewX( left );
    } );

    // Position the vectors
    equivalentSpring.rightProperty.link( function( right ) {
      appliedForceVectorNode.x = totalSpringForceVectorNode.x = modelViewTransform.modelToViewX( right );
    } );
    leftSpring.rightProperty.link( function( right ) {
      leftSpringForceVectorNode.x = leftAppliedForceVectorNode.x = modelViewTransform.modelToViewX( right );
    } );
    rightSpring.rightProperty.link( function( right ) {
      rightSpringForceVectorNode.x = modelViewTransform.modelToViewX( right );
    } );

    this.mutate( options );
  }

  return inherit( Node, SeriesSystemNode );
} );
