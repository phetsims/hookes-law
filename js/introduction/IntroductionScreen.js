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
  var IntroductionModel = require( 'HOOKES_LAW/introduction/model/IntroductionModel' );
  var IntroductionView = require( 'HOOKES_LAW/introduction/view/IntroductionView' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var introductionString = require( 'string!HOOKES_LAW/introduction' );

  //TODO
  var createIcon = function() {
    return new Rectangle( 0, 0, 100, 100, { fill: 'red' } );
  };

  /**
   * @constructor
   */
  function IntroductionScreen() {

    // Scale up for the view
    var modelViewTransform = ModelViewTransform2.createOffsetScaleMapping( Vector2.ZERO, HookesLawConstants.UNIT_DISPLACEMENT_VECTOR_LENGTH );

    Screen.call( this,
      introductionString,
      createIcon(),
      function() { return new IntroductionModel(); },
      function( model ) { return new IntroductionView( model, modelViewTransform ); },
      { backgroundColor: 'white' }
    );
  }

  return inherit( Screen, IntroductionScreen );
} );