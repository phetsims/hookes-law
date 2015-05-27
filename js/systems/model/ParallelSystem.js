// Copyright 2002-2015, University of Colorado Boulder

/**
 * Model of 2 springs in parallel.
 *
 * Feq = F1 + F2
 * keq = k1 + k2
 * xeq = x1 = x2
 * Eeq = E1 + E2 = ( ( k1 * x1 * x1 ) / 2 ) + ( ( k2 * x2 * x2 ) / 2 )
 *
 * where:
 *
 * F = applied force, N/m
 * k = spring constant, N/m
 * x = displacement from equilibrium position, m
 * E = stored energy, J
 * subscript "eq" is an equivalent value for the system
 * subscript "1" is for the left spring
 * subscript "2" is for the right spring
 *
 * In the equations above, subscript "1" applies to the top spring, "2" applied to the bottom spring.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Range = require( 'DOT/Range' );
  var RoboticArm = require( 'HOOKES_LAW/common/model/RoboticArm' );
  var Spring = require( 'HOOKES_LAW/common/model/Spring' );

  /**
   * @constructor
   */
  function ParallelSystem() {

    var thisSystem = this;

    // Components of the system ----------------------------------------------------------------------------------------------------------------------

    this.topSpring = new Spring( {
      left: 0, // x location of the left end of the spring, units = m
      equilibriumLength: 1.5, // length of the spring at equilibrium, units = m
      springConstantRange: new Range( 200, 600, 200 ), // range and initial value of k1, units = N/m
      appliedForceRange: new Range( -50, 50, 0 ) // range and initial value of F1, units = N
    } );

    // bottom spring, in parallel with top spring, with identical configuration
    this.bottomSpring = new Spring( {
      left: this.topSpring.leftProperty.get(),
      equilibriumLength: this.topSpring.equilibriumLength,
      springConstantRange: this.topSpring.springConstantRange,
      appliedForceRange: this.topSpring.appliedForceRange
    } );

    // verify that springs are indeed parallel
    assert && assert( this.topSpring.leftProperty.get() === this.bottomSpring.leftProperty.get(), 'top and bottom springs must have same left' );
    assert && assert( this.topSpring.rightProperty.get() === this.bottomSpring.rightProperty.get(), 'top and bottom springs must have same right' );
    assert && assert( this.topSpring.equilibriumXProperty.get() === this.bottomSpring.equilibriumXProperty.get(),
      'top and bottom springs must have same equilibrium position' )

    // the single spring that is equivalent to the 2 springs in series
    this.equivalentSpring = new Spring( {
      left: this.topSpring.leftProperty.get(),
      equilibriumLength: this.topSpring.equilibriumLength,
      // keq = k1 + k2
      springConstantRange: new Range(
        this.topSpring.springConstantRange.min + this.bottomSpring.springConstantRange.min,
        this.topSpring.springConstantRange.max + this.bottomSpring.springConstantRange.max ),
      // Feq = F1 + F2
      appliedForceRange: new Range(
        this.topSpring.appliedForceRange.min + this.topSpring.appliedForceRange.min,
        this.topSpring.appliedForceRange.max + this.topSpring.appliedForceRange.max )
    } );

    // arm, connected to the right end of the equivalent spring
    this.roboticArm = new RoboticArm( {
      left: this.equivalentSpring.rightProperty.get(),
      right: 3
    } );

    // Property observers ----------------------------------------------------------------------------------------------------------------------------

    // xeq = Feq / keq
    this.equivalentSpring.appliedForceProperty.link( function( appliedForce ) {
      thisSystem.equivalentSpring.displacementProperty.set( appliedForce / thisSystem.equivalentSpring.springConstantProperty.get() );
    } );

    // xeq = x1 = x2
    this.equivalentSpring.displacementProperty.link( function( displacement ) {
      thisSystem.topSpring.displacementProperty.set( displacement );
      thisSystem.bottomSpring.displacementProperty.set( displacement );
    } );

    // keq = k1 + k2
    var updateEquivalentSpringConstant = function() {
      return thisSystem.topSpring.springConstantProperty.get() + thisSystem.bottomSpring.springConstantProperty.get();
    };
    this.topSpring.springConstantProperty.link( updateEquivalentSpringConstant );
    this.bottomSpring.springConstantProperty.link( updateEquivalentSpringConstant );

    // Robotic arm sets displacement of equivalent spring.
    var ignoreUpdates = false; // Used to prevent updates until both springs have been modified.
    this.roboticArm.leftProperty.link( function( left ) {
      if ( !ignoreUpdates ) {
        // this will affect the displacement of both springs
        ignoreUpdates = true;
        thisSystem.equivalentSpring.displacementProperty.set( left - thisSystem.equivalentSpring.equilibriumXProperty.get() );
        ignoreUpdates = false;
      }
    } );

    // Connect arm to equivalent spring.
    this.equivalentSpring.rightProperty.link( function( right ) {
      thisSystem.roboticArm.leftProperty.set( right );
    } );

    // Check for violations of the general Spring model ----------------------------------------------------------------------------------------------

    this.topSpring.leftProperty.lazyLink( function( left ) {
      throw new Error( 'Left end of top spring must remain fixed, left=' + left );
    } );

    this.bottomSpring.leftProperty.lazyLink( function( left ) {
      throw new Error( 'Left end of bottom spring must remain fixed, left=' + left );
    } );

    this.equivalentSpring.leftProperty.lazyLink( function( left ) {
      throw new Error( 'Left end of equivalent spring must remain fixed, left=' + left );
    } );

    this.equivalentSpring.equilibriumXProperty.lazyLink( function( equilibriumX ) {
      throw new Error( 'Equilibrium position of equivalent spring must remain fixed, equilibriumX=' + equilibriumX );
    } );
  }

  return inherit( Object, ParallelSystem, {

    reset: function() {
      this.topSpring.reset();
      this.bottomSpring.reset();
      this.roboticArm.reset();
      this.equivalentSpring.reset();
    }
  } );
} );
