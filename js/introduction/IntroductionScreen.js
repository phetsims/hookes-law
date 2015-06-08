// Copyright 2002-2015, University of Colorado Boulder

/**
 * The "Introduction" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var IntroductionModel = require( 'HOOKES_LAW/introduction/model/IntroductionModel' );
  var IntroductionView = require( 'HOOKES_LAW/introduction/view/IntroductionView' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var introductionString = require( 'string!HOOKES_LAW/introduction' );

  //TODO design: what does the screen icon look like?
  var createIcon = function() {
    return new Rectangle( 0, 0, 100, 100, { fill: 'red' } );
  };

  /**
   * @constructor
   */
  function IntroductionScreen() {
    Screen.call( this,
      introductionString,
      createIcon(),
      function() { return new IntroductionModel(); },
      function( model ) { return new IntroductionView( model, HookesLawConstants.MODEL_VIEW_TRANSFORM ); },
      { backgroundColor: 'white' }
    );
  }

  return inherit( Screen, IntroductionScreen );
} );