// Copyright 2002-2015, University of Colorado Boulder

/**
 * Bar graph representation of Energy.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  // strings
  var energyString = require( 'string!HOOKES_LAW/energy' );
  var joulesString = require( 'string!HOOKES_LAW/joules' );
  var pattern_0value_1units = require( 'string!HOOKES_LAW/pattern.0value.1units' );

  // constants
  var AXIS_LINE_WIDTH = 1;
  var AXIS_COLOR = 'black';

  /**
   * @param {Spring} spring
   * @param {Object} [options]
   * @constructor
   */
  function EnergyBarGraph( spring, options ) {

    options = options || {};

    //TODO this is temporary
    var boundsNode = new Rectangle( 0, 0, 100, 275, {
      stroke: 'lightGray'
    } );

    var xAxisNode = new Line( 0, 0, 50, 0, {
      stroke: AXIS_COLOR,
      lineWidth: AXIS_LINE_WIDTH
    } );

    var yAxisNode = new ArrowNode( 0, 0, 0, -300, {
      headHeight: 10,
      headWidth: 10,
      tailWidth: AXIS_LINE_WIDTH,
      fill: AXIS_COLOR,
      stroke: null
    } );

    options.children = [ boundsNode, xAxisNode, yAxisNode ];
    Node.call( this, options );
  }

  return inherit( Node, EnergyBarGraph );
} );
