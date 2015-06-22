// Copyright 2002-2015, University of Colorado Boulder

/**
 * Single-spring system for the "Introduction" screen.
 * One spring, a robotic arm, and all of the visual representations that go with them.
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
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  var RoboticArmNode = require( 'HOOKES_LAW/common/view/RoboticArmNode' );
  var IntroductionSpringControls = require( 'HOOKES_LAW/introduction/view/IntroductionSpringControls' );
  var SpringForceVectorNode = require( 'HOOKES_LAW/common/view/SpringForceVectorNode' );
  var ParametricSpringNode = require( 'HOOKES_LAW/common/view/ParametricSpringNode' );
  var Util = require( 'DOT/Util' );
  var WallNode = require( 'HOOKES_LAW/common/view/WallNode' );

  /**
   * @param {SingleSpringSystem} system
   * @param {IntroductionViewProperties} viewProperties
   * @param {Object} [options]
   * @constructor
   */
  function IntroductionSystemNode( system, viewProperties, options ) {

    options = _.extend( {
      unitDisplacementLength: 1,
      number: 1 // integer used to label the system
    }, options );

    // to improve readability
    var spring = system.spring;
    var roboticArm = system.roboticArm;

    // This sim operates in 1 dimension (x), so center everything on y = 0.
    var yOrigin = 0;

    // number of interactions in progress that affect displacement
    var numberOfInteractionsInProgressProperty = new Property( 0 );

    // Scene graph -----------------------------------------------------------------------------------------------------------------------------------

    // origin is at right-center of wall
    var wallNode = new WallNode( HookesLawConstants.WALL_SIZE, {
      right: options.unitDisplacementLength * spring.leftProperty.get(),
      centerY: yOrigin
    } );

    var springNode = new ParametricSpringNode( spring, {
      left: options.unitDisplacementLength * spring.leftProperty.get(),
      centerY: yOrigin
    } );
    spring.lengthProperty.link( function( length ) {
      springNode.setLength( length * options.unitDisplacementLength );
    } );
    var minLineWidth = 1;
    var deltaLineWidth = 0.005; // increase in line width per 1 unit of spring constant increas
    spring.springConstantProperty.link( function( springConstant ) {
      springNode.setLineWidth( minLineWidth + deltaLineWidth * ( springConstant - spring.springConstantRange.min ) );
    } );

    var roboticArmNode = new RoboticArmNode( roboticArm, spring.rightRangeProperty, numberOfInteractionsInProgressProperty, {
      unitDisplacementLength: options.unitDisplacementLength,
      x: options.unitDisplacementLength * roboticArm.right,
      y: yOrigin
    } );

    var equilibriumPositionNode = new EquilibriumPositionNode( wallNode.height, {
      centerX: options.unitDisplacementLength * spring.equilibriumXProperty.get(),
      centerY: yOrigin
    } );

    var appliedForceVectorNode = new AppliedForceVectorNode( spring.appliedForceProperty, {
      valueVisibleProperty: viewProperties.valuesVisibleProperty,
      // x is determined by spring.rightProperty
      bottom: springNode.top - 14
    } );

    var springForceVectorNode = new SpringForceVectorNode( spring.springForceProperty, {
      valueVisibleProperty: viewProperties.valuesVisibleProperty,
      // x is determined by spring.rightProperty
      y: appliedForceVectorNode.y
    } );

    var displacementVectorNode = new DisplacementVectorNode( spring.displacementProperty, {
      unitDisplacementLength: options.unitDisplacementLength,
      valueVisibleProperty: viewProperties.valuesVisibleProperty,
      x: equilibriumPositionNode.centerX,
      top: springNode.bottom + 8
    } );

    var springControls = new IntroductionSpringControls( spring, numberOfInteractionsInProgressProperty, {
      number: options.number,
      centerX: wallNode.left + ( roboticArmNode.right - wallNode.left ) / 2,
      top: wallNode.bottom + 10,
      maxWidth: roboticArmNode.right - wallNode.left // constrain width for i18n
    } );

    options.children = [
      wallNode, equilibriumPositionNode, springNode, roboticArmNode,
      appliedForceVectorNode, springForceVectorNode, displacementVectorNode,
      springControls
    ];

    // Property observers ----------------------------------------------------------------------------------------------------------------------------

    // Attach visibility properties to their respective nodes.
    viewProperties.appliedForceVectorVisibleProperty.linkAttribute( appliedForceVectorNode, 'visible' );
    viewProperties.springForceVectorVisibleProperty.linkAttribute( springForceVectorNode, 'visible' );
    viewProperties.displacementVectorVisibleProperty.linkAttribute( displacementVectorNode, 'visible' );
    viewProperties.equilibriumPositionVisibleProperty.linkAttribute( equilibriumPositionNode, 'visible' );

    // Position the force vectors at the right end of the spring.
    spring.rightProperty.link( function( right ) {
      appliedForceVectorNode.x = springForceVectorNode.x = ( options.unitDisplacementLength * right );
    } );

    // Open pincers when displacement is zero and no user interactions affecting displacement are talking place.
    Property.multilink( [ numberOfInteractionsInProgressProperty, spring.displacementProperty ],
      function( numberOfInteractions, displacement ) {
        assert && assert( numberOfInteractions >= 0 );
        var fixedDisplacement = Util.toFixedNumber( displacement, HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES );
        roboticArmNode.setPincersOpen( numberOfInteractions === 0 && fixedDisplacement === 0 );
      } );

    Node.call( this, options );
  }

  return inherit( Node, IntroductionSystemNode );
} );
