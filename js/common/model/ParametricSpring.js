// Copyright 2002-2015, University of Colorado Boulder

/**
 * View-specific PropertySet that determines the look of ParametricSpringNode.
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

  /**
   * @param {Object} [object]
   * @constructor
   */
  function ParametricSpring( options ) {

    options = _.extend( {
      // {number} number of loops in the spring
      loops: 10,
      // {number} radius of a loop with aspect ratio of 1:1
      radius: 10,
      // {number} y:x aspect radio of the loop radius
      aspectRatio: 4,
      // {number} number of points used to approximate 1 loop
      pointsPerLoop: 30,
      // {number} lineWidth used to draw the coil
      lineWidth: 3,
      // {number} phase angle of where the loop starts, period is (0,2*PI) radians, counterclockwise
      phase: Math.PI,
      // {number} responsible for the leaning of the spring, variation on a Lissjoue curve, period is (0,2*PI) radians
      deltaPhase: Math.PI / 2,
      // {number} multiplier for radius in the x dimensions, makes the spring appear to get longer
      xScale: 2.5
    }, options );

    PropertySet.call( this, {
      loops: options.loops,
      radius: options.radius,
      aspectRatio: options.aspectRatio,
      pointsPerLoop: options.pointsPerLoop,
      lineWidth: options.lineWidth,
      phase: options.phase,
      deltaPhase: options.deltaPhase,
      xScale: options.xScale
    }, options );
  }

  return inherit( PropertySet, ParametricSpring );
} );
