// Copyright 2015-2019, University of Colorado Boulder

/**
 * Single-spring system for the "Intro" screen.
 * One spring, a robotic arm, and all of the visual representations that go with them.
 * Origin is at the point where the spring attaches to the wall.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const AppliedForceVectorNode = require( 'HOOKES_LAW/common/view/AppliedForceVectorNode' );
  const DisplacementVectorNode = require( 'HOOKES_LAW/common/view/DisplacementVectorNode' );
  const EquilibriumPositionNode = require( 'HOOKES_LAW/common/view/EquilibriumPositionNode' );
  const hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  const HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  const HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  const HookesLawSpringNode = require( 'HOOKES_LAW/common/view/HookesLawSpringNode' );
  const inherit = require( 'PHET_CORE/inherit' );
  const IntroSpringControls = require( 'HOOKES_LAW/intro/view/IntroSpringControls' );
  const merge = require( 'PHET_CORE/merge' );
  const NibNode = require( 'HOOKES_LAW/common/view/NibNode' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NumberProperty = require( 'AXON/NumberProperty' );
  const Property = require( 'AXON/Property' );
  const RoboticArmNode = require( 'HOOKES_LAW/common/view/RoboticArmNode' );
  const SpringForceVectorNode = require( 'HOOKES_LAW/common/view/SpringForceVectorNode' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Util = require( 'DOT/Util' );
  const WallNode = require( 'HOOKES_LAW/common/view/WallNode' );

  /**
   * @param {SingleSpringSystem} system
   * @param {IntroViewProperties} viewProperties
   * @param {Object} [options]
   * @constructor
   */
  function IntroSystemNode( system, viewProperties, options ) {

    options = merge( {
      unitDisplacementLength: 1, // {number} view length of 1 meter of displacement
      number: 1, // integer used to label the system

      // phet-io
      tandem: Tandem.required
    }, options );

    // to improve readability
    const spring = system.spring;
    const roboticArm = system.roboticArm;

    // This sim operates in 1 dimension (x), so center everything on y = 0.
    const xOrigin = options.unitDisplacementLength * spring.leftProperty.get();
    const yOrigin = 0;

    // number of interactions in progress that affect displacement
    const numberOfInteractionsInProgressProperty = new NumberProperty( 0, {
      numberType: 'Integer',
      isValidValue: function( value ) { return value >= 0; }
    } );

    //------------------------------------------------
    // Scene graph

    // origin is at right-center of wall
    const wallNode = new WallNode( HookesLawConstants.WALL_SIZE, {
      right: xOrigin,
      centerY: yOrigin
    } );

    const springNode = new HookesLawSpringNode( spring, {
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
    const nibNode = new NibNode( {
      fill: HookesLawColors.SINGLE_SPRING_MIDDLE,
      // x is based on rightSpring.leftProperty
      centerY: yOrigin
    } );

    const roboticArmNode = new RoboticArmNode( roboticArm, spring.rightRangeProperty, numberOfInteractionsInProgressProperty, {
      unitDisplacementLength: options.unitDisplacementLength,
      x: options.unitDisplacementLength * roboticArm.right,
      y: yOrigin,
      tandem: options.tandem.createTandem( 'roboticArmNode' )
    } );

    const equilibriumPositionNode = new EquilibriumPositionNode( wallNode.height, {
      centerX: options.unitDisplacementLength * spring.equilibriumXProperty.get(),
      centerY: yOrigin,
      tandem: options.tandem.createTandem( 'equilibriumPositionNode' )
    } );

    const appliedForceVectorNode = new AppliedForceVectorNode(
      spring.appliedForceProperty, viewProperties.valuesVisibleProperty, {
        // x is determined by spring.rightProperty
        // bottom determined empirically, springNode.top is not accurate because we're using boundsMethod:'none'
        bottom: springNode.y - 50,
        tandem: options.tandem.createTandem( 'appliedForceVectorNode' )
      } );

    const springForceVectorNode = new SpringForceVectorNode(
      spring.springForceProperty, viewProperties.valuesVisibleProperty, {
        // x is determined by spring.rightProperty
        y: appliedForceVectorNode.y,
        tandem: options.tandem.createTandem( 'springForceVectorNode' )
      } );

    const displacementVectorNode = new DisplacementVectorNode(
      spring.displacementProperty, viewProperties.valuesVisibleProperty, {
        unitDisplacementLength: options.unitDisplacementLength,
        x: equilibriumPositionNode.centerX,
        // top determined empirically, springNode.bottom is not accurate because we're using boundMethod:'none'
        top: springNode.y + 50,
        tandem: options.tandem.createTandem( 'displacementVectorNode' )
      } );

    const springControls = new IntroSpringControls( spring, numberOfInteractionsInProgressProperty, {
      number: options.number,
      centerX: wallNode.left + ( roboticArmNode.right - wallNode.left ) / 2,
      top: wallNode.bottom + 10,
      maxWidth: roboticArmNode.right - wallNode.left, // constrain width for i18n
      tandem: options.tandem.createTandem( 'springControls' )
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
        const fixedDisplacement = Util.toFixedNumber( displacement, HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES );
        roboticArmNode.setPincersOpen( numberOfInteractions === 0 && fixedDisplacement === 0 );
      } );

    Node.call( this, options );
  }

  hookesLaw.register( 'IntroSystemNode', IntroSystemNode );

  return inherit( Node, IntroSystemNode );
} );
