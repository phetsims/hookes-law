// Copyright 2015-2022, University of Colorado Boulder

// @ts-nocheck
/**
 * The "Energy" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen from '../../../joist/js/Screen.js';
import merge from '../../../phet-core/js/merge.js';
import HookesLawConstants from '../common/HookesLawConstants.js';
import HookesLawIconFactory from '../common/view/HookesLawIconFactory.js';
import hookesLaw from '../hookesLaw.js';
import HookesLawStrings from '../HookesLawStrings.js';
import EnergyModel from './model/EnergyModel.js';
import EnergyScreenView from './view/EnergyScreenView.js';

class EnergyScreen extends Screen {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    const options = merge( {}, HookesLawConstants.SCREEN_OPTIONS, {
      name: HookesLawStrings.energyStringProperty,
      homeScreenIcon: HookesLawIconFactory.createEnergyScreenIcon(),
      tandem: tandem
    } );

    super(
      () => new EnergyModel( tandem.createTandem( 'model' ) ),
      model => new EnergyScreenView( model, tandem.createTandem( 'view' ) ),
      options
    );
  }
}

hookesLaw.register( 'EnergyScreen', EnergyScreen );

export default EnergyScreen;