// Copyright 2002-2015, University of Colorado Boulder

/**
 * The vertical wall that springs are attached to.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ShadedRectangle = require( 'SCENERY_PHET/ShadedRectangle' );

  /**
   * @param {Dimension2} size
   * @param {Object} [options]
   * @constructor
   */
  function WallNode( size, options ) {

    options = _.extend( {
      baseColor: HookesLawColors.WALL_FILL,
      stroke: HookesLawColors.WALL_STROKE,
      lineWidth: 0.5,
      cornerRadius: 6
    }, options );

    ShadedRectangle.call( this, new Bounds2( 0, 0, size.width, size.height ), options );
  }

  return inherit( ShadedRectangle, WallNode );
} );
