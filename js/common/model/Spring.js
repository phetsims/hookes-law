// Copyright 2002-2015, University of Colorado Boulder

/**
 * Model of a spring.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Range = require( 'DOT/Range' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Spring( options ) {

    options = _.extend( {
      springConstant: 500,
      springConstantRange: new Range( 100, 1000 ), // N/m
      appliedForceRange: new Range( -100, 100 ) // N
    }, options );
    assert && assert( options.springConstantRange.contains( options.springConstant ) );

    var thisSpring = this;

    this.springConstantRange = options.springConstantRange; // read-only
    this.appliedForceRange = options.appliedForceRange; // read-only

    PropertySet.call( this, {
      springConstant: options.springConstant,  // {number} k, spring constant, units = N/m
      appliedForce: 0, // {number} F, force applied to the spring, units = N
      displacement: 0  // {number} x, horizontal displacement from equilibrium position, units = m
    } );

    // {number} horizontal location of equilibrium, units = m, read-only
    this.equilibriumX = 1.2 * ( this.appliedForceRange.max / this.springConstantRange.min ); // largest F/k

    // length of the spring, units = m
    this.lengthProperty = new DerivedProperty( [ this.displacementProperty ], function( displacement ) {
      return thisSpring.equilibriumX + displacement;
    } );

    // spring force opposes the applied force, units = N
    this.springForceProperty = new DerivedProperty( [ this.appliedForceProperty ], function( appliedForce ) {
      return -appliedForce;
    } );

    this.springConstantProperty.link( function( springConstant ) {
      thisSpring.displacement = thisSpring.appliedForce / springConstant; // x = F/k
    } );

    this.appliedForceProperty.link( function( appliedForce ) {
      thisSpring.displacement = appliedForce / thisSpring.springConstant; // x = F/k
    } );

    this.displacementProperty.link( function( displacement ) {
      thisSpring.appliedForce = thisSpring.springConstant * displacement; // F = kx
    } );
  }

  return inherit( PropertySet, Spring, {

    // Gets the maximum displacement, x = F/k
    getMaxDisplacement: function() {
      return this.appliedForceRange.max / this.springConstantProperty.get();
    },

    // Gets the minimum displacement, x = F/k
    getMinDisplacement: function() {
      return this.appliedForceRange.min / this.springConstantProperty.get();
    }
  } );
} );
