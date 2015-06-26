// Copyright 2002-2015, University of Colorado Boulder

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
      springConstantRange: new Range( 100, 1000, 200 ),
      appliedForceRange: new Range( -100, 100, 0 )
    };
    this.system1 = new SingleSpringSystem( springOptions );
    this.system2 = new SingleSpringSystem( springOptions );
  }

  return inherit( Object, IntroModel, {

    reset: function() {
      this.system1.reset();
      this.system2.reset();
    }
  } );
} );