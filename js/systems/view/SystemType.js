// Copyright 2020, University of Colorado Boulder

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import hookesLaw from '../../hookesLaw.js';

/**
 * SystemType enumerates the types of systems available in the Systems screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
const SystemType = Enumeration.byKeys( [ 'SERIES', 'PARALLEL' ] );

hookesLaw.register( 'SystemTypes', SystemType );
export default SystemType;