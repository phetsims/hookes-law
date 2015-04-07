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
  var HookNode = require( 'HOOKES_LAW/common/view/HookNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var SpringNode = require( 'HOOKES_LAW/common/view/SpringNode' );
  var WallNode = require( 'HOOKES_LAW/common/view/WallNode' );

  // constants
  var WALL_SIZE = new Dimension2( 25, 170 );

  /**
   * @param {Spring} spring
   * @param {Range} displacementRange
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Object} [options]
   * @constructor
   */
  function SystemNode( spring, displacementRange, modelViewTransform, options ) {

    Node.call( this );

    var wallNode = new WallNode( WALL_SIZE, {
      right: 0,
      centerY: 0
    } );

    var springNode = new SpringNode( spring, modelViewTransform, {
      left: wallNode.right,
      centerY: wallNode.centerY
    } );

    var hookNode = new HookNode( spring, modelViewTransform, displacementRange, {
      left: wallNode.right,
      centerY: wallNode.centerY
    } );

    options.children = [ wallNode, springNode, hookNode ];
    this.mutate( options );
  }

  return inherit( Node, SystemNode, {
    //TODO prototype functions
  } );
} );
