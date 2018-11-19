// Copyright 2015-2018, University of Colorado Boulder

/**
 * Model for the "Systems" screen, unrelated series and parallel systems.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ParallelSystem = require( 'HOOKES_LAW/systems/model/ParallelSystem' );
  var SeriesSystem = require( 'HOOKES_LAW/systems/model/SeriesSystem' );

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