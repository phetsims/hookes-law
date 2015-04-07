// Copyright 2002-2015, University of Colorado Boulder

/**
 * The vertical wall that the left end of a spring is attached to.
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  /**
   * @param {Dimension2} size
   * @constructor
   */
  function WallNode( size ) {
    Rectangle.call( this, 0, 0, size.width, size.height, {
      fill: 'rgb( 150, 150, 150 )',
      stroke: 'black'
    } );
  }

  return inherit( Rectangle, WallNode );
} );
