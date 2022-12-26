// Copyright 2020-2022, University of Colorado Boulder

// @ts-nocheck
import EnumerationDeprecated from '../../../../phet-core/js/EnumerationDeprecated.js';
import hookesLaw from '../../hookesLaw.js';

/**
 * SystemType enumerates the types of systems available in the Systems screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
const SystemType = EnumerationDeprecated.byKeys( [ 'SERIES', 'PARALLEL' ] );

hookesLaw.register( 'SystemType', SystemType );
export default SystemType;