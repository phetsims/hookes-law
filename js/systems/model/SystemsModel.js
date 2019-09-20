// Copyright 2015-2019, University of Colorado Boulder

/**
 * Model for the "Systems" screen, unrelated series and parallel systems.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  const inherit = require( 'PHET_CORE/inherit' );
  const ParallelSystem = require( 'HOOKES_LAW/systems/model/ParallelSystem' );
  const SeriesSystem = require( 'HOOKES_LAW/systems/model/SeriesSystem' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function SystemsModel( tandem ) {
    this.seriesSystem = new SeriesSystem( tandem.createTandem( 'seriesSystem' ) );
    this.parallelSystem = new ParallelSystem( tandem.createTandem( 'parallelSystem' ) );
  }

  hookesLaw.register( 'SystemsModel', SystemsModel );

  return inherit( Object, SystemsModel, {

    // @public
    reset: function() {
      this.seriesSystem.reset();
      this.parallelSystem.reset();
    }
  } );
} );