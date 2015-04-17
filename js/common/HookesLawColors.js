// Copyright 2002-2015, University of Colorado Boulder

/**
 * Colors for this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );

  return {
    CONTROL_PANEL_FILL: 'rgb( 248, 248, 248 )',
    APPLIED_FORCE_VECTOR: PhetColorScheme.RED_COLORBLIND,
    SPRING_FORCE_VECTOR: 'rgb( 11, 37, 251 )',
    DISPLACEMENT_VECTOR: 'rgb( 0, 180, 0 )',
    EQUILIBRIUM_POSITION: 'rgb( 0, 180, 0 )'
  };
} );
