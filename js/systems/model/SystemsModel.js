// Copyright 2015-2019, University of Colorado Boulder

/**
 * Model for the "Systems" screen, unrelated series and parallel systems.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import hookesLaw from '../../hookesLaw.js';
import ParallelSystem from './ParallelSystem.js';
import SeriesSystem from './SeriesSystem.js';

/**
 * @param {Tandem} tandem
 * @constructor
 */
function SystemsModel( tandem ) {
  this.seriesSystem = new SeriesSystem( tandem.createTandem( 'seriesSystem' ) );
  this.parallelSystem = new ParallelSystem( tandem.createTandem( 'parallelSystem' ) );
}

hookesLaw.register( 'SystemsModel', SystemsModel );

export default inherit( Object, SystemsModel, {

  // @public
  reset: function() {
    this.seriesSystem.reset();
    this.parallelSystem.reset();
  }
} );