// Copyright 2015-2024, University of Colorado Boulder

/**
 * The "Energy" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen from '../../../joist/js/Screen.js';
import Tandem from '../../../tandem/js/Tandem.js';
import HookesLawColors from '../common/HookesLawColors.js';
import HookesLawIconFactory from '../common/view/HookesLawIconFactory.js';
import hookesLaw from '../hookesLaw.js';
import HookesLawStrings from '../HookesLawStrings.js';
import EnergyModel from './model/EnergyModel.js';
import EnergyScreenView from './view/EnergyScreenView.js';

export default class EnergyScreen extends Screen<EnergyModel, EnergyScreenView> {

  public constructor( tandem: Tandem ) {

    const options = {
      name: HookesLawStrings.energyStringProperty,
      backgroundColorProperty: HookesLawColors.screenBackgroundColorProperty,
      homeScreenIcon: HookesLawIconFactory.createEnergyScreenIcon(),
      tandem: tandem
    };

    super(
      () => new EnergyModel( tandem.createTandem( 'model' ) ),
      model => new EnergyScreenView( model, tandem.createTandem( 'view' ) ),
      options
    );
  }
}

hookesLaw.register( 'EnergyScreen', EnergyScreen );