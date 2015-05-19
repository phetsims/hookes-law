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

  //TODO delete this
  var debug = function( message ) {
    console.log( message );
  };

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Spring( options ) {

    options = _.extend( {
      debugName: 'spring', // {string} used for debugging, to know which spring we're inspecting
      left: 0, // {number} x location of the left end of the spring, units = m
      equilibriumLength: 1.5, // {number} length of the spring at equilibrium, units = m
      springConstantRange: new Range( 100, 1000, 200 ), // {Range} spring constant range and initial value, units = N/m
      appliedForceRange: new Range( -100, 100, 0 ) // {Range} applied force range and initial value, units = N
    }, options );

    // validate options
    assert && assert( options.debugName, 'debugName is required for debugging' );
    assert && assert( options.equilibriumLength > 0, options.debugName + ': equilibriumLength must be > 0 : ' + options.equilibriumLength );
    assert && assert( options.springConstantRange.min > 0, options.debugName + ': spring constant must be positive' );

    // save some options
    this.debugName = options.debugName; // read-only
    this.equilibriumLength = options.equilibriumLength; // read-only
    this.springConstantRange = options.springConstantRange; // read-only
    this.appliedForceRange = options.appliedForceRange; // read-only

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
      debug( thisSpring.debugName + ': observer, springConstant= ' + springConstant );//XXX
      assert && assert( thisSpring.springConstantRange.contains( springConstant ), options.debugName + ': springConstant is out of range: ' + springConstant );
      thisSpring.displacement = thisSpring.appliedForce / springConstant; // x = F/k
    } );

    // When changing the applied force, maintain the spring constant, change displacement.
    this.appliedForceProperty.link( function( appliedForce ) {
      debug( thisSpring.debugName + ': observer, appliedForce=' + appliedForce );//XXX
      assert && assert( thisSpring.appliedForceRange.contains( appliedForce ), options.debugName + ': appliedForce is out of range: ' + appliedForce );
      thisSpring.displacement = appliedForce / thisSpring.springConstant; // x = F/k
    } );

    // When changing displacement, maintain the spring constant, change applied force.
    var displacementRange = new Range( this.appliedForceRange.min / this.springConstantRange.min, this.appliedForceRange.max / this.springConstantRange.min );
    this.displacementProperty.link( function( displacement ) {
      debug( thisSpring.debugName + ': observer, displacement=' + displacement );//XXX
      assert && assert( displacementRange.contains( displacement ), options.debugName + ': displacement is out of range: ' + displacement );
      var appliedForce = thisSpring.springConstant * displacement; // F = kx
      // constrain to delta
      appliedForce = Math.round( appliedForce / HookesLawConstants.APPLIED_FORCE_DELTA ) * HookesLawConstants.APPLIED_FORCE_DELTA;
      // constrain to range
      thisSpring.appliedForce = thisSpring.appliedForceRange.constrainValue( appliedForce );
    } );

    // Derived properties -----------------------------------------------------------

    // spring force opposes the applied force, units = N
    this.springForceProperty = new DerivedProperty( [ this.appliedForceProperty ], function( appliedForce ) {
      debug( thisSpring.debugName + ': derive springForceProperty, appliedForce=' + appliedForce );//XXX
      return -appliedForce;
    } );

    // equilibrium x location, units = m
    this.equilibriumXProperty = new DerivedProperty( [ this.leftProperty ], function( left ) {
      return left + thisSpring.equilibriumLength;
    } );

    // x location of the right end of the spring, units = m
    this.rightProperty = new DerivedProperty( [ this.equilibriumXProperty, this.displacementProperty ], function( equilibriumX, displacement ) {
      debug( thisSpring.debugName + ': derive rightProperty, equilibriumX=' + equilibriumX + ', displacement=' + displacement );//XXX
      var left = thisSpring.leftProperty.get();
      var right = equilibriumX + displacement;
      assert && assert( right - left > 0, options.debugName + ': right must be > left, right=' + right + ', left=' + left );
      return right;
    } );

    // range of the right end of the spring, units = m
    this.rightRangeProperty = new DerivedProperty( [ this.springConstantProperty, thisSpring.equilibriumXProperty ], function( springConstant, equilibriumX ) {
      debug( thisSpring.debugName + ': derive rightRangeProperty, springConstant=' + springConstant + ', equilibriumX=' + equilibriumX );//XXX
      var minDisplacement = thisSpring.appliedForceRange.min / springConstant;
      var maxDisplacement = thisSpring.appliedForceRange.max / springConstant;
      return new Range( equilibriumX + minDisplacement, equilibriumX + maxDisplacement );
    } );

    // length of the spring, units = m
    this.lengthProperty = new DerivedProperty( [ this.leftProperty, this.rightProperty ], function( left, right ) {
      debug( thisSpring.debugName + ': derive lengthProperty, left=' + left + ', right=' + right );//XXX
      return Math.abs( right - left );
    } );
  }

  return inherit( PropertySet, Spring );
} );
