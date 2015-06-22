// Copyright 2002-2015, University of Colorado Boulder

/**
 * The "Introduction" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Image = require( 'SCENERY/nodes/Image' );
  var IntroductionModel = require( 'HOOKES_LAW/introduction/model/IntroductionModel' );
  var IntroductionView = require( 'HOOKES_LAW/introduction/view/IntroductionView' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var introductionString = require( 'string!HOOKES_LAW/introduction' );

  // images
  var introductionScreenImage = require( 'image!HOOKES_LAW/introduction-screen.png' );

  /**
   * @constructor
   */
  function IntroductionScreen() {
    Screen.call( this,
      introductionString,
      new Image( introductionScreenImage ),
      function() { return new IntroductionModel(); },
      function( model ) { return new IntroductionView( model ); },
      { backgroundColor: 'white' }
    );
  }

  return inherit( Screen, IntroductionScreen );
} );