// Copyright 2015-2020, University of Colorado Boulder

/**
 * Model for the "Systems" screen, unrelated series and parallel systems.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import hookesLaw from '../../hookesLaw.js';
import ParallelSystem from './ParallelSystem.js';
import SeriesSystem from './SeriesSystem.js';

class SystemsModel {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {
    this.seriesSystem = new SeriesSystem( tandem.createTandem( 'seriesSystem' ) );
    this.parallelSystem = new ParallelSystem( tandem.createTandem( 'parallelSystem' ) );
  }

  // @public
  reset() {
    this.seriesSystem.reset();
    this.parallelSystem.reset();
  }
}

hookesLaw.register( 'SystemsModel', SystemsModel );

export default SystemsModel;