// Copyright 2015-2019, University of Colorado Boulder

/**
 * The vertical wall that springs are attached to.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Bounds2 from '../../../../dot/js/Bounds2.js';
import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import ShadedRectangle from '../../../../scenery-phet/js/ShadedRectangle.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawColors from '../HookesLawColors.js';

/**
 * @param {Dimension2} size
 * @param {Object} [options]
 * @constructor
 */
function WallNode( size, options ) {

  options = merge( {
    baseColor: HookesLawColors.WALL_FILL,
    stroke: HookesLawColors.WALL_STROKE,
    lineWidth: 0.5,
    cornerRadius: 6
  }, options );

  ShadedRectangle.call( this, new Bounds2( 0, 0, size.width, size.height ), options );
}

hookesLaw.register( 'WallNode', WallNode );

inherit( ShadedRectangle, WallNode );
export default WallNode;