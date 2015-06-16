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
  var PropertySet = require( 'AXON/PropertySet' );
  var Range = require( 'DOT/Range' );

  /**
   * @constructor
   */
  function ExperimentalModel() {

    // ranges and default values for properties
    this.loopsRange = new Range( 4, 15, 10 );
    this.radiusRange = new Range( 5, 70, 30 );
    this.aspectRatioRange = new Range( 0.5, 4, 1.5 );
    this.pointsPerLoopRange = new Range( 10, 100, 30 );
    this.lineWidthRange = new Range( 1, 10, 3 );
    this.phaseRange = new Range( 0, 2 * Math.PI, 0 ); // radians
    this.deltaPhaseRange = new Range( 0, 2 * Math.PI, 1.5 ); // radians
    this.pitchSizeRange = new Range( 0.1, 2, 1.5 );

    PropertySet.call( this, {
      loops: this.loopsRange.defaultValue, // {number} number of loops in the spring
      radius: this.radiusRange.defaultValue, // {number} radius of a loop with aspect ratio of 1:1
      aspectRatio: this.aspectRatioRange.defaultValue, // {number} y:x aspect radio of the loop radius
      pointsPerLoop: this.pointsPerLoopRange.defaultValue, // {number} number of points used to approximate 1 loop
      lineWidth: this.lineWidthRange.defaultValue, // {number} lineWidth used to draw the coil
      phase: this.phaseRange.defaultValue, // {number} phase angle of where the loop starts, period is (0,2*PI) radians, counterclockwise
      deltaPhase: this.deltaPhaseRange.defaultValue, // {number} TODO what is this? units?
      //TODO better name for this?
      pitchSize: this.pitchSizeRange.defaultValue, // {number} multiplier for radius in the x dimensions, makes the spring appear to get longer
      frontAndBack: true // {boolean} false: render spring as one path, true: render front and back as separate paths
    } );
  }

  return inherit( PropertySet, ExperimentalModel );
} );
