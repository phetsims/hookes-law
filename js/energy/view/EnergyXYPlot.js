// Copyright 2002-2015, University of Colorado Boulder

/**
 * XY plot of displacement (x axis) vs energy (y axis).
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
  function EnergyXYPlot( system, options ) {

    options = options || {};

    //TODO this is temporary
    var boundsNode = new Rectangle( 0, 0, 650, 275, {
      stroke: 'rgb( 255, 220, 220 )'
    } );

    options.children = [ boundsNode ];
    Node.call( this, options );
  }

  return inherit( Node, EnergyXYPlot );
} );