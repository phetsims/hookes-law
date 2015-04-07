// Copyright 2002-2015, University of Colorado Boulder

//TODO this is a quick-&-dirty temporary implementation
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
   * @param {Object} [options]
   * @constructor
   */
  function WallNode( size, options ) {

    options = _.extend( {
      fill: 'rgb( 150, 150, 150 )',
      stroke: 'black'
    }, options );

    Rectangle.call( this, 0, 0, size.width, size.height, options );
  }

  return inherit( Rectangle, WallNode );
} );
