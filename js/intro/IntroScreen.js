// Copyright 2015, University of Colorado Boulder

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
  var IntroView = require( 'HOOKES_LAW/intro/view/IntroView' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var introString = require( 'string!HOOKES_LAW/intro' );

  /**
   * @constructor
   */
  function IntroScreen() {
    Screen.call( this,
      introString,
      HookesLawIconFactory.createIntroScreenIcon(),
      function() { return new IntroModel(); },
      function( model ) { return new IntroView( model ); },
      HookesLawConstants.SCREEN_OPTIONS
    );
  }

  hookesLaw.register( 'IntroScreen', IntroScreen );

  return inherit( Screen, IntroScreen );
} );