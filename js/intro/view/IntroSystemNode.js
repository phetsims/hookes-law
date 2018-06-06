// Copyright 2015-2018, University of Colorado Boulder

/**
 * Single-spring system for the "Intro" screen.
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
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var HookesLawSpringNode = require( 'HOOKES_LAW/common/view/HookesLawSpringNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var IntroSpringControls = require( 'HOOKES_LAW/intro/view/IntroSpringControls' );
  var NibNode = require( 'HOOKES_LAW/common/view/NibNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var Property = require( 'AXON/Property' );
  var RoboticArmNode = require( 'HOOKES_LAW/common/view/RoboticArmNode' );
  var SpringForceVectorNode = require( 'HOOKES_LAW/common/view/SpringForceVectorNode' );
  var Util = require( 'DOT/Util' );
  var WallNode = require( 'HOOKES_LAW/common/view/WallNode' );

  /**
   * @param {SingleSpringSystem} system
   * @param {IntroViewProperties} viewProperties
   * @param {Object} [options]
   * @constructor
   */
  function IntroSystemNode( system, viewProperties, options ) {

    options = _.extend( {
      unitDisplacementLength: 1, // {number} view length of 1 meter of displacement
      number: 1 // integer used to label the system
    }, options );

    // to improve readability
    var spring = system.spring;
    var roboticArm = system.roboticArm;

    // This sim operates in 1 dimension (x), so center everything on y = 0.
    var xOrigin = options.unitDisplacementLength * spring.leftProperty.get();
    var yOrigin = 0;

    // number of interactions in progress that affect displacement
    var numberOfInteractionsInProgressProperty = new NumberProperty( 0, {
      numberType: 'Integer',
      isValidValue: function( value ) { return value >= 0; }
    } );

    //------------------------------------------------
    // Scene graph

    // origin is at right-center of wall
    var wallNode = new WallNode( HookesLawConstants.WALL_SIZE, {
      right: xOrigin,
      centerY: yOrigin
    } );

    var springNode = new HookesLawSpringNode( spring, {
      frontColor: HookesLawColors.SINGLE_SPRING_FRONT,
      middleColor: HookesLawColors.SINGLE_SPRING_MIDDLE,
      backColor: HookesLawColors.SINGLE_SPRING_BACK,
      loops: HookesLawConstants.SINGLE_SPRING_LOOPS,
      unitDisplacementLength: options.unitDisplacementLength,
      // use x,y exclusively for layout, other translation options are inaccurate because we're using boundsMethod:'none'
      x: xOrigin,
      y: yOrigin
    } );

    // pincers grab this
    var nibNode = new NibNode( {
      fill: HookesLawColors.SINGLE_SPRING_MIDDLE,
      // x is based on rightSpring.leftProperty
      centerY: yOrigin
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

    var appliedForceVectorNode = new AppliedForceVectorNode(
      spring.appliedForceProperty, viewProperties.valuesVisibleProperty, {
        // x is determined by spring.rightProperty
        // bottom determined empirically, springNode.top is not accurate because we're using boundsMethod:'none'
        bottom: springNode.y - 50
      } );

    var springForceVectorNode = new SpringForceVectorNode(
      spring.springForceProperty, viewProperties.valuesVisibleProperty, {
        // x is determined by spring.rightProperty
        y: appliedForceVectorNode.y
      } );

    var displacementVectorNode = new DisplacementVectorNode(
      spring.displacementProperty, viewProperties.valuesVisibleProperty, {
        unitDisplacementLength: options.unitDisplacementLength,
        x: equilibriumPositionNode.centerX,
        // top determined empirically, springNode.bottom is not accurate because we're using boundMethod:'none'
        top: springNode.y + 50
      } );

    var springControls = new IntroSpringControls( spring, numberOfInteractionsInProgressProperty, {
      number: options.number,
      centerX: wallNode.left + ( roboticArmNode.right - wallNode.left ) / 2,
      top: wallNode.bottom + 10,
      maxWidth: roboticArmNode.right - wallNode.left // constrain width for i18n
    } );

    assert && assert( !options.children, 'IntroSystemNode sets children' );
    options.children = [
      equilibriumPositionNode, roboticArmNode, springNode, wallNode, nibNode,
      appliedForceVectorNode, springForceVectorNode, displacementVectorNode,
      springControls
    ];

    //------------------------------------------------
    // Property observers

    // Attach visibility properties to their respective nodes.
    viewProperties.appliedForceVectorVisibleProperty.linkAttribute( appliedForceVectorNode, 'visible' );
    viewProperties.springForceVectorVisibleProperty.linkAttribute( springForceVectorNode, 'visible' );
    viewProperties.displacementVectorVisibleProperty.linkAttribute( displacementVectorNode, 'visible' );
    viewProperties.equilibriumPositionVisibleProperty.linkAttribute( equilibriumPositionNode, 'visible' );

    // Position the force vectors at the right end of the spring.
    spring.rightProperty.link( function( right ) {
      appliedForceVectorNode.x = springForceVectorNode.x = nibNode.x = ( options.unitDisplacementLength * right );
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

  hookesLaw.register( 'IntroSystemNode', IntroSystemNode );

  return inherit( Node, IntroSystemNode );
} );
