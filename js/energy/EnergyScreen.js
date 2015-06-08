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
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var energyString = require( 'string!HOOKES_LAW/energy' );

  //TODO design: what does the screen icon look like?
  var createIcon = function() {
    return new Rectangle( 0, 0, 100, 100, { fill: 'yellow' } );
  };

  /**
   * @constructor
   */
  function EnergyScreen() {
    Screen.call( this,
      energyString,
      createIcon(),
      function() { return new EnergyModel(); },
      function( model ) { return new EnergyView( model ); },
      { backgroundColor: 'white' }
    );
  }

  return inherit( Screen, EnergyScreen );
} );