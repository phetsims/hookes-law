// Copyright 2002-2015, University of Colorado Boulder

/**
 * The vertical wall that springs and robotic arm are attached to.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  /**
   * @param {Dimension2} size
   * @param {Object} [options]
   * @constructor
   */
  function WallNode( size, options ) {

    options = _.extend( {
      fill: HookesLawColors.WALL_FILL,
      stroke: HookesLawColors.WALL_STROKE,
      lineWidth: 0.5
    }, options );

    Rectangle.call( this, 0, 0, size.width, size.height, options );
  }

  return inherit( Rectangle, WallNode );
} );
