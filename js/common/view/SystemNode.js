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
  var HookNode = require( 'HOOKES_LAW/common/view/HookNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var SpringForceVectorNode = require( 'HOOKES_LAW/common/view/SpringForceVectorNode' );
  var SpringNode = require( 'HOOKES_LAW/common/view/SpringNode' );
  var WallNode = require( 'HOOKES_LAW/common/view/WallNode' );

  // constants
  var WALL_SIZE = new Dimension2( 25, 170 );
  var EQUILIBRIUM_LINE_LENGTH = WALL_SIZE.height;

  /**
   * @param {Spring} spring
   * @param {ModelViewTransform2} modelViewTransform
   * @param {VisibilityProperties} visibilityProperties
   * @param {Object} [options]
   * @constructor
   */
  function SystemNode( spring, modelViewTransform, visibilityProperties, options ) {

    Node.call( this );

    var wallNode = new WallNode( WALL_SIZE, {
      right: 0,
      centerY: 0
    } );

    var hookNode = new HookNode( spring, modelViewTransform, {
      left: wallNode.right,
      centerY: wallNode.centerY
    } );

    var springNode = new SpringNode( spring, modelViewTransform, {
      left: wallNode.right,
      centerY: wallNode.centerY
    } );

    var viewEquilibriumX = modelViewTransform.modelToViewX( spring.equilibriumX );
    var equilibriumPositionNode = new Line( viewEquilibriumX, 0, viewEquilibriumX, EQUILIBRIUM_LINE_LENGTH, {
      stroke: HookesLawColors.EQUILIBRIUM_POSITION,
      lineWidth: 1,
      lineDash: [ 5, 5 ],
      centerY: wallNode.centerY
    } );

    var appliedForceVectorNode = new AppliedForceVectorNode( spring.appliedForceProperty, spring.lengthProperty, modelViewTransform, visibilityProperties.valuesVisibleProperty, {
      bottom: springNode.top - 5
    } );

    var springForceVectorNode = new SpringForceVectorNode( spring.springForceProperty, spring.lengthProperty, modelViewTransform, visibilityProperties.valuesVisibleProperty, {
      bottom: springNode.top - 5
    } );

    var displacementVectorNode = new DisplacementVectorNode( spring.displacementProperty, modelViewTransform, visibilityProperties.valuesVisibleProperty, {
      x: viewEquilibriumX,
      top: springNode.bottom + 5
    } );

    options.children = [ wallNode, equilibriumPositionNode, hookNode, springNode, appliedForceVectorNode, springForceVectorNode, displacementVectorNode ];
    this.mutate( options );

    visibilityProperties.appliedForceVectorVisibleProperty.link( function( visible ) {
      appliedForceVectorNode.visible = visible;
    } );

    visibilityProperties.springForceVectorVisibleProperty.link( function( visible ) {
      springForceVectorNode.visible = visible;
    } );

    visibilityProperties.displacementVectorVisibleProperty.link( function( visible ) {
      displacementVectorNode.visible = visible;
    } );

    visibilityProperties.equilibriumPositionVisibleProperty.link( function( visible ) {
      equilibriumPositionNode.visible = visible;
    } );
  }

  return inherit( Node, SystemNode );
} );
