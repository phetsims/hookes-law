// Copyright 2015, University of Colorado Boulder

/**
 * The "Systems" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var HookesLawIconFactory = require( 'HOOKES_LAW/common/view/HookesLawIconFactory' );
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
      HookesLawIconFactory.createSystemsScreenIcon(),
      function() { return new SystemsModel(); },
      function( model ) { return new SystemsView( model ); },
      HookesLawConstants.SCREEN_OPTIONS
    );
  }

  hookesLaw.register( 'SystemsScreen', SystemsScreen );

  return inherit( Screen, SystemsScreen );
} );