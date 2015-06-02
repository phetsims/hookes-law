// Copyright 2002-2015, University of Colorado Boulder

/**
 * Model for the "Energy" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Range = require( 'DOT/Range' );
  var SingleSpringSystem = require( 'HOOKES_LAW/introduction/model/SingleSpringSystem' );

  /**
   * @constructor
   */
  function EnergyModel() {

    this.system = new SingleSpringSystem( {
      springConstantRange: new Range( 100, 400, 100 ),
      appliedForceRange: new Range( -100, 100, 0 )
    } );

    // F = kx, set ranges above such that displacement range is (-1,1)
    assert( this.system.spring.displacementRange.min === -1 && this.system.spring.displacementRange.max === 1 );
  }

  return inherit( Object, EnergyModel, {

    reset: function() {
      this.system.reset();
    }
  } );
} );