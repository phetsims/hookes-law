// Copyright 2002-2015, University of Colorado Boulder

/**
 * Two springs in parallel, a robotic arm, and all of the visual representations that go with them.
 * Origin is at the point where the springs attach to the wall.
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
  var ParallelSpringControls = require( 'HOOKES_LAW/systems/view/ParallelSpringControls' );
  var RoboticArmNode = require( 'HOOKES_LAW/common/view/RoboticArmNode' );
  var SpringForceVectorNode = require( 'HOOKES_LAW/common/view/SpringForceVectorNode' );
  var SpringNode = require( 'HOOKES_LAW/common/view/SpringNode' );
  var WallNode = require( 'HOOKES_LAW/common/view/WallNode' );

  // constants
  var WALL_SIZE = new Dimension2( 25, 300 );
  var EQUILIBRIUM_LINE_LENGTH = WALL_SIZE.height;

  /**
   * @param {ParallelSystem} system
   * @param {ModelViewTransform2} modelViewTransform
   * @param {SystemViewProperties} viewProperties
   * @param {Object} [options]
   * @constructor
   */
  function ParallelSystemNode( system, modelViewTransform, viewProperties, options ) {

    // to improve readability
    var topSpring = system.topSpring;
    var bottomSpring = system.bottomSpring;
    var roboticArm = system.roboticArm;

    // This sim operates in 1 dimension (x), so center everything on y = 0.
    var yOrigin = modelViewTransform.modelToViewY( 0 );

    // origin is at right-center of wall
    var wallNode = new WallNode( WALL_SIZE, {
      right: modelViewTransform.modelToViewX( topSpring.leftProperty.get() ),
      centerY: yOrigin
    } );

    var topSpringNode = new SpringNode( topSpring, modelViewTransform, {
      stroke: HookesLawColors.TOP_SPRING_FORCE_VECTOR,
      left: modelViewTransform.modelToViewX( topSpring.leftProperty.get() ),
      centerY: wallNode.top + ( 0.25 * wallNode.height )
    } );

    var bottomSpringNode = new SpringNode( bottomSpring, modelViewTransform, {
      stroke: HookesLawColors.BOTTOM_SPRING_FORCE_VECTOR,
      left: modelViewTransform.modelToViewX( bottomSpring.leftProperty.get() ),
      centerY: wallNode.bottom - ( 0.25 * wallNode.height )
    } );

    var roboticArmNode = new RoboticArmNode( roboticArm, system.rightRangeProperty, system.equilibriumX, modelViewTransform, {
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

    var appliedForceVectorNode = new AppliedForceVectorNode( system.appliedForceProperty, viewProperties.valuesVisibleProperty, {
      // x is determined by bottomSpring.rightProperty
      bottom: topSpringNode.top - 40
    } );

    var totalSpringForceVectorNode = new SpringForceVectorNode( system.springForceProperty, viewProperties.valuesVisibleProperty, {
      // x is determined by bottomSpring.rightProperty
      centerY: appliedForceVectorNode.centerY
    } );

    var topSpringForceVectorNode = new SpringForceVectorNode( system.topSpring.springForceProperty, viewProperties.valuesVisibleProperty, {
      fill: HookesLawColors.TOP_SPRING_FORCE_VECTOR,
      // x is determined by topSpring.rightProperty
      centerY: totalSpringForceVectorNode.top
    } );

    var bottomSpringForceVectorNode = new SpringForceVectorNode( system.bottomSpring.springForceProperty, viewProperties.valuesVisibleProperty, {
      fill: HookesLawColors.BOTTOM_SPRING_FORCE_VECTOR,
      // x is determined by bottomSpring.rightProperty
      centerY: totalSpringForceVectorNode.bottom
    } );

    var displacementVectorNode = new DisplacementVectorNode( system.displacementProperty, modelViewTransform, viewProperties.valuesVisibleProperty, {
      x: equilibriumPositionNode.centerX,
      top: bottomSpringNode.bottom + 8
    } );

    var springControls = new ParallelSpringControls( system, {
      scale: 0.75,
      centerX: wallNode.left + ( roboticArmNode.right - wallNode.left ) / 2,
      top: wallNode.bottom + 25
    } );

    options.children = [
      wallNode, equilibriumPositionNode, roboticArmNode, topSpringNode, bottomSpringNode,
      topSpringForceVectorNode, bottomSpringForceVectorNode,
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
      bottomSpringForceVectorNode.visible = topSpringForceVectorNode.visible = componentsVisible;
    };
    viewProperties.springForceVectorVisibleProperty.link( springForceVisibilityObserver );
    viewProperties.springForceRepresentationProperty.link( springForceVisibilityObserver );

    // Position the vectors
    system.rightProperty.link( function( right ) {
      var x = modelViewTransform.modelToViewX( right );
      appliedForceVectorNode.x = totalSpringForceVectorNode.x = topSpringForceVectorNode.x = bottomSpringForceVectorNode.x = x;
    } );
  }

  return inherit( Node, ParallelSystemNode );
} );
