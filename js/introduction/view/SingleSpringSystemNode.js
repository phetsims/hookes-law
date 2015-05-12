// Copyright 2002-2015, University of Colorado Boulder

/**
 * One spring and all of the visual representations that go with it.
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
  var SpringForceVectorNode = require( 'HOOKES_LAW/common/view/SpringForceVectorNode' );
  var SpringControlPanel = require( 'HOOKES_LAW/common/view/SpringControlPanel' );
  var SpringNode = require( 'HOOKES_LAW/common/view/SpringNode' );
  var WallNode = require( 'HOOKES_LAW/common/view/WallNode' );

  // constants
  var WALL_SIZE = new Dimension2( 25, 170 );
  var EQUILIBRIUM_LINE_LENGTH = WALL_SIZE.height;

  /**
   * @param {SingleSpringSystem} system
   * @param {ModelViewTransform2} modelViewTransform
   * @param {VisibilityProperties} visibilityProperties
   * @param {Object} [options]
   * @constructor
   */
  function SingleSpringSystemNode( system, modelViewTransform, visibilityProperties, options ) {

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

    var roboticArmNode = new RoboticArmNode( roboticArm, spring.rightRangeProperty, spring.equilibriumXProperty, modelViewTransform, {
      x: modelViewTransform.modelToViewX( roboticArm.right ),
      centerY: yOrigin
    } );

    var springNode = new SpringNode( spring, modelViewTransform, {
      left: modelViewTransform.modelToViewX( spring.leftProperty.get() ),
      centerY: yOrigin
    } );

    var equilibriumPositionNode = new Line( 0, 0, 0, EQUILIBRIUM_LINE_LENGTH, {
      stroke: HookesLawColors.EQUILIBRIUM_POSITION,
      lineWidth: 2,
      lineDash: [ 3, 3 ],
      centerX: modelViewTransform.modelToViewX( spring.equilibriumXProperty.get() ),
      centerY: yOrigin
    } );

    var appliedForceVectorNode = new AppliedForceVectorNode( spring.appliedForceProperty, visibilityProperties.valuesVisibleProperty, {
      // x is determined by spring.rightProperty
      bottom: springNode.top - 14
    } );

    var springForceVectorNode = new SpringForceVectorNode( spring.springForceProperty, visibilityProperties.valuesVisibleProperty, {
      // x is determined by spring.rightProperty
      bottom: springNode.top - 14
    } );

    var displacementVectorNode = new DisplacementVectorNode( spring.displacementProperty, modelViewTransform, visibilityProperties.valuesVisibleProperty, {
      x: equilibriumPositionNode.centerX,
      top: springNode.bottom + 8
    } );

    var controlPanel = new SpringControlPanel( spring, {
      number: options.number,
      left: wallNode.left,
      top: wallNode.bottom + 10
    } );

    options.children = [
      wallNode, equilibriumPositionNode, roboticArmNode, springNode,
      appliedForceVectorNode, springForceVectorNode, displacementVectorNode,
      controlPanel
    ];
    Node.call( this, options );

    // Attach visibility properties to their respective nodes.
    visibilityProperties.appliedForceVectorVisibleProperty.linkAttribute( appliedForceVectorNode, 'visible' );
    visibilityProperties.springForceVectorVisibleProperty.linkAttribute( springForceVectorNode, 'visible' );
    visibilityProperties.displacementVectorVisibleProperty.linkAttribute( displacementVectorNode, 'visible' );
    visibilityProperties.equilibriumPositionVisibleProperty.linkAttribute( equilibriumPositionNode, 'visible' );

    // The model is more general than this view, so make sure we don't violate assumptions.
    spring.leftProperty.lazyLink( function( left ) {
       throw new Error( 'This view requires a spring whose left end remains at a fixed position.' );
    } );

    // Locate the force vectors at the right end of the spring.
    spring.rightProperty.link( function( right ) {
      appliedForceVectorNode.x = springForceVectorNode.x = modelViewTransform.modelToViewX( right );
    } );
  }

  return inherit( Node, SingleSpringSystemNode );
} );
