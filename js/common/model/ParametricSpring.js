// Copyright 2002-2015, University of Colorado Boulder

/**
 * A specialization of Spring that adds additional properties required by ParametricSpringNode.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Range = require( 'DOT/Range' );
  var Spring = require( 'HOOKES_LAW/common/model/spring' );

  /**
   * @constructor
   * @param {Object} [options]
   */
  function ParametricSpring( options ) {

    // ranges and default values for properties
    this.loopsRange = new Range( 4, 15, 10 );
    this.radiusRange = new Range( 5, 70, 10 );
    this.aspectRatioRange = new Range( 0.5, 10, 4 );
    this.pointsPerLoopRange = new Range( 10, 100, 30 );
    this.lineWidthRange = new Range( 1, 10, 3 );
    this.phaseRange = new Range( 0, 2 * Math.PI, Math.PI ); // radians
    this.deltaPhaseRange = new Range( 0, 2 * Math.PI, Math.PI / 2 ); // radians
    this.xScaleRange = new Range( 0.5, 11, 2.5 );

    options = _.extend( {
      // hash of keys and initial values, as required by PropertySet
      additionalProperties: {
        loops: this.loopsRange.defaultValue, // {number} number of loops in the spring
        radius: this.radiusRange.defaultValue, // {number} radius of a loop with aspect ratio of 1:1
        aspectRatio: this.aspectRatioRange.defaultValue, // {number} y:x aspect radio of the loop radius
        pointsPerLoop: this.pointsPerLoopRange.defaultValue, // {number} number of points used to approximate 1 loop
        lineWidth: this.lineWidthRange.defaultValue, // {number} lineWidth used to draw the coil
        phase: this.phaseRange.defaultValue, // {number} phase angle of where the loop starts, period is (0,2*PI) radians, counterclockwise
        deltaPhase: this.deltaPhaseRange.defaultValue, // {number} period is (0,2*PI) radians, TODO what is this?
        xScale: this.xScaleRange.defaultValue, // {number} multiplier for radius in the x dimensions, makes the spring appear to get longer
        frontAndBack: true // {boolean} false: render spring as one path, true: render front and back as separate paths
      }
    }, options );

    Spring.call( this, options );
  }

  return inherit( PropertySet, ParametricSpring );
} );
