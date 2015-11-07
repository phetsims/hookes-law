// Copyright 2015, University of Colorado Boulder

/**
 * Model for the "Intro" screen, two unrelated single-spring systems.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Range = require( 'DOT/Range' );
  var SingleSpringSystem = require( 'HOOKES_LAW/common/model/SingleSpringSystem' );

  /**
   * @constructor
   */
  function IntroModel() {
    var springOptions = {
      springConstantRange: new Range( 100, 1000, 200 ), // units = N/m
      appliedForceRange: new Range( -100, 100, 0 ) // units = N
    };
    this.system1 = new SingleSpringSystem( springOptions ); // @public
    this.system2 = new SingleSpringSystem( springOptions ); // @public
  }

  return inherit( Object, IntroModel, {

    // @public
    reset: function() {
      this.system1.reset();
      this.system2.reset();
    }
  } );
} );