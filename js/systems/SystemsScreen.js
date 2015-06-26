// Copyright 2002-2015, University of Colorado Boulder

/**
 * The "Systems" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var IconFactory = require( 'HOOKES_LAW/common/view/IconFactory' );
  var inherit = require( 'PHET_CORE/inherit' );
  var SystemsModel = require( 'HOOKES_LAW/systems/model/SystemsModel' );
  var SystemsView = require( 'HOOKES_LAW/systems/view/SystemsView' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var systemsString = require( 'string!HOOKES_LAW/systems' );

  /**
   * @constructor
   */
  function SystemsScreen() {
    Screen.call( this,
      systemsString,
      IconFactory.createSystemsScreenIcon(),
      function() { return new SystemsModel(); },
      function( model ) { return new SystemsView( model ); },
      { backgroundColor: 'white' }
    );
  }

  return inherit( Screen, SystemsScreen );
} );