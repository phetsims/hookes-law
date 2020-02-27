// Copyright 2015-2019, University of Colorado Boulder

/**
 * The "Systems" screen.
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
import SystemsModel from './model/SystemsModel.js';
import SystemsScreenView from './view/SystemsScreenView.js';

const systemsString = hookesLawStrings.systems;

/**
 * @param {Tandem} tandem
 * @constructor
 */
function SystemsScreen( tandem ) {

  const options = merge( {}, HookesLawConstants.SCREEN_OPTIONS, {
    name: systemsString,
    homeScreenIcon: HookesLawIconFactory.createSystemsScreenIcon(),
    tandem: tandem
  } );

  Screen.call( this,
    function() { return new SystemsModel( tandem.createTandem( 'model' ) ); },
    function( model ) { return new SystemsScreenView( model, tandem.createTandem( 'view' ) ); },
    options
  );
}

hookesLaw.register( 'SystemsScreen', SystemsScreen );

inherit( Screen, SystemsScreen );
export default SystemsScreen;