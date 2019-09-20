// Copyright 2015-2019, University of Colorado Boulder

/**
 * The vertical wall that springs are attached to.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const Bounds2 = require( 'DOT/Bounds2' );
  const hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  const HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  const inherit = require( 'PHET_CORE/inherit' );
  const ShadedRectangle = require( 'SCENERY_PHET/ShadedRectangle' );

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

  hookesLaw.register( 'WallNode', WallNode );

  return inherit( ShadedRectangle, WallNode );
} );
