// Copyright 2015-2025, University of Colorado Boulder

/**
 * The "Systems" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen from '../../../joist/js/Screen.js';
import Tandem from '../../../tandem/js/Tandem.js';
import HookesLawColors from '../common/HookesLawColors.js';
import HookesLawIconFactory from '../common/view/HookesLawIconFactory.js';
import hookesLaw from '../hookesLaw.js';
import HookesLawStrings from '../HookesLawStrings.js';
import SystemsModel from './model/SystemsModel.js';
import SystemsScreenView from './view/SystemsScreenView.js';
import HookesLawKeyboardHelpContent from '../common/view/HookesLawKeyboardHelpContent.js';

export default class SystemsScreen extends Screen<SystemsModel, SystemsScreenView> {

  public constructor( tandem: Tandem ) {

    const options = {
      name: HookesLawStrings.systemsStringProperty,
      backgroundColorProperty: HookesLawColors.screenBackgroundColorProperty,
      homeScreenIcon: HookesLawIconFactory.createSystemsScreenIcon(),
      createKeyboardHelpNode: () => new HookesLawKeyboardHelpContent(),
      tandem: tandem
    };

    super(
      () => new SystemsModel( tandem.createTandem( 'model' ) ),
      model => new SystemsScreenView( model, tandem.createTandem( 'view' ) ),
      options
    );
  }
}

hookesLaw.register( 'SystemsScreen', SystemsScreen );