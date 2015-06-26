// Copyright 2002-2015, University of Colorado Boulder

/**
 * Query parameters used in sim-specific code.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );

  var getQueryParameter = phet.chipper.getQueryParameter;

  return {

    // enables developer-only features
    DEV: getQueryParameter( 'dev' ) || false,

    // adds the "Experimental" screen, for playing with ParametricSpringNode
    EXP: getQueryParameter( 'exp' ) || false,

    // Colors for ParametricSpringNode in the "Experimental" screen.
    // The '#' for hex colors needs to be URL encoded as '%23', eg '#CC66FF' -> '%23CC66FF'
    FRONT_COLOR: getQueryParameter( 'frontColor' ) || HookesLawColors.SINGLE_SPRING_FRONT,
    MIDDLE_COLOR: getQueryParameter( 'middleColor' ) || HookesLawColors.SINGLE_SPRING_MIDDLE,
    BACK_COLOR: getQueryParameter( 'backColor' ) || HookesLawColors.SINGLE_SPRING_BACK,

    // Colors for scene-selection buttons
    SCENE_SELECTION_COLOR: getQueryParameter( 'sceneSelectionColor' ) || HookesLawColors.SCENE_SELECTION_BUTTONS
  };
} );
