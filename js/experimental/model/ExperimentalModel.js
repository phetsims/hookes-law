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

  function ExperimentalModel() {

    // ranges and default values for properties
    this.radiusRange = new Range( 20, 70, 50 );
    this.aspectRatioRange = new Range( 0.5, 3, 1 );
    this.pointsPerLoopRange = new Range( 10, 100, 50 );
    this.lineWidthRange = new Range( 1, 10, 3 );
    this.phaseRange = new Range( 0, 5, 0 );
    this.deltaPhaseRange = new Range( 0, 7, 1 );
    this.pitchSizeRange = new Range( 0.1, 2, 1 );

    PropertySet.call( this, {
      radius: this.radiusRange.defaultValue, // {number} radius of a loop with aspect ratio of 1:1
      aspectRatio: this.aspectRatioRange.defaultValue, // {number} y:x aspect radio of the loop radius
      pointsPerLoop: this.pointsPerLoopRange.defaultValue, // {number} number of points used to approximate 1 loop
      lineWidth: this.lineWidthRange.defaultValue, // {number} lineWidth used to draw the coil
      phase: this.phaseRange.defaultValue, // {number} TODO what is this? units?
      deltaPhase: this.deltaPhaseRange.defaultValue, // {number} TODO what is this? units?
      pitchSize: this.pitchSizeRange.defaultValue, // {number} TODO what is this? units?
      frontAndBack: false // {boolean} whether to render front and back for spring as separate paths
    } );
  }

  return inherit( PropertySet, ExperimentalModel );
} );
