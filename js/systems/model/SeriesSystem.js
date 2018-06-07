// Copyright 2015-2017, University of Colorado Boulder

/**
 * Model of 2 springs in series, pulled by a robotic arm.
 *
 * Feq = F1 = F2
 * keq = 1 / ( 1/k1 + 1/k2 )
 * xeq = x1 + x2
 * Eeq = E1 + E2
 *
 * where:
 *
 * F = applied force, N/m
 * k = spring constant, N/m
 * x = displacement from equilibrium position, m
 * E = stored energy, J
 * subscript "1" is for the left spring
 * subscript "2" is for the right spring
 * subscript "eq" is a spring that is equivalent to the 2 springs in series
 *
 * In the equations above, subscript "1" applies to the left spring, "2" applied to the right spring.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  var inherit = require( 'PHET_CORE/inherit' );
  var RangeWithValue = require( 'DOT/RangeWithValue' );
  var RoboticArm = require( 'HOOKES_LAW/common/model/RoboticArm' );
  var Spring = require( 'HOOKES_LAW/common/model/Spring' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function SeriesSystem( tandem ) {

    var self = this;

    //------------------------------------------------
    // Components of the system

    // @public left spring
    this.leftSpring = new Spring( tandem.createTandem( 'leftSpring' ), {
      left: 0, // x location of the left end of the spring, units = m
      equilibriumLength: 0.75, // length of the spring at equilibrium, units = m
      springConstantRange: new RangeWithValue( 200, 600, 200 ), // range and initial value of k1, units = N/m
      appliedForceRange: new RangeWithValue( -100, 100, 0 ) // range and initial value of Feq, units = N
    } );

    // @public right spring, in series with the left spring, with identical configuration
    this.rightSpring = new Spring( tandem.createTandem( 'rightSpring' ), {
      left: this.leftSpring.rightProperty.get(), // attached to the right end of the left spring
      equilibriumLength: this.leftSpring.equilibriumLength,
      springConstantRange: this.leftSpring.springConstantRange,
      appliedForceRange: this.leftSpring.appliedForceRange
    } );

    // @public the single spring that is equivalent to the 2 springs in series
    this.equivalentSpring = new Spring( tandem.createTandem( 'equivalentSpring' ), {
      left: this.leftSpring.leftProperty.get(),
      equilibriumLength: this.leftSpring.equilibriumLength + this.rightSpring.equilibriumLength,
      // keq = 1 / ( 1/k1 + 1/k2 )
      springConstantRange: new RangeWithValue(
        1 / ( ( 1 / this.leftSpring.springConstantRange.min ) + ( 1 / this.rightSpring.springConstantRange.min ) ),
        1 / ( ( 1 / this.leftSpring.springConstantRange.max ) + ( 1 / this.rightSpring.springConstantRange.max ) ),
        1 / ( ( 1 / this.leftSpring.springConstantRange.defaultValue ) + ( 1 / this.rightSpring.springConstantRange.defaultValue ) ) ),
      appliedForceRange: this.leftSpring.appliedForceRange // Feq = F1 = F2
    } );
    assert && assert( this.equivalentSpring.displacementProperty.get() === 0 ); // equivalent spring is at equilibrium

    // @public robotic arm, attached to right end of equivalent spring
    this.roboticArm = new RoboticArm( tandem.createTandem( 'roboticArm' ), {
      left: this.equivalentSpring.rightProperty.get(),
      right: this.equivalentSpring.rightProperty.get() + this.equivalentSpring.lengthProperty.get()
    } );

    //------------------------------------------------
    // Property observers

    // Feq = F1 = F2
    this.equivalentSpring.appliedForceProperty.link( function( appliedForce ) {
      self.leftSpring.appliedForceProperty.set( appliedForce ); // F1 = Feq
      self.rightSpring.appliedForceProperty.set( appliedForce ); // F2 = Feq
    } );

    // keq = 1 / ( 1/k1 + 1/k2 )
    var updateEquivalentSpringConstant = function() {
      var leftSpringConstant = self.leftSpring.springConstantProperty.get();
      var rightSpringConstant = self.rightSpring.springConstantProperty.get();
      self.equivalentSpring.springConstantProperty.set( 1 / ( ( 1 / leftSpringConstant ) + ( 1 / rightSpringConstant ) ) );
    };
    this.leftSpring.springConstantProperty.link( updateEquivalentSpringConstant );
    this.rightSpring.springConstantProperty.link( updateEquivalentSpringConstant );

    // Robotic arm sets displacement of equivalent spring.
    var ignoreUpdates = false; // Used to prevent updates until both springs have been modified.
    this.roboticArm.leftProperty.link( function( left ) {
      if ( !ignoreUpdates ) {
        // this will affect the displacement of both springs
        ignoreUpdates = true;
        self.equivalentSpring.displacementProperty.set( left - self.equivalentSpring.equilibriumXProperty.get() );
        ignoreUpdates = false;
      }
    } );

    // Connect right spring to left spring.
    this.leftSpring.rightProperty.link( function( right ) {
      self.rightSpring.leftProperty.set( right );
    } );

    // Connect robotic arm to equivalent spring.
    this.equivalentSpring.rightProperty.link( function( right ) {
      self.roboticArm.leftProperty.set( right );
    } );

    //------------------------------------------------
    // Check for conditions supported by the general Spring model that aren't allowed by this system

    this.leftSpring.leftProperty.lazyLink( function( left ) {
      throw new Error( 'Left end of left spring must remain fixed, left=' + left );
    } );

    this.equivalentSpring.leftProperty.lazyLink( function( left ) {
      throw new Error( 'Left end of equivalent spring must remain fixed, left=' + left );
    } );

    this.equivalentSpring.equilibriumXProperty.lazyLink( function( equilibriumX ) {
      throw new Error( 'Equilibrium position of equivalent spring must remain fixed, equilibriumX=' + equilibriumX );
    } );
  }

  hookesLaw.register( 'SeriesSystem', SeriesSystem );

  return inherit( Object, SeriesSystem, {

    // @public
    reset: function() {
      this.leftSpring.reset();
      this.rightSpring.reset();
      this.roboticArm.reset();
      this.equivalentSpring.reset();
    }
  } );
} );
