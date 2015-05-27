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
    assert && assert( options.springConstantRange.min > 0, 'minimum spring constant must be positive : ' + options.springConstantRange.min );

    // save some options
    this.equilibriumLength = options.equilibriumLength; // read-only
    this.springConstantRange = options.springConstantRange; // read-only
    this.appliedForceRange = options.appliedForceRange; // read-only

    // x = F/k
    this.displacementRange = new Range( this.appliedForceRange.min / this.springConstantRange.min, this.appliedForceRange.max / this.springConstantRange.min );

    var thisSpring = this;

    // Properties -----------------------------------------------------------

    PropertySet.call( this, {
      appliedForce: options.appliedForceRange.defaultValue, // {number} F
      springConstant: options.springConstantRange.defaultValue,  // {number} k
      displacement: 0,  // {number} x
      left: options.left // {number} location of the left end of the spring, units = m
    } );

    // Property observers -----------------------------------------------------------

    // When changing the spring constant, maintain the applied force, change displacement.
    this.springConstantProperty.link( function( springConstant ) {
      assert && assert( thisSpring.springConstantRange.contains( springConstant ), 'springConstant is out of range: ' + springConstant );
      thisSpring.displacement = thisSpring.appliedForce / springConstant; // x = F/k
    } );

    // When changing the applied force, maintain the spring constant, change displacement.
    this.appliedForceProperty.link( function( appliedForce ) {
      assert && assert( thisSpring.appliedForceRange.contains( appliedForce ), 'appliedForce is out of range: ' + appliedForce );
      thisSpring.displacement = appliedForce / thisSpring.springConstant; // x = F/k
    } );

    // When changing displacement, maintain the spring constant, change applied force.
    this.displacementProperty.link( function( displacement ) {
      assert && assert( thisSpring.displacementRange.contains( displacement ), 'displacement is out of range: ' + displacement );
      var appliedForce = thisSpring.springConstant * displacement; // F = kx
      // constrain to delta
      appliedForce = Math.round( appliedForce / HookesLawConstants.APPLIED_FORCE_DELTA ) * HookesLawConstants.APPLIED_FORCE_DELTA;
      // constrain to range
      thisSpring.appliedForce = thisSpring.appliedForceRange.constrainValue( appliedForce );
    } );

    // Derived properties -----------------------------------------------------------

    // spring force opposes the applied force, units = N
    this.springForceProperty = new DerivedProperty( [ this.appliedForceProperty ], function( appliedForce ) {
      return -appliedForce;
    } );

    // equilibrium x location, units = m
    this.equilibriumXProperty = new DerivedProperty( [ this.leftProperty ], function( left ) {
      return left + thisSpring.equilibriumLength;
    } );

    // x location of the right end of the spring, units = m
    this.rightProperty = new DerivedProperty( [ this.equilibriumXProperty, this.displacementProperty ], function( equilibriumX, displacement ) {
      var left = thisSpring.leftProperty.get();
      var right = equilibriumX + displacement;
      assert && assert( right - left > 0, 'right must be > left, right=' + right + ', left=' + left );
      return right;
    } );

    // range of the right end of the spring, units = m
    this.rightRangeProperty = new DerivedProperty( [ this.springConstantProperty, this.equilibriumXProperty ], function( springConstant, equilibriumX ) {
      var minDisplacement = thisSpring.appliedForceRange.min / springConstant;
      var maxDisplacement = thisSpring.appliedForceRange.max / springConstant;
      return new Range( equilibriumX + minDisplacement, equilibriumX + maxDisplacement );
    } );

    // length of the spring, units = m
    this.lengthProperty = new DerivedProperty( [ this.leftProperty, this.rightProperty ], function( left, right ) {
      return Math.abs( right - left );
    } );
  }

  return inherit( PropertySet, Spring );
} );
