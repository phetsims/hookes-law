//  Copyright 2002-2015, University of Colorado Boulder

/**
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var HookesLawModel = require( 'HOOKES_LAW/hookes-law/model/HookesLawModel' );
  var HookesLawScreenView = require( 'HOOKES_LAW/hookes-law/view/HookesLawScreenView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var hookesLawSimString = require( 'string!HOOKES_LAW/hookes-law.name' );

  /**
   * @constructor
   */
  function HookesLawScreen() {

    //If this is a single-screen sim, then no icon is necessary.
    //If there are multiple screens, then the icon must be provided here.
    var icon = null;

    Screen.call( this, hookesLawSimString, icon,
      function() { return new HookesLawModel(); },
      function( model ) { return new HookesLawScreenView( model ); },
      { backgroundColor: 'white' }
    );
  }

  return inherit( Screen, HookesLawScreen );
} );