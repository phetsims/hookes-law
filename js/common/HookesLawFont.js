// Copyright 2015-2019, University of Colorado Boulder

/**
 * Font used throughout this simulation.
 * Allows us to quickly change font properties for the entire simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  const inherit = require( 'PHET_CORE/inherit' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );

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
    options = _.extend( {
      family: 'Arial'
    }, options );

    PhetFont.call( this, options );
  }

  hookesLaw.register( 'HookesLawFont', HookesLawFont );

  return inherit( PhetFont, HookesLawFont );
} );
