// Copyright 2015-2023, University of Colorado Boulder

/**
 * The "Intro" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen from '../../../joist/js/Screen.js';
import HookesLawIconFactory from '../common/view/HookesLawIconFactory.js';
import hookesLaw from '../hookesLaw.js';
import HookesLawStrings from '../HookesLawStrings.js';
import IntroModel from './model/IntroModel.js';
import IntroScreenView from './view/IntroScreenView.js';
import HookesLawColors from '../common/HookesLawColors.js';
import Tandem from '../../../tandem/js/Tandem.js';

export default class IntroScreen extends Screen<IntroModel, IntroScreenView> {

  public constructor( tandem: Tandem ) {

    const options = {
      name: HookesLawStrings.introStringProperty,
      backgroundColorProperty: HookesLawColors.SCREEN_VIEW_BACKGROUND,
      homeScreenIcon: HookesLawIconFactory.createIntroScreenIcon(),
      tandem: tandem
    };

    super(
      () => new IntroModel( tandem.createTandem( 'model' ) ),
      model => new IntroScreenView( model, tandem.createTandem( 'view' ) ),
      options
    );
  }
}

hookesLaw.register( 'IntroScreen', IntroScreen );