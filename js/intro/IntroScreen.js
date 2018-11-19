// Copyright 2015-2018, University of Colorado Boulder

/**
 * The "Intro" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var HookesLawIconFactory = require( 'HOOKES_LAW/common/view/HookesLawIconFactory' );
  var inherit = require( 'PHET_CORE/inherit' );
  var IntroModel = require( 'HOOKES_LAW/intro/model/IntroModel' );
  var IntroScreenView = require( 'HOOKES_LAW/intro/view/IntroScreenView' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var introString = require( 'string!HOOKES_LAW/intro' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function IntroScreen( tandem ) {

    var options = _.extend( {}, HookesLawConstants.SCREEN_OPTIONS, {
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