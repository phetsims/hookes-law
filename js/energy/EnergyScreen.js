// Copyright 2002-2015, University of Colorado Boulder

/**
 * The "Energy" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var EnergyModel = require( 'HOOKES_LAW/energy/model/EnergyModel' );
  var EnergyView = require( 'HOOKES_LAW/energy/view/EnergyView' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var energyString = require( 'string!HOOKES_LAW/energy' );

  // images
  var energyScreenImage = require( 'image!HOOKES_LAW/energy-screen.png' );

  /**
   * @constructor
   */
  function EnergyScreen() {
    Screen.call( this,
      energyString,
      new Image( energyScreenImage ),
      function() { return new EnergyModel(); },
      function( model ) { return new EnergyView( model ); },
      { backgroundColor: 'white' }
    );
  }

  return inherit( Screen, EnergyScreen );
} );