// Copyright 2015-2019, University of Colorado Boulder

/**
 * Model for the "Energy" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import RangeWithValue from '../../../../dot/js/RangeWithValue.js';
import inherit from '../../../../phet-core/js/inherit.js';
import SingleSpringSystem from '../../common/model/SingleSpringSystem.js';
import hookesLaw from '../../hookesLaw.js';

/**
 * @param {Tandem} tandem
 * @constructor
 */
function EnergyModel( tandem ) {

  const springOptions = {
    logName: 'spring',
    springConstantRange: new RangeWithValue( 100, 400, 100 ), // units = N/m
    displacementRange: new RangeWithValue( -1, 1, 0 ) // units = m
  };

  this.system = new SingleSpringSystem( tandem.createTandem( 'system' ), springOptions );
}

hookesLaw.register( 'EnergyModel', EnergyModel );

export default inherit( Object, EnergyModel, {

  // @public
  reset: function() {
    this.system.reset();
  }
} );