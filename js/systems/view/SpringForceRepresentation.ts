// Copyright 2020-2022, University of Colorado Boulder

/**
 * SpringForceRepresentation enumerations the ways that spring force can be represented.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import hookesLaw from '../../hookesLaw.js';

export default class SpringForceRepresentation extends EnumerationValue {

  // as a single vector for the entire system
  public static readonly TOTAL = new SpringForceRepresentation();

  // as component vectors, one for each spring
  public static readonly COMPONENTS = new SpringForceRepresentation();

  public static readonly enumeration = new Enumeration( SpringForceRepresentation );
}

hookesLaw.register( 'SpringForceRepresentation', SpringForceRepresentation );