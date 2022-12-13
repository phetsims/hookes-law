// Copyright 2015-2022, University of Colorado Boulder

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
      team: 'Michael Dubson, Bruna Shinohara de Mendon\u00e7a, Ariel Paul, Kathy Perkins, Martin Veillette',
      qualityAssurance: 'Steele Dalton, Brooklyn Lash, Elise Morgan, Oliver Orejola, Bryan Yoelin',
      graphicArts: 'Mariah Hermsmeyer'
    }
  } );

  sim.start();
} );