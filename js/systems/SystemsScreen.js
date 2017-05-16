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
  var SystemsScreenView = require( 'HOOKES_LAW/systems/view/SystemsScreenView' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var systemsString = require( 'string!HOOKES_LAW/systems' );

  /**
   * @constructor
   */
  function SystemsScreen() {

    var options = _.extend( {}, HookesLawConstants.SCREEN_OPTIONS, {
      name: systemsString,
      homeScreenIcon: HookesLawIconFactory.createSystemsScreenIcon()
    } );

    Screen.call( this,
      function() { return new SystemsModel(); },
      function( model ) { return new SystemsScreenView( model ); },
      options
    );
  }

  hookesLaw.register( 'SystemsScreen', SystemsScreen );

  return inherit( Screen, SystemsScreen );
} );