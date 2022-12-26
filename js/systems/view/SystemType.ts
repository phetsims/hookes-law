// Copyright 2020-2022, University of Colorado Boulder

/**
 * SystemType enumerates the types of systems available in the Systems screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Enumeration from '../../../../phet-core/js/Enumeration.js';
import EnumerationValue from '../../../../phet-core/js/EnumerationValue.js';
import hookesLaw from '../../hookesLaw.js';

export default class SystemType extends EnumerationValue {

  public static readonly SERIES = new SystemType();
  public static readonly PARALLEL = new SystemType();

  public static readonly enumeration = new Enumeration( SystemType );
}

hookesLaw.register( 'SystemType', SystemType );