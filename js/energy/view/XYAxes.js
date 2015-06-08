// Copyright 2002-2015, University of Colorado Boulder

/**
 * Axes for XY plots.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );

  // constants
  var AXIS_OPTIONS = {
    headHeight: 10,
    headWidth: 10,
    tailWidth: 1,
    fill: 'black',
    stroke: null
  };

  /**
   * @param {Object} [options]
   * @constructor
   */
  function XYAxes( options ) {

    options = _.extend( {
      minX: -1,
      maxX: 1,
      minY: -1,
      maxY: 1,
      xString: 'x',
      yString: 'y',
      font: new PhetFont( 14 )
    }, options );

    // x axis
    var xAxisNode = new ArrowNode( options.minX, 0, options.maxX, 0, AXIS_OPTIONS );
    var xAxisLabel = new Text( options.xString, {
      font: options.font,
      left: xAxisNode.right + 4,
      centerY: xAxisNode.centerY
    } );

    // y axis
    var yAxisNode = new ArrowNode( 0, -options.minY, 0, -options.maxY, AXIS_OPTIONS );
    var yAxisLabel = new Text( options.yString, {
      font: options.font,
      centerX: yAxisNode.centerX,
      bottom: yAxisNode.top - 2
    } );

    options.children = [ xAxisNode, xAxisLabel, yAxisNode, yAxisLabel ];
    Node.call( this, options );
  }

  return inherit( Node, XYAxes );
} );
