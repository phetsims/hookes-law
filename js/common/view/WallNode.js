// Copyright 2002-2015, University of Colorado Boulder

/**
 * The vertical wall that the left end of a spring is attached to.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Shape = require( 'KITE/Shape' );

  /**
   * @param {Dimension2} size
   * @param {Object} [options]
   * @constructor
   */
  function WallNode( size, options ) {

    options = options || {};

    var frontNode = new Rectangle( 0, 0, size.width, size.height, {
      fill: HookesLawColors.WALL_FILL,
      stroke: HookesLawColors.WALL_STROKE,
      lineWidth: 0.5
    } );

    var topNode = new Path( new Shape().moveTo( 0, 0 ).lineTo( size.width, 0 ).lineTo( size.width + 5, -5 ).lineTo( 5, -5 ).close(), {
      fill: HookesLawColors.WALL_FILL,
      stroke: HookesLawColors.WALL_STROKE,
      lineWidth: 0.5
    } );

    var sideNode = new Path( new Shape().moveTo( size.width, 0 ).lineTo( size.width + 5, -5 ).lineTo( size.width + 5, size.height - 5 ).lineTo( size.width, size.height ).close(), {
      fill: HookesLawColors.WALL_FILL,
      stroke: HookesLawColors.WALL_STROKE,
      lineWidth: 0.5
    } );

    options.children = [ sideNode, topNode, frontNode ];
    Node.call( this, options );
  }

  return inherit( Node, WallNode );
} );
