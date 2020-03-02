// Copyright 2015-2020, University of Colorado Boulder

/**
 * Model for the "Energy" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import RangeWithValue from '../../../../dot/js/RangeWithValue.js';
import SingleSpringSystem from '../../common/model/SingleSpringSystem.js';
import hookesLaw from '../../hookesLaw.js';

class EnergyModel {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    const springOptions = {
      logName: 'spring',
      springConstantRange: new RangeWithValue( 100, 400, 100 ), // units = N/m
      displacementRange: new RangeWithValue( -1, 1, 0 ) // units = m
    };

    // @public
    this.system = new SingleSpringSystem( tandem.createTandem( 'system' ), springOptions );
  }

  // @public
  reset() {
    this.system.reset();
  }
}

hookesLaw.register( 'EnergyModel', EnergyModel );

export default EnergyModel;