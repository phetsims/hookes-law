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
    TOTAL_SPRING_FORCE_VECTOR: new Color( 11, 37, 251 ),
    LEFT_SPRING_FORCE_VECTOR: new Color( 253, 184, 47 ),
    RIGHT_SPRING_FORCE_VECTOR: new Color( 110, 110, 110 ),
    TOP_SPRING_FORCE_VECTOR: new Color( 253, 184, 47 ),
    BOTTOM_SPRING_FORCE_VECTOR: new Color( 110, 110, 110 ),
    DISPLACEMENT_VECTOR: new Color( 0, 180, 0 ),
    EQUILIBRIUM_POSITION: new Color( 0, 180, 0 )
  };
} );
