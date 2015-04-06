// Copyright 2002-2015, University of Colorado Boulder

/**
 * One spring and all of the visual representations that go with it.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  /**
   * @param {Spring} spring
   * @param {Object} [options]
   * @constructor
   */
  function SystemNode( spring, options ) {

    Node.call( this );

    //TODO temporary
    var outline = new Rectangle( 0, 0, 725, 170, { stroke: 'rgb( 230, 230, 230 )' } );
    this.addChild( outline );

    this.mutate( options );
  }

  return inherit( Node, SystemNode, {
    //TODO prototype functions
  } );
} );
