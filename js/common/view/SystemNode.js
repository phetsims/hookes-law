// Copyright 2002-2015, University of Colorado Boulder

/**
 * One spring and all of the visual representations that go with it.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Dimension2 = require( 'DOT/Dimension2' );
  var HookNode = require( 'HOOKES_LAW/common/view/HookNode' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var WallNode = require( 'HOOKES_LAW/common/view/WallNode' );

  /**
   * @param {Spring} spring
   * @param {Range} displacementRange
   * @param {Object} [options]
   * @constructor
   */
  function SystemNode( spring, displacementRange, options ) {

    Node.call( this );

    //TODO temporary
    var outline = new Rectangle( 0, 0, 725, 170, { stroke: 'rgb( 230, 230, 230 )' } );
    this.addChild( outline );

    var wallNode = new WallNode( new Dimension2( 25, outline.height ), {
      left: outline.left,
      centerY: outline.centerY
    } );
    this.addChild( wallNode );

    var hookNode = new HookNode( spring.displacementProperty, displacementRange, {
      centerY: outline.centerY
    } );
    this.addChild( hookNode );

    this.mutate( options );
  }

  return inherit( Node, SystemNode, {
    //TODO prototype functions
  } );
} );
