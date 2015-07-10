// Copyright 2002-2015, University of Colorado Boulder

/**
 * Model for the "Experimental" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Range = require( 'DOT/Range' );

  /**
   * @constructor
   */
  function ExperimentalModel() {
    // @public ranges and default values for ParametricSpringNode options
    this.loopsRange = new Range( 4, 15, 10 );
    this.radiusRange = new Range( 5, 70, 10 );
    this.aspectRatioRange = new Range( 0.5, 10, 4 );
    this.pointsPerLoopRange = new Range( 10, 100, 30 );
    this.lineWidthRange = new Range( 1, 10, 3 );
    this.phaseRange = new Range( 0, 2 * Math.PI, Math.PI ); // radians
    this.deltaPhaseRange = new Range( 0, 2 * Math.PI, Math.PI / 2 ); // radians
    this.xScaleRange = new Range( 0.5, 11, 2.5 );
  }

  return inherit( Object, ExperimentalModel );
} );
