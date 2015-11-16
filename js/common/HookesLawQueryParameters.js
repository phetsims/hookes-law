// Copyright 2015, University of Colorado Boulder

/**
 * Query parameters used in sim-specific code.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );

  var getQueryParameter = phet.chipper.getQueryParameter;

  var HookesLawQueryParameters = {

    // enables developer-only features
    DEV: getQueryParameter( 'dev' ) || false
  };

  hookesLaw.register( 'HookesLawQueryParameters', HookesLawQueryParameters );

  return HookesLawQueryParameters;
} );
