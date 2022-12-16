// Copyright 2015-2022, University of Colorado Boulder

/**
 * Model for the "Energy" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import RangeWithValue from '../../../../dot/js/RangeWithValue.js';
import TModel from '../../../../joist/js/TModel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import SingleSpringSystem from '../../common/model/SingleSpringSystem.js';
import hookesLaw from '../../hookesLaw.js';

export default class EnergyModel implements TModel {

  public readonly system: SingleSpringSystem;

  public constructor( tandem: Tandem ) {

    this.system = new SingleSpringSystem( {
      springOptions: {
        logName: 'spring',
        springConstantRange: new RangeWithValue( 100, 400, 100 ), // units = N/m
        displacementRange: new RangeWithValue( -1, 1, 0 ) // units = m
      },
      tandem: tandem.createTandem( 'system' )
    } );
  }

  public reset(): void {
    this.system.reset();
  }
}

hookesLaw.register( 'EnergyModel', EnergyModel );