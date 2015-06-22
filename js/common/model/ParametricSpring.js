// Copyright 2002-2015, University of Colorado Boulder

/**
 * Properties required by ParametricSpringNode.
 * The "Experimental" screen provides an extensive test harness for ParametricSpring and ParametricSpringNode.
 *
 * @author Martin Veillette (Berea College)
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Range = require( 'DOT/Range' );

  /**
   * @constructor
   */
  function ParametricSpring() {

    // ranges and default values for properties
    this.loopsRange = new Range( 4, 15, 10 );
    this.radiusRange = new Range( 5, 70, 10 );
    this.aspectRatioRange = new Range( 0.5, 10, 4 );
    this.pointsPerLoopRange = new Range( 10, 100, 30 );
    this.lineWidthRange = new Range( 1, 10, 3 );
    this.phaseRange = new Range( 0, 2 * Math.PI, Math.PI ); // radians
    this.deltaPhaseRange = new Range( 0, 2 * Math.PI, Math.PI / 2 ); // radians
    this.xScaleRange = new Range( 0.5, 11, 2.5 );

    PropertySet.call( this, {
      // {number} number of loops in the spring
      loops: this.loopsRange.defaultValue,
      // {number} radius of a loop with aspect ratio of 1:1
      radius: this.radiusRange.defaultValue,
      // {number} y:x aspect radio of the loop radius
      aspectRatio: this.aspectRatioRange.defaultValue,
      // {number} number of points used to approximate 1 loop
      pointsPerLoop: this.pointsPerLoopRange.defaultValue,
      // {number} lineWidth used to draw the coil
      lineWidth: this.lineWidthRange.defaultValue,
      // {number} phase angle of where the loop starts, period is (0,2*PI) radians, counterclockwise
      phase: this.phaseRange.defaultValue,
      // {number} responsible for the leaning of the spring, variation on a Lissjoue curve, period is (0,2*PI) radians
      deltaPhase: this.deltaPhaseRange.defaultValue,
      // {number} multiplier for radius in the x dimensions, makes the spring appear to get longer
      xScale: this.xScaleRange.defaultValue
    } );
  }

  return inherit( PropertySet, ParametricSpring );
} );
