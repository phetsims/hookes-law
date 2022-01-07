// Copyright 2020-2022, University of Colorado Boulder

import EnumerationDeprecated from '../../../../phet-core/js/EnumerationDeprecated.js';
import hookesLaw from '../../hookesLaw.js';

/**
 * SpringForceRepresentation enumerations the ways that spring force can be represented.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

const SpringForceRepresentation = EnumerationDeprecated.byKeys( [
  'TOTAL',  // as a single vector for the entire system
  'COMPONENTS' // as component vectors, one for each spring
] );

hookesLaw.register( 'SpringForceRepresentation', SpringForceRepresentation );
export default SpringForceRepresentation;