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
  var SingleSpringSystem = require( 'HOOKES_LAW/common/model/SingleSpringSystem' );

  /**
   * @constructor
   */
  function EnergyModel() {
    this.system = new SingleSpringSystem( {
      springConstantRange: new Range( 100, 400, 100 ), // units = F
      displacementRange: new Range( -1, 1, 0 ) // units = m
    } );
  }

  return inherit( Object, EnergyModel, {

    // @public
    reset: function() {
      this.system.reset();
    }
  } );
} );