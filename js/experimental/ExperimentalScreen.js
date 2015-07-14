// Copyright 2002-2015, University of Colorado Boulder

/**
 * The "Experimental" screen.
 * Provides an extensive test harness for ParametricSpring and ParametricSpringNode,
 * and is added to the sim when running with 'exp' query parameter.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ExperimentalModel = require( 'HOOKES_LAW/experimental/model/ExperimentalModel' );
  var ExperimentalView = require( 'HOOKES_LAW/experimental/view/ExperimentalView' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Screen = require( 'JOIST/Screen' );

  // strings - no need for i18n since this is a developer-only screen
  var experimentalString = 'Experimental';

  /**
   * @constructor
   */
  function ExperimentalScreen() {
    Screen.call( this,
      experimentalString,
      new Rectangle( 0, 0, Screen.HOME_SCREEN_ICON_SIZE.width, Screen.HOME_SCREEN_ICON_SIZE.height, { fill: 'orange' } ),
      function() { return new ExperimentalModel(); },
      function( model ) { return new ExperimentalView( model ); },
      HookesLawConstants.SCREEN_OPTIONS
    );
  }

  return inherit( Screen, ExperimentalScreen );
} );
