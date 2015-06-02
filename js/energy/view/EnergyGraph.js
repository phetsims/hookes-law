// Copyright 2002-2015, University of Colorado Boulder

/**
 * Energy graph in the "Energy" screen.
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
   * @param {SingleSpringSystem} system
   * @param {Object} [options]
   * @constructor
   */
  function EnergyGraph( system, options ) {

    options = options || {};

    //TODO this is temporary
    var boundsNode = new Rectangle( 0, 0, 750, 275, {
      stroke: 'rgb( 255, 220, 220 )'
    } );

    options.children = [ boundsNode ];
    Node.call( this, options );
  }

  return inherit( Node, EnergyGraph );
} );