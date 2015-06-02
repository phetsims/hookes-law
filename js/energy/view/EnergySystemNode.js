// Copyright 2002-2015, University of Colorado Boulder

/**
 * Single-spring system for the "Energy" screen.
 * One spring, a robotic arm, and all of the visual representations & controls that go with them.
 * Origin is at the point where the spring attaches to the wall.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var DisplacementVectorNode = require( 'HOOKES_LAW/common/view/DisplacementVectorNode' );
  var EnergySpringControls = require( 'HOOKES_LAW/energy/view/EnergySpringControls' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var RoboticArmNode = require( 'HOOKES_LAW/common/view/RoboticArmNode' );
  var SpringNode = require( 'HOOKES_LAW/common/view/SpringNode' );
  var WallNode = require( 'HOOKES_LAW/common/view/WallNode' );

  // constants
  var WALL_SIZE = new Dimension2( 25, 170 );
  var EQUILIBRIUM_LINE_LENGTH = WALL_SIZE.height;

  /**
   * @param {SingleSpringSystem} system
   * @param {ModelViewTransform2} modelViewTransform
   * @param {EnergyViewProperties} viewProperties
   * @param {Object} [options]
   * @constructor
   */
  function EnergySystemNode( system, modelViewTransform, viewProperties, options ) {

    options = options || {};

    // to improve readability
    var spring = system.spring;
    var roboticArm = system.roboticArm;

    // This sim operates in 1 dimension (x), so center everything on y = 0.
    var yOrigin = modelViewTransform.modelToViewY( 0 );

    // Scene graph -----------------------------------------------------------------------------------------------------------------------------------

    // origin is at right-center of wall
    var wallNode = new WallNode( WALL_SIZE, {
      right: modelViewTransform.modelToViewX( spring.leftProperty.get() ),
      centerY: yOrigin
    } );

    var springNode = new SpringNode( spring, modelViewTransform, {
      left: modelViewTransform.modelToViewX( spring.leftProperty.get() ),
      centerY: yOrigin
    } );

    var roboticArmNode = new RoboticArmNode( roboticArm, spring.rightRangeProperty, spring.equilibriumXProperty.get(), modelViewTransform, {
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

    var displacementVectorNode = new DisplacementVectorNode( spring.displacementProperty, modelViewTransform, viewProperties.valuesVisibleProperty, {
      x: equilibriumPositionNode.centerX,
      top: springNode.bottom + 8
    } );

    var springControls = new EnergySpringControls( spring, {
      centerX: wallNode.left + ( roboticArmNode.right - wallNode.left ) / 2,
      top: wallNode.bottom + 25
    } );

    options.children = [
      wallNode, equilibriumPositionNode, roboticArmNode, springNode,
      displacementVectorNode,
      springControls
    ];
    Node.call( this, options );
  }

  return inherit( Node, EnergySystemNode );
} );
