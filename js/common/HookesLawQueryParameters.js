// Copyright 2002-2015, University of Colorado Boulder

/**
 * Query parameters used in sim-specific code.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  var getQueryParameter = phet.chipper.getQueryParameter;

  return {

    // enables developer-only features
    DEV: getQueryParameter( 'dev' ) || false,

    // adds the "Experimental" screen
    EXP: getQueryParameter( 'exp' ) || false,

    // Colors for ParametricSpringNode in the "Experimental" screen.
    // The '#' for hex colors needs to be URL encoded as '%23', eg '#CC66FF' -> '%23CC66FF'
    FRONT_COLOR: getQueryParameter( 'frontColor' ) || 'rgb( 150, 150, 255 )',
    MIDDLE_COLOR: getQueryParameter( 'middleColor' ) || 'rgb( 0, 0, 255 )',
    BACK_COLOR: getQueryParameter( 'backColor' ) || 'rgb( 0, 0, 200 )'
  };
} );
