// Copyright 2002-2015, University of Colorado Boulder

/**
 * The "Experimental" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ExperimentalModel = require( 'HOOKES_LAW/experimental/ExperimentalModel' );
  var ExperimentalView = require( 'HOOKES_LAW/experimental/ExperimentalView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );

  var createIcon = function() {
    return new Rectangle( 0, 0, 100, 100, { fill: 'orange' } );
  };

  /**
   * @constructor
   */
  function IntroductionScreen() {
    Screen.call( this,
      'Experimental',
      createIcon(),
      function() { return new ExperimentalModel(); },
      function( model ) { return new ExperimentalView( model ); },
      { backgroundColor: 'white' }
    );
  }

  return inherit( Screen, IntroductionScreen );
} );
