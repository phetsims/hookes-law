// Copyright 2015-2018, University of Colorado Boulder

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
    checkAll: { type: 'flag' },

    // Adds the 'Reentrant' screen, see https://github.com/phetsims/phet-io/issues/1349
    reentrant: { type: 'flag' }
  } );

  hookesLaw.register( 'HookesLawQueryParameters', HookesLawQueryParameters );

  // log the values of all sim-specific query parameters
  phet.log && phet.log( 'query parameters: ' + JSON.stringify( HookesLawQueryParameters, null, 2 ) );

  return HookesLawQueryParameters;
} );
