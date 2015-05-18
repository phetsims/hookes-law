// Copyright 2002-2015, University of Colorado Boulder

/**
 * Model of 2 springs in series.
 *
 * Feq = F1 = F2
 * keq = 1 / ( 1/k1 + 1/k2 )
 * xeq = x1 + x2
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
  var RoboticArm = require( 'HOOKES_LAW/common/model/RoboticArm' );
  var Spring = require( 'HOOKES_LAW/common/model/Spring' );

  /**
   * @constructor
   */
  function SeriesSystem() {

    var thisSystem = this;

    this.appliedForceRange = new Range( -100, 100, 0 ); // range of Feq, units = N

    this.leftSpring = new Spring( {
      debugName: 'left',
      left: 0,
      equilibriumLength: 0.75,
      springConstantRange: new Range( 200, 600, 200 ),
      appliedForceRange: this.appliedForceRange
    } );

    this.rightSpring = new Spring( {
      debugName: 'right',
      left: this.leftSpring.rightProperty.get(),
      equilibriumLength: this.leftSpring.equilibriumLength,
      springConstantRange: this.leftSpring.springConstantRange,
      appliedForceRange: this.appliedForceRange
    } );

    this.roboticArm = new RoboticArm( {
      left: this.rightSpring.rightProperty.get(),
      right: 3
    } );

    PropertySet.call( this, {
      appliedForce: this.appliedForceRange.defaultValue, // Feq
      displacement: this.leftSpring.displacementProperty.get() + this.rightSpring.displacementProperty.get() // xeq = x1 + x2
    } );

    // equivalent spring force opposes the equivalent applied force, units = N
    this.springForceProperty = new DerivedProperty( [ this.appliedForceProperty ],
      function( appliedForce ) {
        return -appliedForce;
      } );

    // equilibrium position for the system, read-only
    this.equilibriumX = this.leftSpring.leftProperty.get() + this.leftSpring.equilibriumLength + this.rightSpring.equilibriumLength;

    // range of keq
    var springConstantRange = new Range(
      1 / ( ( 1 / this.leftSpring.springConstantRange.min ) + ( 1 / this.rightSpring.springConstantRange.min ) ),
      1 / ( ( 1 / this.leftSpring.springConstantRange.max ) + ( 1 / this.rightSpring.springConstantRange.max ) ) );

    // keq = 1 / ( 1/k1 + 1/k2 )
    var springConstantProperty = new DerivedProperty(
      [ this.leftSpring.springConstantProperty, this.rightSpring.springConstantProperty ],
      function( leftSpringConstant, rightSpringConstant ) {
        var springConstant = 1 / ( ( 1 / leftSpringConstant ) + ( 1 / rightSpringConstant ) );
        assert && assert( springConstantRange.contains( springConstant ), 'equivalent spring constant out of range: ' + springConstant );
        return springConstant;
      } );

    springConstantProperty.link( function( springConstant ) {
      thisSystem.displacement = thisSystem.appliedForce / springConstant; // x = F/k
    } );

    // range of xeq
    var displacementRange = new Range( this.appliedForceRange.min / springConstantRange.min, this.appliedForceRange.max / springConstantRange.min );

    this.displacementProperty.link( function( displacement ) {
      assert && assert( displacementRange.contains( displacement ), 'equivalent displacement out of range: ' + displacement );
      var appliedForce = springConstantProperty.get() * displacement; // F = kx
      //   constrain delta
      appliedForce = Math.round( appliedForce / HookesLawConstants.APPLIED_FORCE_DELTA ) * HookesLawConstants.APPLIED_FORCE_DELTA;
      // constrain range
      thisSystem.appliedForce = thisSystem.appliedForceRange.constrainValue( appliedForce );
    } );

    // Feq = F1 = F2
    this.appliedForceProperty.link( function( appliedForce ) {
      assert && assert( thisSystem.appliedForceRange.contains( appliedForce ), 'equivalent appliedForce out of range: ' + appliedForce );
      thisSystem.leftSpring.appliedForceProperty.set( appliedForce );
      thisSystem.rightSpring.appliedForceProperty.set( appliedForce );
    } );

    this.leftSpring.leftProperty.lazyLink( function( left ) {
      throw new Error( 'Left end of left spring must remain fixed for a series system, left=' + left );
    } );

    this.leftSpring.rightProperty.link( function( right ) {
      thisSystem.rightSpring.leftProperty.set( right );
    } );

    this.rightSpring.rightProperty.link( function( right ) {
      thisSystem.roboticArm.leftProperty.set( right );
    } );

    this.roboticArm.leftProperty.link( function( left ) {
      thisSystem.displacement = left - thisSystem.equilibriumX;
    } );
  }

  return inherit( PropertySet, SeriesSystem, {

    // @override
    reset: function() {
      PropertySet.prototype.reset.call( this );
      this.leftSpring.reset();
      this.rightSpring.reset();
      this.roboticArm.reset();
    }
  } );
} );
