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
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
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
      springConstantRange: new Range( 100, 1000, 200 ), // {Range} spring constant range and initial value, units = N/m
      appliedForceRange: new Range( -100, 100, 0 ) // {Range} applied force range and initial value, units = N
    }, options );

    // validate options
    assert && assert( options.equilibriumLength > 0, 'equilibriumLength must be > 0 : ' + options.equilibriumLength );
    assert && assert( options.springConstantRange.min > 0, 'spring constant must be positive' );

    // save some options
    this.equilibriumLength = options.equilibriumLength; // read-only
    this.springConstantRange = options.springConstantRange; // read-only
    this.appliedForceRange = options.appliedForceRange; // read-only

    var thisSpring = this;

    // For internal validation, x = F/k
    var displacementRange = new Range( this.appliedForceRange.min / this.springConstantRange.min, this.appliedForceRange.max / this.springConstantRange.min );

    PropertySet.call( this, {
      appliedForce: options.appliedForceRange.defaultValue, // {number} F
      springConstant: options.springConstantRange.defaultValue,  // {number} k
      displacement: 0,  // {number} x
      left: options.left // {number} location of the left end of the spring, units = m
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

    // When changing the spring constant, maintain the applied force, change displacement.
    this.springConstantProperty.link( function( springConstant ) {
      assert && assert( thisSpring.springConstantRange.contains( springConstant ), 'springConstant out of range: ' + springConstant );
      thisSpring.displacement = thisSpring.appliedForce / springConstant; // x = F/k
    } );

    // When changing the applied force, maintain the spring constant, change displacement.
    this.appliedForceProperty.link( function( appliedForce ) {
      assert && assert( thisSpring.appliedForceRange.contains( appliedForce ), 'appliedForce out of range: ' + appliedForce );
      thisSpring.displacement = appliedForce / thisSpring.springConstant; // x = F/k
    } );

    // When changing displacement, maintain the spring constant, change applied force.
    this.displacementProperty.link( function( displacement ) {
      assert && assert( displacementRange.contains( displacement ), 'displacement out of range: ' + displacement );
      var appliedForce = thisSpring.springConstant * displacement; // F = kx
      // constrain to delta
      appliedForce = Math.round( appliedForce / HookesLawConstants.APPLIED_FORCE_DELTA ) * HookesLawConstants.APPLIED_FORCE_DELTA;
      // constrain to range
      thisSpring.appliedForce = thisSpring.appliedForceRange.constrainValue( appliedForce );
    } );

    // range of the right end of the spring, units = m
    this.rightRangeProperty = new DerivedProperty( [ this.springConstantProperty, thisSpring.equilibriumXProperty ], function( springConstant, equilibriumX ) {
      assert && assert( springConstant > 0, 'springConstant must be > 0 : ' + springConstant );
      var minDisplacement = thisSpring.appliedForceRange.min / springConstant;
      var maxDisplacement = thisSpring.appliedForceRange.max / springConstant;
      return new Range( equilibriumX + minDisplacement, equilibriumX + maxDisplacement );
    } );
  }

  return inherit( PropertySet, Spring );
} );
