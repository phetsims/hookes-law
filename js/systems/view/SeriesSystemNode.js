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
  var Dimension2 = require( 'DOT/Dimension2' );
  var DisplacementVectorNode = require( 'HOOKES_LAW/common/view/DisplacementVectorNode' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var RoboticArmNode = require( 'HOOKES_LAW/common/view/RoboticArmNode' );
  var SeriesSpringControls = require( 'HOOKES_LAW/systems/view/SeriesSpringControls' );
  var SpringForceVectorNode = require( 'HOOKES_LAW/common/view/SpringForceVectorNode' );
  var SpringNode = require( 'HOOKES_LAW/common/view/SpringNode' );
  var WallNode = require( 'HOOKES_LAW/common/view/WallNode' );

  // constants
  var WALL_SIZE = new Dimension2( 25, 170 );
  var EQUILIBRIUM_LINE_LENGTH = WALL_SIZE.height;

  /**
   * @param {SeriesSystem} system
   * @param {ModelViewTransform2} modelViewTransform
   * @param {SystemViewProperties} viewProperties
   * @param {Object} [options]
   * @constructor
   */
  function SeriesSystemNode( system, modelViewTransform, viewProperties, options ) {

    // to improve readability
    var leftSpring = system.leftSpring;
    var rightSpring = system.rightSpring;
    var roboticArm = system.roboticArm;

    // This sim operates in 1 dimension (x), so center everything on y = 0.
    var yOrigin = modelViewTransform.modelToViewY( 0 );

    // origin is at right-center of wall
    var wallNode = new WallNode( WALL_SIZE, {
      right: modelViewTransform.modelToViewX( leftSpring.leftProperty.get() ),
      centerY: yOrigin
    } );

    var leftSpringNode = new SpringNode( leftSpring, modelViewTransform, {
      stroke: HookesLawColors.LEFT_SPRING_FORCE_VECTOR,
      left: modelViewTransform.modelToViewX( leftSpring.leftProperty.get() ),
      centerY: yOrigin
    } );

    var rightSpringNode = new SpringNode( rightSpring, modelViewTransform, {
      stroke: HookesLawColors.RIGHT_SPRING_FORCE_VECTOR,
      // left is based on rightSpring.leftProperty
      centerY: yOrigin
    } );

    var roboticArmNode = new RoboticArmNode( roboticArm, rightSpring.rightRangeProperty, system.equilibriumX, modelViewTransform, {
      x: modelViewTransform.modelToViewX( roboticArm.right ),
      y: yOrigin
    } );

    var equilibriumPositionNode = new Line( 0, 0, 0, EQUILIBRIUM_LINE_LENGTH, {
      stroke: HookesLawColors.EQUILIBRIUM_POSITION,
      lineWidth: 2,
      lineDash: [ 3, 3 ],
      centerX: modelViewTransform.modelToViewX( system.equilibriumX ),
      centerY: yOrigin
    } );

    var leftSpringForceVectorNode = new SpringForceVectorNode( system.leftSpring.springForceProperty, viewProperties.valuesVisibleProperty, {
      fill: HookesLawColors.LEFT_SPRING_FORCE_VECTOR,
      // x is determined by leftSpring.rightProperty
      bottom: leftSpringNode.top - 25
    } );

    //TODO is it correct to treat this like an applied force vector, and color-code it with right spring force?
    var leftAppliedForceVectorNode = new AppliedForceVectorNode( system.leftSpring.appliedForceProperty, viewProperties.valuesVisibleProperty, {
      fill: HookesLawColors.RIGHT_SPRING_FORCE_VECTOR,
      // x is determined by leftSpring.rightProperty
      y: leftSpringForceVectorNode.y
    } );

    var rightSpringForceVectorNode = new SpringForceVectorNode( system.rightSpring.springForceProperty, viewProperties.valuesVisibleProperty, {
      fill: HookesLawColors.RIGHT_SPRING_FORCE_VECTOR,
      // x is determined by rightSpring.rightProperty
      bottom: leftSpringForceVectorNode.top - 10
    } );

    var appliedForceVectorNode = new AppliedForceVectorNode( system.appliedForceProperty, viewProperties.valuesVisibleProperty, {
      // x is determined by rightSpring.rightProperty
      y: rightSpringForceVectorNode.y
    } );

    var totalSpringForceVectorNode = new SpringForceVectorNode( system.springForceProperty, viewProperties.valuesVisibleProperty, {
      // x is determined by rightSpring.rightProperty
      y: appliedForceVectorNode.y
    } );

    var displacementVectorNode = new DisplacementVectorNode( system.displacementProperty, modelViewTransform, viewProperties.valuesVisibleProperty, {
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
    Node.call( this, options );

    // Attach visibility properties to their respective nodes.
    viewProperties.appliedForceVectorVisibleProperty.linkAttribute( appliedForceVectorNode, 'visible' );
    viewProperties.displacementVectorVisibleProperty.linkAttribute( displacementVectorNode, 'visible' );
    viewProperties.equilibriumPositionVisibleProperty.linkAttribute( equilibriumPositionNode, 'visible' );

    // switch between different force representations
    var springForceVisibilityObserver = function() {
      // total
      totalSpringForceVectorNode.visible = viewProperties.springForceVectorVisible && viewProperties.springForceRepresentation === 'total';
      // components
      var componentsVisible = viewProperties.springForceVectorVisible && viewProperties.springForceRepresentation === 'components';
      rightSpringForceVectorNode.visible = leftSpringForceVectorNode.visible = leftAppliedForceVectorNode.visible = componentsVisible;
    };
    viewProperties.springForceVectorVisibleProperty.link( springForceVisibilityObserver );
    viewProperties.springForceRepresentationProperty.link( springForceVisibilityObserver );

    rightSpring.leftProperty.link( function( left ) {
      rightSpringNode.left = modelViewTransform.modelToViewX( left );
    } );

    // Position the vectors
    leftSpring.rightProperty.link( function( right ) {
      leftSpringForceVectorNode.x = leftAppliedForceVectorNode.x = modelViewTransform.modelToViewX( right );
    } );
    rightSpring.rightProperty.link( function( right ) {
      appliedForceVectorNode.x = totalSpringForceVectorNode.x = rightSpringForceVectorNode.x = modelViewTransform.modelToViewX( right );
    } );
  }

  return inherit( Node, SeriesSystemNode );
} );
