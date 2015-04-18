// Copyright 2002-2015, University of Colorado Boulder

/**
 * Colors for this simulation.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Color = require( 'SCENERY/util/Color' );
  var PhetColorScheme = require( 'SCENERY_PHET/PhetColorScheme' );

  return {
    CONTROL_PANEL_FILL: new Color( 243, 243, 243 ),
    APPLIED_FORCE_VECTOR: PhetColorScheme.RED_COLORBLIND,
    SPRING_FORCE_VECTOR: new Color( 11, 37, 251 ),
    DISPLACEMENT_VECTOR: new Color( 0, 180, 0 ),
    EQUILIBRIUM_POSITION: new Color( 0, 180, 0 )
  };
} );
