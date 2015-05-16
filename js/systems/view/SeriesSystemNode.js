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
  var Dimension2 = require( 'DOT/Dimension2' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var RoboticArmNode = require( 'HOOKES_LAW/common/view/RoboticArmNode' );
  var SeriesSpringControls = require( 'HOOKES_LAW/systems/view/SeriesSpringControls' );
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
      left: modelViewTransform.modelToViewX( leftSpring.leftProperty.get() ),
      centerY: yOrigin
    } );

    var rightSpringNode = new SpringNode( rightSpring, modelViewTransform, {
      left: modelViewTransform.modelToViewX( rightSpring.leftProperty.get() ),
      centerY: yOrigin
    } );

    var roboticArmNode = new RoboticArmNode( roboticArm, rightSpring.rightRangeProperty, rightSpring.equilibriumXProperty, modelViewTransform, {
      x: modelViewTransform.modelToViewX( roboticArm.right ),
      y: yOrigin
    } );

    var equilibriumPositionNode = new Line( 0, 0, 0, EQUILIBRIUM_LINE_LENGTH, {
      stroke: HookesLawColors.EQUILIBRIUM_POSITION,
      lineWidth: 2,
      lineDash: [ 3, 3 ],
      centerX: modelViewTransform.modelToViewX( rightSpring.equilibriumXProperty.get() ),
      centerY: yOrigin
    } );

    var springControls = new SeriesSpringControls( system, {
      scale: 0.65,
      left: wallNode.left,
      top: wallNode.bottom + 10
    } );

    options.children = [
      wallNode, equilibriumPositionNode, roboticArmNode, leftSpringNode, rightSpringNode,
      //TODO add vector nodes
      springControls
    ];
    Node.call( this, options );

    // The model is more general than this view, so make sure we don't violate assumptions.
    leftSpring.leftProperty.lazyLink( function( left ) {
      throw new Error( 'The left end of the left spring must remain at a fixed position.' );
    } );

    // Position the vectors
    leftSpring.rightProperty.link( function( right ) {
      //TODO
    } );
    rightSpring.rightProperty.link( function( right ) {
      //TODO
    } );
  }

  return inherit( Node, SeriesSystemNode );
} );
