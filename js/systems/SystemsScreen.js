// Copyright 2015-2020, University of Colorado Boulder

/**
 * The "Systems" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen from '../../../joist/js/Screen.js';
import merge from '../../../phet-core/js/merge.js';
import HookesLawConstants from '../common/HookesLawConstants.js';
import HookesLawIconFactory from '../common/view/HookesLawIconFactory.js';
import hookesLawStrings from '../hookesLawStrings.js';
import hookesLaw from '../hookesLaw.js';
import SystemsModel from './model/SystemsModel.js';
import SystemsScreenView from './view/SystemsScreenView.js';

// strings
const systemsString = hookesLawStrings.systems;

class SystemsScreen extends Screen {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    const options = merge( {}, HookesLawConstants.SCREEN_OPTIONS, {
      name: systemsString,
      homeScreenIcon: HookesLawIconFactory.createSystemsScreenIcon(),
      tandem: tandem
    } );

    super(
      () => new SystemsModel( tandem.createTandem( 'model' ) ),
      model => new SystemsScreenView( model, tandem.createTandem( 'view' ) ),
      options
    );
  }
}

hookesLaw.register( 'SystemsScreen', SystemsScreen );

export default SystemsScreen;