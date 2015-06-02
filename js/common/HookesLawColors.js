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
    APPLIED_FORCE: PhetColorScheme.RED_COLORBLIND,
    TOTAL_SPRING_FORCE: new Color( 11, 37, 251 ),
    LEFT_SPRING_FORCE: new Color( 110, 110, 110 ),
    RIGHT_SPRING_FORCE: new Color( 253, 184, 47 ),
    TOP_SPRING_FORCE: 'magenta', //TODO get color from designer
    BOTTOM_SPRING_FORCE: 'aqua', //TODO get color from designer
    DISPLACEMENT: new Color( 0, 180, 0 ),
    EQUILIBRIUM_POSITION: new Color( 0, 180, 0 ),
    ENERGY: new Color( 3, 205, 255 )
  };
} );
