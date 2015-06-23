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
  var SPRING0_FRONT = new Color( 150, 150, 255 );
  var SPRING0_MIDDLE = new Color( 0, 0, 255 );
  var SPRING0_BACK = new Color( 0, 0, 200 );
  var SPRING1_FRONT = new Color( '#6D00FF' );
  var SPRING1_MIDDLE = new Color( '#6D00FF' );
  var SPRING1_BACK = new Color( '#6D00FF' );
  var SPRING2_FRONT= new Color( '#FFBF00' );
  var SPRING2_MIDDLE = new Color( '#FFBF00' );
  var SPRING2_BACK = new Color( '#FFBF00' );

  return {

    // UI components
    CONTROL_PANEL_FILL: new Color( 243, 243, 243 ),
    CONTROL_PANEL_STROKE: new Color( 125, 125, 125 ),
    SEPARATOR_STROKE: new Color( 125, 125, 125 ),

    // colors for single spring
    SINGLE_SPRING: SPRING0_MIDDLE,
    SINGLE_SPRING_FRONT: SPRING0_FRONT,
    SINGLE_SPRING_MIDDLE: SPRING0_MIDDLE,
    SINGLE_SPRING_BACK: SPRING0_BACK,

    // colors for series springs
    LEFT_SPRING: SPRING1_MIDDLE,
    LEFT_SPRING_FRONT: SPRING1_FRONT,
    LEFT_SPRING_MIDDLE: SPRING1_MIDDLE,
    LEFT_SPRING_BACK: SPRING1_BACK,
    RIGHT_SPRING: SPRING2_MIDDLE,
    RIGHT_SPRING_FRONT: SPRING2_FRONT,
    RIGHT_SPRING_MIDDLE: SPRING2_MIDDLE,
    RIGHT_SPRING_BACK: SPRING2_BACK,

    // colors for parallel springs
    TOP_SPRING: SPRING1_MIDDLE,
    TOP_SPRING_FRONT: SPRING1_FRONT,
    TOP_SPRING_MIDDLE: SPRING1_MIDDLE,
    TOP_SPRING_BACK: SPRING1_BACK,
    BOTTOM_SPRING: SPRING2_MIDDLE,
    BOTTOM_SPRING_FRONT: SPRING2_FRONT,
    BOTTOM_SPRING_MIDDLE: SPRING2_MIDDLE,
    BOTTOM_SPRING_BACK: SPRING2_BACK,

    // various quantities
    APPLIED_FORCE: PhetColorScheme.RED_COLORBLIND,
    DISPLACEMENT: new Color( 0, 180, 0 ),
    ENERGY: new Color( 3, 205, 255 ),
    EQUILIBRIUM_POSITION: new Color( 0, 180, 0 )
  };
} );
