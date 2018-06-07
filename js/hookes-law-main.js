// Copyright 2015-2017, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var EnergyScreen = require( 'HOOKES_LAW/energy/EnergyScreen' );
  var IntroScreen = require( 'HOOKES_LAW/intro/IntroScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var SystemsScreen = require( 'HOOKES_LAW/systems/SystemsScreen' );
  var Tandem = require( 'TANDEM/Tandem' );

  // strings
  var hookesLawTitleString = require( 'string!HOOKES_LAW/hookes-law.title' );

  var options = {
    credits: {
      leadDesign: 'Amy Rouinfar',
      softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
      team: 'Michael Dubson, Bruna Shinohara de Mendonça, Ariel Paul, Kathy Perkins, Martin Veillette',
      qualityAssurance: 'Steele Dalton, Elise Morgan, Oliver Orejola, Bryan Yoelin',
      graphicArts: 'Mariah Hermsmeyer'
    }
  };

  SimLauncher.launch( function() {
    var screens = [
      new IntroScreen( Tandem.rootTandem.createTandem( 'introScreen' ) ),
      new SystemsScreen( Tandem.rootTandem.createTandem( 'systemsScreen' ) ),
      new EnergyScreen( Tandem.rootTandem.createTandem( 'energyScreen' ) )
    ];
    var sim = new Sim( hookesLawTitleString, screens, options );
    sim.start();
  } );
} );
