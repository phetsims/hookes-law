// Copyright 2002-2015, University of Colorado Boulder

/**
 * Bar graph representation of Energy.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  function EnergyBarGraph( system, options ) {

    options = options || {};

    //TODO this is temporary
    var boundsNode = new Rectangle( 0, 0, 100, 275, {
      stroke: 'lightGray'
    } );

    options.children = [ boundsNode ];
    Node.call( this, options );
  }

  return inherit( Node, EnergyBarGraph );
} );
