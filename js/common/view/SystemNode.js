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
  var Dimension2 = require( 'DOT/Dimension2' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookNode = require( 'HOOKES_LAW/common/view/HookNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var SpringNode = require( 'HOOKES_LAW/common/view/SpringNode' );
  var WallNode = require( 'HOOKES_LAW/common/view/WallNode' );

  // constants
  var WALL_SIZE = new Dimension2( 25, 170 );
  var EQUILIBRIUM_LINE_LENGTH = WALL_SIZE.height;

  /**
   * @param {Spring} spring
   * @param {Range} displacementRange
   * @param {ModelViewTransform2} modelViewTransform
   * @param {VisibilityProperties} visibilityProperties
   * @param {Object} [options]
   * @constructor
   */
  function SystemNode( spring, displacementRange, modelViewTransform, visibilityProperties, options ) {

    Node.call( this );

    var wallNode = new WallNode( WALL_SIZE, {
      right: 0,
      centerY: 0
    } );

    var hookNode = new HookNode( spring, modelViewTransform, displacementRange, {
      left: wallNode.right,
      centerY: wallNode.centerY
    } );

    var springNode = new SpringNode( spring, modelViewTransform, {
      left: wallNode.right,
      centerY: wallNode.centerY
    } );

    var equilibriumX = modelViewTransform.modelToViewX( spring.equilibriumPosition );
    var equilibriumPositionNode = new Line( equilibriumX, 0, equilibriumX, EQUILIBRIUM_LINE_LENGTH, {
      stroke: HookesLawColors.EQUILIBRIUM_POSITION,
      lineWidth: 2,
      lineDash: [ 3, 3 ],
      centerY: wallNode.centerY
    } );

    options.children = [ wallNode, equilibriumPositionNode, hookNode, springNode ];
    this.mutate( options );

    visibilityProperties.equilibriumPositionVisibleProperty.link( function( visible ) {
      equilibriumPositionNode.visible = visible;
    } );
  }

  return inherit( Node, SystemNode, {
    //TODO prototype functions
  } );
} );
