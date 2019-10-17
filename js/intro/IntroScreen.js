// Copyright 2015-2019, University of Colorado Boulder

/**
 * The "Intro" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  const HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  const HookesLawIconFactory = require( 'HOOKES_LAW/common/view/HookesLawIconFactory' );
  const inherit = require( 'PHET_CORE/inherit' );
  const IntroModel = require( 'HOOKES_LAW/intro/model/IntroModel' );
  const IntroScreenView = require( 'HOOKES_LAW/intro/view/IntroScreenView' );
  const merge = require( 'PHET_CORE/merge' );
  const Screen = require( 'JOIST/Screen' );

  // strings
  const introString = require( 'string!HOOKES_LAW/intro' );

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

  return inherit( Screen, IntroScreen );
} );