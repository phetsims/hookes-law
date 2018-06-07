// Copyright 2015-2017, University of Colorado Boulder

/**
 * Model for the "Intro" screen, two unrelated single-spring systems.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  var inherit = require( 'PHET_CORE/inherit' );
  var RangeWithValue = require( 'DOT/RangeWithValue' );
  var SingleSpringSystem = require( 'HOOKES_LAW/common/model/SingleSpringSystem' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function IntroModel( tandem ) {

    var springOptions = {
      springConstantRange: new RangeWithValue( 100, 1000, 200 ), // units = N/m
      appliedForceRange: new RangeWithValue( -100, 100, 0 ) // units = N
    };

    // @public
    this.system1 = new SingleSpringSystem( tandem.createTandem( 'system1' ), springOptions );
    this.system2 = new SingleSpringSystem( tandem.createTandem( 'system2' ), springOptions );
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