// Copyright 2016, University of Colorado Boulder

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

    // checks all Check Boxes, to make development easier
    checkAll: { type: 'flag' }
  } );

  hookesLaw.register( 'HookesLawQueryParameters', HookesLawQueryParameters );

  // log the values of all sim-specific query parameters
  if ( phet.log ) {
    for ( var property in HookesLawQueryParameters ) {
      if ( HookesLawQueryParameters.hasOwnProperty( property ) ) {
        phet.log( property + '=' + HookesLawQueryParameters[ property ] );
      }
    }
  }

  return HookesLawQueryParameters;
} );
