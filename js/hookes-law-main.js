// Copyright 2002-2015, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var EnergyScreen = require( 'HOOKES_LAW/energy/EnergyScreen' );
  var ExperimentalScreen = require( 'HOOKES_LAW/experimental/ExperimentalScreen' );
  var HookesLawQueryParameters = require( 'HOOKES_LAW/common/HookesLawQueryParameters' );
  var IntroductionScreen = require( 'HOOKES_LAW/introduction/IntroductionScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var SystemsScreen = require( 'HOOKES_LAW/systems/SystemsScreen' );

  // strings
  var title = require( 'string!HOOKES_LAW/hookes-law.name' );

  var screens = [
    new IntroductionScreen(),
    new SystemsScreen(),
    new EnergyScreen()
  ];

  // Add test harness for ParametricSpringNode
  if ( HookesLawQueryParameters.DEV ) {
    screens.push( new ExperimentalScreen() );
  }

  var options = {
    credits: {
      leadDesign: 'Amy Rouinfar',
      softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
      team: 'Mike Dubson, Bruna Shinohara de Mendonça, Ariel Paul, Kathy Perkins, Martin Veillette',
      qualityAssurance: '', //TODO get names from AP
      graphicArts: 'Mariah Hermsmeyer'
    }
  };

  SimLauncher.launch( function() {
    var sim = new Sim( title, screens, options );
    sim.start();
  } );
} );
