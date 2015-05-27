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
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Range = require( 'DOT/Range' );
  var RoboticArm = require( 'HOOKES_LAW/common/model/RoboticArm' );
  var Spring = require( 'HOOKES_LAW/common/model/Spring' );

  /**
   * @constructor
   */
  function ParallelSystem() {

    var thisSystem = this;

    this.appliedForceRange = new Range( -100, 100, 0 ); // range and initial value of Feq, units = N

    this.topSpring = new Spring( {
      left: 0,
      equilibriumLength: 1.5,
      springConstantRange: new Range( 200, 600, 200 ),
      appliedForceRange: this.appliedForceRange
    } );

    this.bottomSpring = new Spring( {
      left: this.topSpring.leftProperty.get(),
      equilibriumLength: this.topSpring.equilibriumLength,
      springConstantRange: this.topSpring.springConstantRange,
      appliedForceRange: this.topSpring.appliedForceRange
    } );

    assert && assert( this.topSpring.displacementProperty.get() === this.bottomSpring.displacementProperty.get() );

    this.roboticArm = new RoboticArm( {
      left: this.topSpring.rightProperty.get(),
      right: 3
    } );

    PropertySet.call( this, {
      appliedForce: this.topSpring.appliedForceProperty.get() + this.bottomSpring.appliedForceProperty.get(), // Feq = F1 + F2
      displacement: this.topSpring.displacementProperty.get() // xeq = x1 = x2
    } );

    // equivalent equilibrium position for the system, read-only
    assert && assert( this.topSpring.equilibriumXProperty.get() === this.bottomSpring.equilibriumXProperty.get(),
      'top and bottom springs must have same equilibrium position' );
    this.equilibriumX = this.topSpring.equilibriumXProperty.get();

    // Used to prevent property updates until both springs have been modified. This prevents wrong intermediate states, looping, thrashing.
    var ignoreUpdates = false;

    // Derived properties -----------------------------------------------------------

    // equivalent spring force opposes the equivalent applied force, units = N
    this.springForceProperty = new DerivedProperty( [ this.appliedForceProperty ], function( appliedForce ) {
      return ignoreUpdates ? thisSystem.springForceProperty.get() : -appliedForce;
    } );

    // keq = k1 + k2
    var springConstantRange = new Range(
      this.topSpring.springConstantRange.min + this.bottomSpring.springConstantRange.min,
      this.topSpring.springConstantRange.max + this.bottomSpring.springConstantRange.max );
    var springConstantProperty = new DerivedProperty(
      [ this.topSpring.springConstantProperty, this.bottomSpring.springConstantProperty ],
      function( topSpringConstant, bottomSpringConstant ) {
        var springConstant = topSpringConstant + bottomSpringConstant;
        assert && assert( springConstantRange.contains( springConstant ), 'equivalent spring constant out of range: ' + springConstant );
        return springConstant;
      } );

    // x location of the right end of the system, units = m
    this.rightProperty = new DerivedProperty( [ this.displacementProperty ], function( displacement ) {
      return thisSystem.equilibriumX + displacement;
    } );

    this.rightRangeProperty = new DerivedProperty( [ springConstantProperty ],
      function( springConstant ) {
        var minDisplacement = thisSystem.appliedForceRange.min / springConstant; // x = F/k
        var maxDisplacement = thisSystem.appliedForceRange.max / springConstant;
        return new Range( thisSystem.equilibriumX + minDisplacement, thisSystem.equilibriumX + maxDisplacement );
      } );

    // Property observers -----------------------------------------------------------

    this.appliedForceProperty.link( function( appliedForce ) {
      if ( !ignoreUpdates ) {
        thisSystem.displacement = appliedForce / springConstantProperty.get(); // xeq = Feq / keq;
      }
    } );

    // xeq = x1 = x2
    var displacementRange = new Range( this.appliedForceRange.min / springConstantRange.min, this.appliedForceRange.max / springConstantRange.min );
    this.displacementProperty.link( function( displacement ) {
      assert && assert( displacementRange.contains( displacement ), 'equivalent displacement is out of range: ' + displacement );
      if ( !ignoreUpdates ) {
        ignoreUpdates = true;
        thisSystem.topSpring.displacementProperty.set( displacement ); // x1 = xeq
        thisSystem.bottomSpring.displacementProperty.set( displacement ); // x2 = xeq
        ignoreUpdates = false;
      }
    } );

    this.rightProperty.link( function( right ) {
      thisSystem.roboticArm.leftProperty.set( right );
    } );

    this.topSpring.leftProperty.lazyLink( function( left ) {
      throw new Error( 'Left end of top spring must remain fixed for a parallel system, left=' + left );
    } );

    this.bottomSpring.leftProperty.lazyLink( function( left ) {
      throw new Error( 'Left end of bottom spring must remain fixed for a parallel system, left=' + left );
    } );

    this.roboticArm.leftProperty.link( function( left ) {
      thisSystem.displacement = left - thisSystem.equilibriumX;
    } );
  }

  return inherit( PropertySet, ParallelSystem, {

    // @override
    reset: function() {
      PropertySet.prototype.reset.call( this );
      this.topSpring.reset();
      this.bottomSpring.reset();
      this.roboticArm.reset();
    }
  } );
} );
