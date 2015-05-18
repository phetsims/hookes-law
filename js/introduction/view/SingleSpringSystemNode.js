// Copyright 2002-2015, University of Colorado Boulder

/**
 * One spring, a robotic arm, and all of the visual representations that go with them.
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
  var SingleSpringControls = require( 'HOOKES_LAW/introduction/view/SingleSpringControls' );
  var SpringForceVectorNode = require( 'HOOKES_LAW/common/view/SpringForceVectorNode' );
  var SpringNode = require( 'HOOKES_LAW/common/view/SpringNode' );
  var WallNode = require( 'HOOKES_LAW/common/view/WallNode' );

  // constants
  var WALL_SIZE = new Dimension2( 25, 170 );
  var EQUILIBRIUM_LINE_LENGTH = WALL_SIZE.height;

  /**
   * @param {SingleSpringSystem} system
   * @param {ModelViewTransform2} modelViewTransform
   * @param {IntroductionViewProperties} viewProperties
   * @param {Object} [options]
   * @constructor
   */
  function SingleSpringSystemNode( system, modelViewTransform, viewProperties, options ) {

    options = _.extend( {
      number: 1 // integer used to label the system
    }, options );

    // to improve readability
    var spring = system.spring;
    var roboticArm = system.roboticArm;

    // This sim operates in 1 dimension (x), so center everything on y = 0.
    var yOrigin = modelViewTransform.modelToViewY( 0 );

    // origin is at right-center of wall
    var wallNode = new WallNode( WALL_SIZE, {
      right: modelViewTransform.modelToViewX( spring.leftProperty.get() ),
      centerY: yOrigin
    } );

    var springNode = new SpringNode( spring, modelViewTransform, {
      left: modelViewTransform.modelToViewX( spring.leftProperty.get() ),
      centerY: yOrigin
    } );

    var roboticArmNode = new RoboticArmNode( roboticArm, spring.rightRangeProperty, spring.equilibriumXProperty, modelViewTransform, {
      x: modelViewTransform.modelToViewX( roboticArm.right ),
      y: yOrigin
    } );

    var equilibriumPositionNode = new Line( 0, 0, 0, EQUILIBRIUM_LINE_LENGTH, {
      stroke: HookesLawColors.EQUILIBRIUM_POSITION,
      lineWidth: 2,
      lineDash: [ 3, 3 ],
      centerX: modelViewTransform.modelToViewX( spring.equilibriumXProperty.get() ),
      centerY: yOrigin
    } );

    var appliedForceVectorNode = new AppliedForceVectorNode( spring.appliedForceProperty, viewProperties.valuesVisibleProperty, {
      // x is determined by spring.rightProperty
      bottom: springNode.top - 14
    } );

    var springForceVectorNode = new SpringForceVectorNode( spring.springForceProperty, viewProperties.valuesVisibleProperty, {
      // x is determined by spring.rightProperty
      bottom: springNode.top - 14
    } );

    var displacementVectorNode = new DisplacementVectorNode( spring.displacementProperty, modelViewTransform, viewProperties.valuesVisibleProperty, {
      x: equilibriumPositionNode.centerX,
      top: springNode.bottom + 8
    } );

    var springControls = new SingleSpringControls( spring, {
      number: options.number,
      left: wallNode.left,
      top: wallNode.bottom + 10
    } );

    options.children = [
      wallNode, equilibriumPositionNode, roboticArmNode, springNode,
      appliedForceVectorNode, springForceVectorNode, displacementVectorNode,
      springControls
    ];
    Node.call( this, options );

    // Attach visibility properties to their respective nodes.
    viewProperties.appliedForceVectorVisibleProperty.linkAttribute( appliedForceVectorNode, 'visible' );
    viewProperties.springForceVectorVisibleProperty.linkAttribute( springForceVectorNode, 'visible' );
    viewProperties.displacementVectorVisibleProperty.linkAttribute( displacementVectorNode, 'visible' );
    viewProperties.equilibriumPositionVisibleProperty.linkAttribute( equilibriumPositionNode, 'visible' );

    // Position the force vectors at the right end of the spring.
    spring.rightProperty.link( function( right ) {
      appliedForceVectorNode.x = springForceVectorNode.x = modelViewTransform.modelToViewX( right );
    } );
  }

  return inherit( Node, SingleSpringSystemNode );
} );
