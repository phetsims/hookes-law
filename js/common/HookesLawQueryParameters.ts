// Copyright 2015-2021, University of Colorado Boulder

/**
 * Query parameters used in sim-specific code.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import logGlobal from '../../../phet-core/js/logGlobal.js';
import hookesLaw from '../hookesLaw.js';

const HookesLawQueryParameters = QueryStringMachine.getAll( {

  // Checks all Check Boxes, to make development easier.
  // For internal use only.
  checkAll: { type: 'flag' }
} );

hookesLaw.register( 'HookesLawQueryParameters', HookesLawQueryParameters );

// Log query parameters
logGlobal( 'phet.chipper.queryParameters' );
logGlobal( 'phet.preloads.phetio.queryParameters' );
logGlobal( 'phet.hookesLaw.HookesLawQueryParameters' );

export default HookesLawQueryParameters;