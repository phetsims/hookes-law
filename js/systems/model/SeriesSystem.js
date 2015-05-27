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
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Range = require( 'DOT/Range' );
  var RoboticArm = require( 'HOOKES_LAW/common/model/RoboticArm' );
  var Spring = require( 'HOOKES_LAW/common/model/Spring' );

  /**
   * @constructor
   */
  function SeriesSystem() {

    var thisSystem = this;

    // left spring, attached to wall
    this.leftSpring = new Spring( {
      left: 0,
      equilibriumLength: 0.75,
      springConstantRange: new Range( 200, 600, 200 ),
      appliedForceRange: new Range( -100, 100, 0 ) // range and initial value of Feq, units = N
    } );

    // right spring, in series with the left spring
    this.rightSpring = new Spring( {
      left: this.leftSpring.rightProperty.get(),
      equilibriumLength: this.leftSpring.equilibriumLength,
      springConstantRange: this.leftSpring.springConstantRange,
      appliedForceRange: this.leftSpring.appliedForceRange // Feq = F1 = F2
    } );

    // arm is attached to right spring
    this.roboticArm = new RoboticArm( {
      left: this.rightSpring.rightProperty.get(),
      right: 3
    } );

    // the single spring that this system is equivalent to
    this.equivalentSpring = new Spring( {
      left: this.leftSpring.left,
      equilibriumLength: this.leftSpring.equilibriumLength + this.rightSpring.equilibriumLength,
      // keq = 1 / ( 1/k1 + 1/k2 )
      springConstantRange: new Range(
        1 / ( ( 1 / this.leftSpring.springConstantRange.min ) + ( 1 / this.rightSpring.springConstantRange.min ) ),
        1 / ( ( 1 / this.leftSpring.springConstantRange.max ) + ( 1 / this.rightSpring.springConstantRange.max ) ) ),
      appliedForceRange: this.leftSpring.appliedForceRange // Feq = F1 = F2
    } );

    // Property observers -----------------------------------------------------------

    // Feq = F1 = F2
    this.equivalentSpring.appliedForceProperty.link( function( appliedForce ) {
      thisSystem.leftSpring.appliedForceProperty.set( appliedForce ); // F1 = Feq
      thisSystem.rightSpring.appliedForceProperty.set( appliedForce ); // F2 = Feq
    } );

    // keq = 1 / ( 1/k1 + 1/k2 )
    var updateEquivalentSpringConstant = function() {
      var leftSpringConstant = thisSystem.leftSpring.springConstantProperty.get();
      var rightSpringConstant = thisSystem.rightSpring.springConstantProperty.get();
      thisSystem.equivalentSpring.springConstantProperty.set( 1 / ( ( 1 / leftSpringConstant ) + ( 1 / rightSpringConstant ) ) );
    };
    this.leftSpring.springConstantProperty.link( updateEquivalentSpringConstant );
    this.rightSpring.springConstantProperty.link( updateEquivalentSpringConstant );

    this.equivalentSpring.equilibriumXProperty.lazyLink( function( equilibriumX ) {
      throw new Error( 'Equilibrium position must remain fixed for a series system, equilibriumX=' + equilibriumX );
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

    // Used to prevent updates until both springs have been modified. This prevents incorrect intermediate states, looping, thrashing.
    var ignoreUpdates = false;
    this.roboticArm.leftProperty.link( function( left ) {
      if ( !ignoreUpdates ) {
        // this will affect the displacement of both springs
        ignoreUpdates = true;
        thisSystem.equivalentSpring.displacementProperty.set( left - thisSystem.equivalentSpring.equilibriumXProperty.get() );
        ignoreUpdates = false;
      }
    } );
  }

  return inherit( Object, SeriesSystem, {

    // @override
    reset: function() {
      this.leftSpring.reset();
      this.rightSpring.reset();
      this.roboticArm.reset();
      this.equivalentSpring.reset();
    }
  } );
} );
