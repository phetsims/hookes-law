// Copyright 2015-2026, University of Colorado Boulder

/**
 * Query parameters used in sim-specific code.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import logGlobal from '../../../phet-core/js/logGlobal.js';
import { QueryStringMachine } from '../../../query-string-machine/js/QueryStringMachineModule.js';

const HookesLawQueryParameters = QueryStringMachine.getAll( {

  // Checks all Checkboxes, to make development easier.
  // For internal use only.
  checkAll: { type: 'flag' }
} );

// Log query parameters
logGlobal( 'phet.chipper.queryParameters' );
logGlobal( 'phet.preloads.phetio.queryParameters' );
phet.log && phet.log( `HookesLawQueryParameters: ${JSON.stringify( HookesLawQueryParameters, null, 2 )}` );

export default HookesLawQueryParameters;
