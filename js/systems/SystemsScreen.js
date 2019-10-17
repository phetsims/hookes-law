// Copyright 2015-2019, University of Colorado Boulder

/**
 * The "Systems" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  const HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  const HookesLawIconFactory = require( 'HOOKES_LAW/common/view/HookesLawIconFactory' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const Screen = require( 'JOIST/Screen' );
  const SystemsModel = require( 'HOOKES_LAW/systems/model/SystemsModel' );
  const SystemsScreenView = require( 'HOOKES_LAW/systems/view/SystemsScreenView' );

  // strings
  const systemsString = require( 'string!HOOKES_LAW/systems' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function SystemsScreen( tandem ) {

    const options = merge( {}, HookesLawConstants.SCREEN_OPTIONS, {
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