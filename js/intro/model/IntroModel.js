// Copyright 2015-2019, University of Colorado Boulder

/**
 * Model for the "Intro" screen, two unrelated single-spring systems.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const RangeWithValue = require( 'DOT/RangeWithValue' );
  const SingleSpringSystem = require( 'HOOKES_LAW/common/model/SingleSpringSystem' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function IntroModel( tandem ) {

    const springOptions = {
      springConstantRange: new RangeWithValue( 100, 1000, 200 ), // units = N/m
      appliedForceRange: new RangeWithValue( -100, 100, 0 ) // units = N
    };

    // @public
    this.system1 = new SingleSpringSystem( tandem.createTandem( 'system1' ),
      merge( {}, springOptions, { logName: 'spring1' } ) );
    this.system2 = new SingleSpringSystem( tandem.createTandem( 'system2' ),
      merge( {}, springOptions, { logName: 'spring2' } ) );
  }

  hookesLaw.register( 'IntroModel', IntroModel );

  return inherit( Object, IntroModel, {

    // @public
    reset: function() {
      this.system1.reset();
      this.system2.reset();
    }
  } );
} );