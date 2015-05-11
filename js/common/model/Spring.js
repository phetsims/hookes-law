// Copyright 2002-2015, University of Colorado Boulder

/**
 * Model of a spring.
 * The left end is attached to something like a wall or another spring.
 * A force is applied to the right end, by something like a robotic arm or another spring.
 *
 * F = kx, where:
 *
 * F = applied force, N/m
 * k = spring constant, N/m
 * x = displacement from equilibrium position, m
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
      left: 0, // {number} x location of the left end of the spring, units = m
      equilibriumLength: 1.5, // {number} length of the spring at equilibrium, units = m
      springConstant: 200, // {number} initial spring constant, units = N/m
      springConstantRange: new Range( 100, 1000 ), // units = N/m
      appliedForceRange: new Range( -100, 100 ) // units = N
    }, options );

    // validate options
    assert && assert( options.equilibriumLength > 0, 'equilibriumLength must be > 0 : ' + options.equilibriumLength );
    assert && assert( options.springConstantRange.contains( options.springConstant ), 'springConstant out of range: ' + options.springConstant );

    // save some options
    this.equilibriumLength = options.equilibriumLength; // read-only
    this.springConstantRange = options.springConstantRange; // read-only
    this.appliedForceRange = options.appliedForceRange; // read-only

    var thisSpring = this;

    // For internal validation, x = F/k
    var displacementRange = new Range( this.appliedForceRange.min / this.springConstantRange.min, this.appliedForceRange.max / this.springConstantRange.min );

    PropertySet.call( this, {
      left: options.left, // {number} x location of the left end of the spring, units = m
      displacement: 0,  // {number} x, horizontal displacement from equilibrium position, units = m
      springConstant: options.springConstant,  // {number} k, spring constant, units = N/m
      appliedForce: 0 // {number} F, force applied to the spring, units = N
    } );

    // equilibrium x location, units = m
    this.equilibriumXProperty = new DerivedProperty( [ this.leftProperty ], function( left ) {
       return left + thisSpring.equilibriumLength;
    } );

    // x location of the right end of the spring
    this.rightProperty = new DerivedProperty( [this.equilibriumXProperty, this.displacementProperty ], function( equilibriumX, displacement ) {
      var left = thisSpring.leftProperty.get();
      var right = equilibriumX + displacement;
      assert && assert( right - left > 0, 'right must be > left, right=' + right + ', left=' + left );
      return right;
    } );

    // length of the spring, units = m
    this.lengthProperty = new DerivedProperty( [ this.leftProperty, this.rightProperty ], function( left, right ) {
      return Math.abs( right - left );
    } );

    // spring force opposes the applied force, units = N
    this.springForceProperty = new DerivedProperty( [ this.appliedForceProperty ], function( appliedForce ) {
      return -appliedForce;
    } );

    this.springConstantProperty.link( function( springConstant ) {
      assert && assert( thisSpring.springConstantRange.contains( springConstant ), 'springConstant out of range: ' + springConstant );
      thisSpring.displacement = thisSpring.appliedForce / springConstant; // x = F/k
    } );

    this.appliedForceProperty.link( function( appliedForce ) {
      assert && assert( thisSpring.appliedForceRange.contains( appliedForce ), 'appliedForce out of range: ' + appliedForce );
      thisSpring.displacement = appliedForce / thisSpring.springConstant; // x = F/k
    } );

    this.displacementProperty.link( function( displacement ) {
      assert && assert( displacementRange.contains( displacement ), 'displacement out of range: ' + displacement );
      thisSpring.appliedForce = thisSpring.springConstant * displacement; // F = kx
    } );

    // displacement range varies with spring constant, units = m
    this.displacementRangeProperty = new DerivedProperty( [ this.springConstantProperty ], function( springConstant ) {
      assert && assert( springConstant > 0, 'springConstant must be > 0 : ' + springConstant );
      return new Range( thisSpring.appliedForceRange.min / springConstant, thisSpring.appliedForceRange.max / springConstant );
    } );
  }

  return inherit( PropertySet, Spring );
} );
