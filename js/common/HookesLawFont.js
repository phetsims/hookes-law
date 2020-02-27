// Copyright 2015-2019, University of Colorado Boulder

/**
 * Font used throughout this simulation.
 * Allows us to quickly change font properties for the entire simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../phet-core/js/inherit.js';
import merge from '../../../phet-core/js/merge.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import hookesLaw from '../hookesLaw.js';

/**
 * @param {Object|number} options - {Object} font options or {number} font size
 * @constructor
 */
function HookesLawFont( options ) {

  // convenience for specifying font size only, e.g. new HookesLawFont(24)
  if ( typeof options === 'number' ) {
    options = { size: options };
  }

  // font attributes, as specified in the design document
  options = merge( {
    family: 'Arial'
  }, options );

  PhetFont.call( this, options );
}

hookesLaw.register( 'HookesLawFont', HookesLawFont );

inherit( PhetFont, HookesLawFont );
export default HookesLawFont;