// Copyright 2015-2020, University of Colorado Boulder

/**
 * The "Intro" screen.
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
import IntroModel from './model/IntroModel.js';
import IntroScreenView from './view/IntroScreenView.js';

const introString = hookesLawStrings.intro;

/**
 * @param {Tandem} tandem
 * @constructor
 */
function IntroScreen( tandem ) {

  const options = merge( {}, HookesLawConstants.SCREEN_OPTIONS, {
    name: introString,
    homeScreenIcon: HookesLawIconFactory.createIntroScreenIcon(),
    tandem: tandem
  } );

  Screen.call( this,
    function() { return new IntroModel( tandem.createTandem( 'model' ) ); },
    function( model ) { return new IntroScreenView( model, tandem.createTandem( 'view' ) ); },
    options
  );
}

hookesLaw.register( 'IntroScreen', IntroScreen );

inherit( Screen, IntroScreen );
export default IntroScreen;