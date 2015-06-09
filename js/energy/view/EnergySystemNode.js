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
  var DisplacementVectorNode = require( 'HOOKES_LAW/common/view/DisplacementVectorNode' );
  var EnergySpringControls = require( 'HOOKES_LAW/energy/view/EnergySpringControls' );
  var EquilibriumPositionNode = require( 'HOOKES_LAW/common/view/EquilibriumPositionNode' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  var RoboticArmNode = require( 'HOOKES_LAW/common/view/RoboticArmNode' );
  var SpringNode = require( 'HOOKES_LAW/common/view/SpringNode' );
  var Util = require( 'DOT/Util' );
  var WallNode = require( 'HOOKES_LAW/common/view/WallNode' );

  /**
   * @param {SingleSpringSystem} system
   * @param {EnergyViewProperties} viewProperties
   * @param {Object} [options]
   * @constructor
   */
  function EnergySystemNode( system, viewProperties, options ) {

    options = _.extend( {
      unitDisplacementLength: 1
    }, options );

    // to improve readability
    var spring = system.spring;
    var roboticArm = system.roboticArm;

    // This sim operates in 1 dimension (x), so center everything on y = 0.
    var yOrigin = 0;

    // number of interactions in progress that affect displacement
    var numberOfInteractionsInProgress = new Property( 0 );

    // Scene graph -----------------------------------------------------------------------------------------------------------------------------------

    // origin is at right-center of wall
    var wallNode = new WallNode( HookesLawConstants.WALL_SIZE, {
      right: options.unitDisplacementLength * spring.leftProperty.get(),
      centerY: yOrigin
    } );

    var springNode = new SpringNode( spring, {
      unitDisplacementLength: options.unitDisplacementLength,
      left: options.unitDisplacementLength * spring.leftProperty.get(),
      centerY: yOrigin
    } );

    var roboticArmNode = new RoboticArmNode( roboticArm, spring.rightRangeProperty, numberOfInteractionsInProgress, {
      unitDisplacementLength: options.unitDisplacementLength,
      x: options.unitDisplacementLength * roboticArm.right,
      y: yOrigin
    } );

    var equilibriumPositionNode = new EquilibriumPositionNode( wallNode.height, {
      centerX: options.unitDisplacementLength * spring.equilibriumXProperty.get(),
      centerY: yOrigin
    } );

    var displacementVectorNode = new DisplacementVectorNode( spring.displacementProperty, {
      unitDisplacementLength: options.unitDisplacementLength,
      valueVisibleProperty: viewProperties.valuesVisibleProperty,
      x: equilibriumPositionNode.centerX,
      top: springNode.bottom + 8
    } );

    var springControls = new EnergySpringControls( spring, numberOfInteractionsInProgress, {
      centerX: wallNode.left + ( roboticArmNode.right - wallNode.left ) / 2,
      top: wallNode.bottom + 10
    } );

    options.children = [
      wallNode, equilibriumPositionNode, roboticArmNode, springNode,
      displacementVectorNode,
      springControls
    ];
    Node.call( this, options );

    // Property observers ----------------------------------------------------------------------------------------------------------------------------

    // Attach visibility properties to their respective nodes.
    viewProperties.displacementVectorVisibleProperty.linkAttribute( displacementVectorNode, 'visible' );
    viewProperties.equilibriumPositionVisibleProperty.linkAttribute( equilibriumPositionNode, 'visible' );

    // Open pincers when displacement is zero and no user interactions affecting displacement are talking place.
    Property.multilink( [ numberOfInteractionsInProgress, spring.displacementProperty ],
      function( numberOfInteractions, displacement ) {
        assert && assert( numberOfInteractions >= 0 );
        var fixedDisplacement = Util.toFixedNumber( displacement, HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES );
        roboticArmNode.setPincersOpen( numberOfInteractions === 0 && fixedDisplacement === 0 );
      } );
  }

  return inherit( Node, EnergySystemNode );
} );
