// Copyright 2015-2018, University of Colorado Boulder

/**
 * The "Energy" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const EnergyModel = require( 'HOOKES_LAW/energy/model/EnergyModel' );
  const EnergyScreenView = require( 'HOOKES_LAW/energy/view/EnergyScreenView' );
  const hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  const HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  const HookesLawIconFactory = require( 'HOOKES_LAW/common/view/HookesLawIconFactory' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Screen = require( 'JOIST/Screen' );

  // strings
  const energyString = require( 'string!HOOKES_LAW/energy' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function EnergyScreen( tandem ) {

    const options = _.extend( {}, HookesLawConstants.SCREEN_OPTIONS, {
      name: energyString,
      homeScreenIcon: HookesLawIconFactory.createEnergyScreenIcon(),
      tandem: tandem
    } );

    Screen.call( this,
      function() { return new EnergyModel( tandem.createTandem( 'model' ) ); },
      function( model ) { return new EnergyScreenView( model, tandem.createTandem( 'view' ) ); },
      options
    );
  }

  hookesLaw.register( 'EnergyScreen', EnergyScreen );

  return inherit( Screen, EnergyScreen );
} );