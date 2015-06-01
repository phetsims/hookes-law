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
  var SingleSpringSystem = require( 'HOOKES_LAW/introduction/model/SingleSpringSystem' );

  /**
   * @constructor
   */
  function EnergyModel() {
    this.system = new SingleSpringSystem();
  }

  return inherit( Object, EnergyModel, {

    reset: function() {
      this.system1.reset();
    }
  } );
} );