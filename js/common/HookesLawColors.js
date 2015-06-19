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

  // constants
  var SPRING1 = new Color( '#6D00FF' );
  var SPRING2 = new Color( '#FFBF00' );

  return {

    // UI components
    CONTROL_PANEL_FILL: new Color( 243, 243, 243 ),
    CONTROL_PANEL_STROKE: new Color( 125, 125, 125 ),
    SEPARATOR_STROKE: new Color( 125, 125, 125 ),

    // springs
    SINGLE_SPRING: new Color( 11, 37, 251 ),
    LEFT_SPRING: SPRING1,
    RIGHT_SPRING: SPRING2,
    TOP_SPRING: SPRING1,
    BOTTOM_SPRING: SPRING2,

    // various quantities
    APPLIED_FORCE: PhetColorScheme.RED_COLORBLIND,
    DISPLACEMENT: new Color( 0, 180, 0 ),
    ENERGY: new Color( 3, 205, 255 ),
    EQUILIBRIUM_POSITION: new Color( 0, 180, 0 )
  };
} );
