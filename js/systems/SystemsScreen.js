// Copyright 2015-2018, University of Colorado Boulder

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
  var Screen = require( 'JOIST/Screen' );
  var SystemsModel = require( 'HOOKES_LAW/systems/model/SystemsModel' );
  var SystemsScreenView = require( 'HOOKES_LAW/systems/view/SystemsScreenView' );

  // strings
  var systemsString = require( 'string!HOOKES_LAW/systems' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function SystemsScreen( tandem ) {

    var options = _.extend( {}, HookesLawConstants.SCREEN_OPTIONS, {
      name: systemsString,
      homeScreenIcon: HookesLawIconFactory.createSystemsScreenIcon(),
      tandem: tandem
    } );

    Screen.call( this,
      function() { return new SystemsModel( tandem.createTandem( 'model' ) ); },
      function( model ) { return new SystemsScreenView( model, tandem.createTandem( 'view' ) ); },
      options
    );
  }

  hookesLaw.register( 'SystemsScreen', SystemsScreen );

  return inherit( Screen, SystemsScreen );
} );