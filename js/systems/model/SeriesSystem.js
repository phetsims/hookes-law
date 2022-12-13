// Copyright 2015-2021, University of Colorado Boulder

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

import RangeWithValue from '../../../../dot/js/RangeWithValue.js';
import RoboticArm from '../../common/model/RoboticArm.js';
import Spring from '../../common/model/Spring.js';
import hookesLaw from '../../hookesLaw.js';

export default class SeriesSystem {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    //------------------------------------------------
    // Components of the system

    // @public left spring
    this.leftSpring = new Spring( {
      logName: 'leftSpring',
      left: 0, // x position of the left end of the spring, units = m
      equilibriumLength: 0.75, // length of the spring at equilibrium, units = m
      springConstantRange: new RangeWithValue( 200, 600, 200 ), // range and initial value of k1, units = N/m
      appliedForceRange: new RangeWithValue( -100, 100, 0 ), // range and initial value of Feq, units = N
      tandem: tandem.createTandem( 'leftSpring' ),
      phetioDocumentation: 'The left spring in the series system'
    } );

    // @public right spring, in series with the left spring, with identical configuration
    this.rightSpring = new Spring( {
      logName: 'rightSpring',
      left: this.leftSpring.rightProperty.get(), // attached to the right end of the left spring
      equilibriumLength: this.leftSpring.equilibriumLength,
      springConstantRange: this.leftSpring.springConstantRange,
      appliedForceRange: this.leftSpring.appliedForceRange,
      tandem: tandem.createTandem( 'rightSpring' ),
      phetioDocumentation: 'The right spring in the series system'
    } );

    // @public the single spring that is equivalent to the 2 springs in series
    this.equivalentSpring = new Spring( {
      logName: 'equivalentSpring',
      left: this.leftSpring.leftProperty.get(),
      equilibriumLength: this.leftSpring.equilibriumLength + this.rightSpring.equilibriumLength,
      // keq = 1 / ( 1/k1 + 1/k2 )
      springConstantRange: new RangeWithValue(
        1 / ( ( 1 / this.leftSpring.springConstantRange.min ) + ( 1 / this.rightSpring.springConstantRange.min ) ),
        1 / ( ( 1 / this.leftSpring.springConstantRange.max ) + ( 1 / this.rightSpring.springConstantRange.max ) ),
        1 / ( ( 1 / this.leftSpring.springConstantRange.defaultValue ) + ( 1 / this.rightSpring.springConstantRange.defaultValue ) ) ),
      appliedForceRange: this.leftSpring.appliedForceRange, // Feq = F1 = F2
      tandem: tandem.createTandem( 'equivalentSpring' ),
      phetioDocumentation: 'The single spring that is equivalent to the 2 springs in series'
    } );
    assert && assert( this.equivalentSpring.displacementProperty.get() === 0 ); // equivalent spring is at equilibrium

    // @public robotic arm, attached to right end of equivalent spring
    this.roboticArm = new RoboticArm( {
      left: this.equivalentSpring.rightProperty.get(),
      right: this.equivalentSpring.rightProperty.get() + this.equivalentSpring.lengthProperty.get(),
      tandem: tandem.createTandem( 'roboticArm' )
    } );

    //------------------------------------------------
    // Property observers

    // Feq = F1 = F2
    this.equivalentSpring.appliedForceProperty.link( appliedForce => {
      this.leftSpring.appliedForceProperty.set( appliedForce ); // F1 = Feq
      this.rightSpring.appliedForceProperty.set( appliedForce ); // F2 = Feq
    } );

    // keq = 1 / ( 1/k1 + 1/k2 )
    const updateEquivalentSpringConstant = () => {
      const leftSpringConstant = this.leftSpring.springConstantProperty.get();
      const rightSpringConstant = this.rightSpring.springConstantProperty.get();
      this.equivalentSpring.springConstantProperty.set( 1 / ( ( 1 / leftSpringConstant ) + ( 1 / rightSpringConstant ) ) );
    };
    this.leftSpring.springConstantProperty.link( updateEquivalentSpringConstant );
    this.rightSpring.springConstantProperty.link( updateEquivalentSpringConstant );

    // Robotic arm sets displacement of equivalent spring.
    let ignoreUpdates = false; // Used to prevent updates until both springs have been modified.
    this.roboticArm.leftProperty.link( left => {
      if ( !ignoreUpdates ) {
        // this will affect the displacement of both springs
        ignoreUpdates = true;
        this.equivalentSpring.displacementProperty.set( left - this.equivalentSpring.equilibriumXProperty.get() );
        ignoreUpdates = false;
      }
    } );

    // Connect right spring to left spring.
    this.leftSpring.rightProperty.link( right => {
      this.rightSpring.leftProperty.set( right );
    } );

    // Connect robotic arm to equivalent spring.
    this.equivalentSpring.rightProperty.link( right => {
      this.roboticArm.leftProperty.set( right );
    } );

    //------------------------------------------------
    // Check for conditions supported by the general Spring model that aren't allowed by this system

    this.leftSpring.leftProperty.lazyLink( left => {
      throw new Error( `Left end of left spring must remain fixed, left=${left}` );
    } );

    this.equivalentSpring.leftProperty.lazyLink( left => {
      throw new Error( `Left end of equivalent spring must remain fixed, left=${left}` );
    } );

    this.equivalentSpring.equilibriumXProperty.lazyLink( equilibriumX => {
      throw new Error( `Equilibrium position of equivalent spring must remain fixed, equilibriumX=${equilibriumX}` );
    } );
  }

  // @public
  reset() {
    this.leftSpring.reset();
    this.rightSpring.reset();
    this.roboticArm.reset();
    this.equivalentSpring.reset();
  }
}

hookesLaw.register( 'SeriesSystem', SeriesSystem );