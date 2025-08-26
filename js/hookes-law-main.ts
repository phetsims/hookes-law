// Copyright 2015-2025, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import Tandem from '../../tandem/js/Tandem.js';
import EnergyScreen from './energy/EnergyScreen.js';
import HookesLawStrings from './HookesLawStrings.js';
import IntroScreen from './intro/IntroScreen.js';
import SystemsScreen from './systems/SystemsScreen.js';

simLauncher.launch( () => {

  const screens = [
    new IntroScreen( Tandem.ROOT.createTandem( 'introScreen' ) ),
    new SystemsScreen( Tandem.ROOT.createTandem( 'systemsScreen' ) ),
    new EnergyScreen( Tandem.ROOT.createTandem( 'energyScreen' ) )
  ];

  const sim = new Sim( HookesLawStrings[ 'hookes-law' ].titleStringProperty, screens, {
    credits: {
      leadDesign: 'Amy Rouinfar',
      softwareDevelopment: 'Chris Malley (PixelZoom, Inc.)',
      team: 'Michael Dubson, Bruna Shinohara de Mendon\u00e7a, Ariel Paul, Kathy Perkins, Nancy Salpepi, Martin Veillette',
      qualityAssurance: 'Steele Dalton, Jaron Droder, Brooklyn Lash, Matthew Moore, Elise Morgan, Oliver Orejola, ' +
                        'Valentina P\u00e9rez, Kathryn Woessner, Bryan Yoelin',
      graphicArts: 'Mariah Hermsmeyer'
    },
    phetioDesigned: true
  } );

  sim.start();
} );