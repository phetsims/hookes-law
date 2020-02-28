// Copyright 2015-2020, University of Colorado Boulder

/**
 * The "Energy" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen from '../../../joist/js/Screen.js';
import inherit from '../../../phet-core/js/inherit.js';
import merge from '../../../phet-core/js/merge.js';
import HookesLawConstants from '../common/HookesLawConstants.js';
import HookesLawIconFactory from '../common/view/HookesLawIconFactory.js';
import hookesLawStrings from '../hookes-law-strings.js';
import hookesLaw from '../hookesLaw.js';
import EnergyModel from './model/EnergyModel.js';
import EnergyScreenView from './view/EnergyScreenView.js';

const energyString = hookesLawStrings.energy;

/**
 * @param {Tandem} tandem
 * @constructor
 */
function EnergyScreen( tandem ) {

  const options = merge( {}, HookesLawConstants.SCREEN_OPTIONS, {
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

inherit( Screen, EnergyScreen );
export default EnergyScreen;