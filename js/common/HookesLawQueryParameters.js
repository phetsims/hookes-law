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

  return HookesLawQueryParameters;
} );
