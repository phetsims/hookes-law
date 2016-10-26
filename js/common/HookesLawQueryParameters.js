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

  var HookesLawQueryParameters = QueryStringMachine.getAll( {

    // enables developer-only features
    dev: { type: 'flag' }
  } );

  hookesLaw.register( 'HookesLawQueryParameters', HookesLawQueryParameters );

  return HookesLawQueryParameters;
} );
