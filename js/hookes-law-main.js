// Copyright 2015-2019, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const EnergyScreen = require( 'HOOKES_LAW/energy/EnergyScreen' );
  const IntroScreen = require( 'HOOKES_LAW/intro/IntroScreen' );
  const Sim = require( 'JOIST/Sim' );
  const SimLauncher = require( 'JOIST/SimLauncher' );
  const SystemsScreen = require( 'HOOKES_LAW/systems/SystemsScreen' );
  const Tandem = require( 'TANDEM/Tandem' );

  // strings
  const hookesLawTitleString = require( 'string!HOOKES_LAW/hookes-law.title' );

  const options = {
    credits: {
      leadDesign: 'Amy Rouinfar',
      softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
      team: 'Michael Dubson, Bruna Shinohara de Mendon\u00e7a, Ariel Paul, Kathy Perkins, Martin Veillette',
      qualityAssurance: 'Steele Dalton, Elise Morgan, Oliver Orejola, Bryan Yoelin',
      graphicArts: 'Mariah Hermsmeyer'
    }
  };

  SimLauncher.launch( function() {

    const screens = [
      new IntroScreen( Tandem.rootTandem.createTandem( 'introScreen' ) ),
      new SystemsScreen( Tandem.rootTandem.createTandem( 'systemsScreen' ) ),
      new EnergyScreen( Tandem.rootTandem.createTandem( 'energyScreen' ) )
    ];

    const sim = new Sim( hookesLawTitleString, screens, options );
    sim.start();
  } );
} );
