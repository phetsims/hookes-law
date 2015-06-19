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
  var EquilibriumPositionNode = require( 'HOOKES_LAW/common/view/EquilibriumPositionNode' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ParallelSpringControls = require( 'HOOKES_LAW/systems/view/ParallelSpringControls' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Property = require( 'AXON/Property' );
  var RoboticArmNode = require( 'HOOKES_LAW/common/view/RoboticArmNode' );
  var Shape = require( 'KITE/Shape' );
  var SpringForceVectorNode = require( 'HOOKES_LAW/common/view/SpringForceVectorNode' );
  var SpringNode = require( 'HOOKES_LAW/common/view/SpringNode' );
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
      unitDisplacementLength: 1
    }, options );

    Node.call( this );

    // to improve readability
    var topSpring = system.topSpring;
    var bottomSpring = system.bottomSpring;
    var roboticArm = system.roboticArm;
    var equivalentSpring = system.equivalentSpring;

    // This sim operates in 1 dimension (x), so center everything on y = 0.
    var yOrigin = 0;

    // number of interactions in progress that affect displacement
    var numberOfInteractionsInProgressProperty = new Property( 0 );

    // Scene graph -----------------------------------------------------------------------------------------------------------------------------------

    // origin is at right-center of wall
    var wallNode = new WallNode( WALL_SIZE, {
      right: options.unitDisplacementLength * equivalentSpring.leftProperty.get(),
      centerY: yOrigin
    } );

    var topSpringNode = new SpringNode( topSpring, {
      unitDisplacementLength: options.unitDisplacementLength,
      numberOfCoils: 6,
      stroke: HookesLawColors.TOP_SPRING_FORCE,
      left: options.unitDisplacementLength * topSpring.leftProperty.get(),
      centerY: wallNode.top + ( 0.25 * wallNode.height )
    } );

    var bottomSpringNode = new SpringNode( bottomSpring, {
      unitDisplacementLength: options.unitDisplacementLength,
      numberOfCoils: 6,
      stroke: HookesLawColors.BOTTOM_SPRING_FORCE,
      left: options.unitDisplacementLength * bottomSpring.leftProperty.get(),
      centerY: wallNode.bottom - ( 0.25 * wallNode.height )
    } );

    var roboticArmNode = new RoboticArmNode( roboticArm, equivalentSpring.rightRangeProperty, numberOfInteractionsInProgressProperty, {
      unitDisplacementLength: options.unitDisplacementLength,
      x: options.unitDisplacementLength * roboticArm.right,
      y: yOrigin
    } );

    // right ends of both springs are connected to this
    var trussOverlap = 10;
    var trussShape = new Shape()
      // vertical line
      .moveTo( 0, topSpringNode.centerY - trussOverlap )
      .lineTo( 0, bottomSpringNode.centerY + trussOverlap )
      // horizontal line
      .moveTo( 0, 0 )
      .lineTo( 10, 0 );
    var trussNode = new Path( trussShape, {
      lineWidth: 3,
      stroke: 'black'
    } );

    var equilibriumPositionNode = new EquilibriumPositionNode( wallNode.height, {
      centerX: options.unitDisplacementLength * equivalentSpring.equilibriumXProperty.get(),
      centerY: yOrigin
    } );

    var appliedForceVectorNode = new AppliedForceVectorNode( equivalentSpring.appliedForceProperty, {
      valueVisibleProperty: viewProperties.valuesVisibleProperty,
      // x is determined by bottomSpring.rightProperty
      bottom: topSpringNode.top - 40
    } );

    var totalSpringForceVectorNode = new SpringForceVectorNode( equivalentSpring.springForceProperty, {
      valueVisibleProperty: viewProperties.valuesVisibleProperty,
      // x is determined by bottomSpring.rightProperty
      centerY: appliedForceVectorNode.centerY
    } );

    var topSpringForceVectorNode = new SpringForceVectorNode( topSpring.springForceProperty, {
      valueVisibleProperty: viewProperties.valuesVisibleProperty,
      fill: HookesLawColors.TOP_SPRING_FORCE,
      decimalPlaces: HookesLawConstants.PARALLEL_COMPONENTS_SPRING_FORCE_DECIMAL_PLACES,
      // x is determined by topSpring.rightProperty
      centerY: totalSpringForceVectorNode.top
    } );

    var bottomSpringForceVectorNode = new SpringForceVectorNode( bottomSpring.springForceProperty, {
      valueVisibleProperty: viewProperties.valuesVisibleProperty,
      fill: HookesLawColors.BOTTOM_SPRING_FORCE,
      decimalPlaces: HookesLawConstants.PARALLEL_COMPONENTS_SPRING_FORCE_DECIMAL_PLACES,
      // x is determined by bottomSpring.rightProperty
      centerY: totalSpringForceVectorNode.bottom
    } );

    var displacementVectorNode = new DisplacementVectorNode( equivalentSpring.displacementProperty, {
      unitDisplacementLength: options.unitDisplacementLength,
      valueVisibleProperty: viewProperties.valuesVisibleProperty,
      x: equilibriumPositionNode.centerX,
      top: bottomSpringNode.bottom + 8
    } );

    var springControls = new ParallelSpringControls( system, numberOfInteractionsInProgressProperty, {
      centerX: wallNode.left + ( roboticArmNode.right - wallNode.left ) / 2,
      top: wallNode.bottom + 25,
      maxWidth: roboticArmNode.right - wallNode.left // constrain width for i18n
    } );

    options.children = [
      wallNode, equilibriumPositionNode, trussNode, roboticArmNode, topSpringNode, bottomSpringNode,
      topSpringForceVectorNode, bottomSpringForceVectorNode,
      appliedForceVectorNode, totalSpringForceVectorNode, displacementVectorNode,
      springControls
    ];

    // Property observers ----------------------------------------------------------------------------------------------------------------------------

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
      trussNode.left = appliedForceVectorNode.x = totalSpringForceVectorNode.x = ( options.unitDisplacementLength * right );
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

    this.mutate( options );
  }

  return inherit( Node, ParallelSystemNode );
} );
