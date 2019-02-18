// Copyright 2015-2019, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var EnergyScreen = require( 'HOOKES_LAW/energy/EnergyScreen' );
  var HookesLawQueryParameters = require( 'HOOKES_LAW/common/HookesLawQueryParameters' );
  var IntroScreen = require( 'HOOKES_LAW/intro/IntroScreen' );
  var ReentrantScreen = require( 'HOOKES_LAW/reentrant/ReentrantScreen' );
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
      team: 'Michael Dubson, Bruna Shinohara de Mendon\u00e7a, Ariel Paul, Kathy Perkins, Martin Veillette',
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

    if ( HookesLawQueryParameters.reentrant ) {
      screens.push( new ReentrantScreen() );
    }

    var sim = new Sim( hookesLawTitleString, screens, options );
    sim.start();
  } );
} );
