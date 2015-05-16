// Copyright 2002-2015, University of Colorado Boulder

/**
 * Model for the "Systems" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ParallelSystem = require( 'HOOKES_LAW/systems/model/ParallelSystem' );
  var PropertySet = require( 'AXON/PropertySet' );
  var SeriesSystem = require( 'HOOKES_LAW/systems/model/SeriesSystem' );

  /**
   * @constructor
   */
  function SystemsModel() {

    PropertySet.call( this, {
      seriesParallel: 'parallel' // configuration of the springs, 'series'|'parallel'
    } );

    this.seriesSystem = new SeriesSystem();
    this.parallelSystem = new ParallelSystem();
  }

  return inherit( PropertySet, SystemsModel, {

    // @override
    reset: function() {
      PropertySet.prototype.reset.call( this );
      this.seriesSystem.reset();
      this.parallelSystem.reset();
    }
  } );
} );