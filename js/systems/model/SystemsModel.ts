// Copyright 2015-2022, University of Colorado Boulder

/**
 * Model for the "Systems" screen, unrelated series and parallel systems.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TModel from '../../../../joist/js/TModel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import hookesLaw from '../../hookesLaw.js';
import ParallelSystem from './ParallelSystem.js';
import SeriesSystem from './SeriesSystem.js';

export default class SystemsModel implements TModel {

  public readonly seriesSystem: SeriesSystem;
  public readonly parallelSystem: ParallelSystem;

  public constructor( tandem: Tandem ) {
    this.seriesSystem = new SeriesSystem( tandem.createTandem( 'seriesSystem' ) );
    this.parallelSystem = new ParallelSystem( tandem.createTandem( 'parallelSystem' ) );
  }

  public reset(): void {
    this.seriesSystem.reset();
    this.parallelSystem.reset();
  }
}

hookesLaw.register( 'SystemsModel', SystemsModel );