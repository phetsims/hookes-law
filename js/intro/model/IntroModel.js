// Copyright 2015-2016, University of Colorado Boulder

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
   * @constructor
   */
  function IntroModel() {
    var springOptions = {
      springConstantRange: new RangeWithValue( 100, 1000, 200 ), // units = N/m
      appliedForceRange: new RangeWithValue( -100, 100, 0 ) // units = N
    };
    this.system1 = new SingleSpringSystem( springOptions ); // @public
    this.system2 = new SingleSpringSystem( springOptions ); // @public
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