// Copyright 2015-2018, University of Colorado Boulder

/**
 * Model for the "Energy" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  const inherit = require( 'PHET_CORE/inherit' );
  const RangeWithValue = require( 'DOT/RangeWithValue' );
  const SingleSpringSystem = require( 'HOOKES_LAW/common/model/SingleSpringSystem' );

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

  return inherit( Object, EnergyModel, {

    // @public
    reset: function() {
      this.system.reset();
    }
  } );
} );