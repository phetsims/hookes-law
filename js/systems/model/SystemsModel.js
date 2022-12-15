// Copyright 2015-2022, University of Colorado Boulder

// @ts-nocheck
/**
 * Model for the "Systems" screen, unrelated series and parallel systems.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import hookesLaw from '../../hookesLaw.js';
import ParallelSystem from './ParallelSystem.js';
import SeriesSystem from './SeriesSystem.js';

export default class SystemsModel {

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