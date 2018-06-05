// Copyright 2015-2018, University of Colorado Boulder

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
  var EquilibriumPositionNode = require( 'HOOKES_LAW/common/view/EquilibriumPositionNode' );
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var HookesLawSpringNode = require( 'HOOKES_LAW/common/view/HookesLawSpringNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var NibNode = require( 'HOOKES_LAW/common/view/NibNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var ParallelSpringControls = require( 'HOOKES_LAW/systems/view/ParallelSpringControls' );
  var Property = require( 'AXON/Property' );
  var RoboticArmNode = require( 'HOOKES_LAW/common/view/RoboticArmNode' );
  var SpringForceVectorNode = require( 'HOOKES_LAW/common/view/SpringForceVectorNode' );
  var Util = require( 'DOT/Util' );
  var WallNode = require( 'HOOKES_LAW/common/view/WallNode' );

  // constants
  var WALL_SIZE = new Dimension2( HookesLawConstants.WALL_SIZE.width, 300 ); // wall is taller than other systems

  /**
   * @param {ParallelSystem} system
   * @param {SystemViewProperties} viewProperties
   * @param {Object} [options]
   * @constructor
   */
  function ParallelSystemNode( system, viewProperties, options ) {

    options = _.extend( {
      unitDisplacementLength: 1 // {number} view length of 1 meter of displacement
    }, options );

    // to improve readability
    var topSpring = system.topSpring;
    var bottomSpring = system.bottomSpring;
    var roboticArm = system.roboticArm;
    var equivalentSpring = system.equivalentSpring;

    // This sim operates in 1 dimension (x), so center everything on y = 0.
    var yOrigin = 0;

    // number of interactions in progress that affect displacement
    var numberOfInteractionsInProgressProperty = new NumberProperty( 0, {
      numberType: 'Integer',
      isValidValue: function( value ) { return value >= 0; }
    } );

    //------------------------------------------------
    // Scene graph

    // origin is at right-center of wall
    var wallNode = new WallNode( WALL_SIZE, {
      right: options.unitDisplacementLength * equivalentSpring.leftProperty.get(),
      centerY: yOrigin
    } );

    var topSpringNode = new HookesLawSpringNode( topSpring, {
      unitDisplacementLength: options.unitDisplacementLength,
      loops: HookesLawConstants.PARALLEL_SPRINGS_LOOPS,
      frontColor: HookesLawColors.TOP_SPRING_FRONT,
      middleColor: HookesLawColors.TOP_SPRING_MIDDLE,
      backColor: HookesLawColors.TOP_SPRING_BACK,
      // use x,y exclusively for layout, other translation options are inaccurate because we're using boundsMethod:'none'
      x: options.unitDisplacementLength * topSpring.leftProperty.get(),
      y: wallNode.top + ( 0.25 * wallNode.height )
    } );

    var bottomSpringNode = new HookesLawSpringNode( bottomSpring, {
      unitDisplacementLength: options.unitDisplacementLength,
      loops: HookesLawConstants.PARALLEL_SPRINGS_LOOPS,
      frontColor: HookesLawColors.BOTTOM_SPRING_FRONT,
      middleColor: HookesLawColors.BOTTOM_SPRING_MIDDLE,
      backColor: HookesLawColors.BOTTOM_SPRING_BACK,
      // use x,y exclusively for layout, other translation options are inaccurate because we're using boundsMethod:'none'
      x: options.unitDisplacementLength * bottomSpring.leftProperty.get(),
      y: wallNode.bottom - ( 0.25 * wallNode.height )
    } );

    var roboticArmNode = new RoboticArmNode( roboticArm, equivalentSpring.rightRangeProperty, numberOfInteractionsInProgressProperty, {
      unitDisplacementLength: options.unitDisplacementLength,
      x: options.unitDisplacementLength * roboticArm.right,
      y: yOrigin
    } );

    // right ends of both springs are connected to this
    var trussOverlap = 10;
    var trussNode = new Line( 0, topSpringNode.y - trussOverlap, 0, bottomSpringNode.y + trussOverlap, {
      lineWidth: 4,
      stroke: 'black'
    } );

    // pincers grab this
    var nibNode = new NibNode( {
      fill: 'black',
      // x is determined by rightSpring.leftProperty
      centerY: yOrigin
    } );

    var equilibriumPositionNode = new EquilibriumPositionNode( wallNode.height, {
      centerX: options.unitDisplacementLength * equivalentSpring.equilibriumXProperty.get(),
      centerY: yOrigin
    } );

    var appliedForceVectorNode = new AppliedForceVectorNode( equivalentSpring.appliedForceProperty, {
      valueVisibleProperty: viewProperties.valuesVisibleProperty,
      // x is determined by bottomSpring.rightProperty
      bottom: topSpringNode.y - 80 // determined empirically, topSpringNode.top is not accurate because we're using boundMethod:'none'
    } );

    var totalSpringForceVectorNode = new SpringForceVectorNode( equivalentSpring.springForceProperty, {
      valueVisibleProperty: viewProperties.valuesVisibleProperty,
      // x is determined by bottomSpring.rightProperty
      centerY: appliedForceVectorNode.centerY
    } );

    var topSpringForceVectorNode = new SpringForceVectorNode( topSpring.springForceProperty, {
      valueVisibleProperty: viewProperties.valuesVisibleProperty,
      fill: HookesLawColors.TOP_SPRING,
      decimalPlaces: HookesLawConstants.PARALLEL_COMPONENTS_SPRING_FORCE_DECIMAL_PLACES,
      // x is determined by topSpring.rightProperty
      centerY: totalSpringForceVectorNode.top
    } );

    var bottomSpringForceVectorNode = new SpringForceVectorNode( bottomSpring.springForceProperty, {
      valueVisibleProperty: viewProperties.valuesVisibleProperty,
      fill: HookesLawColors.BOTTOM_SPRING,
      decimalPlaces: HookesLawConstants.PARALLEL_COMPONENTS_SPRING_FORCE_DECIMAL_PLACES,
      // x is determined by bottomSpring.rightProperty
      centerY: totalSpringForceVectorNode.bottom
    } );

    var displacementVectorNode = new DisplacementVectorNode( equivalentSpring.displacementProperty, {
      unitDisplacementLength: options.unitDisplacementLength,
      valueVisibleProperty: viewProperties.valuesVisibleProperty,
      x: equilibriumPositionNode.centerX,
      top: bottomSpringNode.y + 50 // determined empirically, bottomSpringNode.bottom is not accurate because we're using boundMethod:'none'
    } );

    var springControls = new ParallelSpringControls( system, numberOfInteractionsInProgressProperty, {
      centerX: wallNode.left + ( roboticArmNode.right - wallNode.left ) / 2,
      top: wallNode.bottom + 25,
      maxWidth: roboticArmNode.right - wallNode.left // constrain width for i18n
    } );

    assert && assert( !options.children, 'ParallelSystemNode sets children' );
    options.children = [
      equilibriumPositionNode, roboticArmNode, topSpringNode, bottomSpringNode, wallNode, trussNode, nibNode,
      topSpringForceVectorNode, bottomSpringForceVectorNode,
      appliedForceVectorNode, totalSpringForceVectorNode, displacementVectorNode,
      springControls
    ];

    //------------------------------------------------
    // Property observers

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
        bottomSpringForceVectorNode.visible = topSpringForceVectorNode.visible = componentsVisible;
      } );

    // position the vectors and truss
    equivalentSpring.rightProperty.link( function( right ) {
      trussNode.x = nibNode.x = appliedForceVectorNode.x = totalSpringForceVectorNode.x = ( options.unitDisplacementLength * right );
    } );
    topSpring.rightProperty.link( function( right ) {
      topSpringForceVectorNode.x = options.unitDisplacementLength * right;
    } );
    bottomSpring.rightProperty.link( function( right ) {
      bottomSpringForceVectorNode.x = options.unitDisplacementLength * right;
    } );

    // Open pincers when displacement is zero and no user interactions affecting displacement are talking place.
    Property.multilink( [ numberOfInteractionsInProgressProperty, equivalentSpring.displacementProperty ],
      function( numberOfInteractions, displacement ) {
        assert && assert( numberOfInteractions >= 0 );
        var fixedDisplacement = Util.toFixedNumber( displacement, HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES );
        roboticArmNode.setPincersOpen( numberOfInteractions === 0 && fixedDisplacement === 0 );
      } );

    Node.call( this, options );
  }

  hookesLaw.register( 'ParallelSystemNode', ParallelSystemNode );

  return inherit( Node, ParallelSystemNode );
} );
