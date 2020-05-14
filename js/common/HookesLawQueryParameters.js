// Copyright 2015-2020, University of Colorado Boulder

/**
 * Query parameters used in sim-specific code.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import hookesLaw from '../hookesLaw.js';

const HookesLawQueryParameters = QueryStringMachine.getAll( {

  // Checks all Check Boxes, to make development easier.
  // For internal use only.
  checkAll: { type: 'flag' }
} );

hookesLaw.register( 'HookesLawQueryParameters', HookesLawQueryParameters );

// log the values of all sim-specific query parameters
phet.log && phet.log( 'query parameters: ' + JSON.stringify( HookesLawQueryParameters, null, 2 ) );

export default HookesLawQueryParameters;