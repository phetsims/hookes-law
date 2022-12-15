// Copyright 2015-2022, University of Colorado Boulder

/**
 * Model of 2 springs in parallel, pulled by a robotic arm.
 *
 * Feq = F1 + F2
 * keq = k1 + k2
 * xeq = x1 = x2
 * Eeq = E1 + E2
 *
 * where:
 *
 * F = applied force, N/m
 * k = spring constant, N/m
 * x = displacement from equilibrium position, m
 * E = stored energy, J
 * subscript "1" is for the top spring
 * subscript "2" is for the bottom spring
 * subscript "eq" is a spring that is equivalent to the 2 springs in parallel
 *
 * In the equations above, subscript "1" applies to the top spring, "2" applied to the bottom spring.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import RangeWithValue from '../../../../dot/js/RangeWithValue.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import RoboticArm from '../../common/model/RoboticArm.js';
import Spring from '../../common/model/Spring.js';
import hookesLaw from '../../hookesLaw.js';

export default class ParallelSystem {

  public readonly topSpring: Spring;
  public readonly bottomSpring: Spring; // bottom spring, in parallel with top spring, with identical configuration
  public readonly equivalentSpring: Spring; // the single spring that is equivalent to the 2 springs in parallel
  public readonly roboticArm: RoboticArm; // robotic arm, connected to the right end of the equivalent spring

  public constructor( tandem: Tandem ) {

    //------------------------------------------------
    // Components of the system

    this.topSpring = new Spring( {
      logName: 'topSpring',
      left: 0, // x position of the left end of the spring, units = m
      equilibriumLength: 1.5, // length of the spring at equilibrium, units = m
      springConstantRange: new RangeWithValue( 200, 600, 200 ), // range and initial value of k1, units = N/m
      appliedForceRange: new RangeWithValue( -100, 100, 0 ), // range and initial value of F1, units = N
      tandem: tandem.createTandem( 'topSpring' ),
      phetioDocumentation: 'The top spring in the parallel system'
    } );

    this.bottomSpring = new Spring( {
      logName: 'bottomSpring',
      left: this.topSpring.leftProperty.value,
      equilibriumLength: this.topSpring.equilibriumLength,
      springConstantRange: this.topSpring.springConstantRange,
      appliedForceRange: this.topSpring.appliedForceRange,
      tandem: tandem.createTandem( 'bottomSpring' ),
      phetioDocumentation: 'The bottom spring in the parallel system'
    } );

    // verify that springs are indeed parallel
    assert && assert( this.topSpring.leftProperty.value === this.bottomSpring.leftProperty.value, 'top and bottom springs must have same left' );
    assert && assert( this.topSpring.rightProperty.value === this.bottomSpring.rightProperty.value, 'top and bottom springs must have same right' );
    assert && assert( this.topSpring.equilibriumXProperty.value === this.bottomSpring.equilibriumXProperty.value,
      'top and bottom springs must have same equilibrium position' );

    this.equivalentSpring = new Spring( {
      logName: 'equivalentSpring',
      left: this.topSpring.leftProperty.value,
      equilibriumLength: this.topSpring.equilibriumLength,
      // keq = k1 + k2
      springConstantRange: new RangeWithValue(
        this.topSpring.springConstantRange.min + this.bottomSpring.springConstantRange.min,
        this.topSpring.springConstantRange.max + this.bottomSpring.springConstantRange.max,
        this.topSpring.springConstantRange.defaultValue + this.bottomSpring.springConstantRange.defaultValue ),
      // Feq = F1 + F2
      appliedForceRange: this.topSpring.appliedForceRange,
      tandem: tandem.createTandem( 'equivalentSpring' ),
      phetioDocumentation: 'The single spring that is equivalent to the 2 springs in parallel'
    } );
    assert && assert( this.equivalentSpring.displacementProperty.value === 0 ); // equivalent spring is at equilibrium

    this.roboticArm = new RoboticArm( {
      left: this.equivalentSpring.rightProperty.value,
      right: this.equivalentSpring.rightProperty.value + this.equivalentSpring.lengthProperty.value,
      tandem: tandem.createTandem( 'roboticArm' )
    } );

    //------------------------------------------------
    // Property observers

    // xeq = x1 = x2
    this.equivalentSpring.displacementProperty.link( displacement => {
      this.topSpring.displacementProperty.value = displacement; // x1 = xeq
      this.bottomSpring.displacementProperty.value = displacement; // x2 = xeq
    } );

    // keq = k1 + k2
    const updateEquivalentSpringConstant = () => {
      const topSpringConstant = this.topSpring.springConstantProperty.value;
      const bottomSpringConstant = this.bottomSpring.springConstantProperty.value;
      this.equivalentSpring.springConstantProperty.value = ( topSpringConstant + bottomSpringConstant );
    };
    this.topSpring.springConstantProperty.link( updateEquivalentSpringConstant );
    this.bottomSpring.springConstantProperty.link( updateEquivalentSpringConstant );

    // Robotic arm sets displacement of equivalent spring.
    let ignoreUpdates = false; // Used to prevent updates until both springs have been modified.
    this.roboticArm.leftProperty.link( left => {
      if ( !ignoreUpdates ) {
        // this will affect the displacement of both springs
        ignoreUpdates = true;
        this.equivalentSpring.displacementProperty.value = ( left - this.equivalentSpring.equilibriumXProperty.value );
        ignoreUpdates = false;
      }
    } );

    // Connect robotic arm to equivalent spring.
    this.equivalentSpring.rightProperty.link( right => {
      this.roboticArm.leftProperty.value = right;
    } );

    //------------------------------------------------
    // Check for violations of the general Spring model

    this.topSpring.leftProperty.lazyLink( left => {
      throw new Error( `Left end of top spring must remain fixed, left=${left}` );
    } );

    this.bottomSpring.leftProperty.lazyLink( left => {
      throw new Error( `Left end of bottom spring must remain fixed, left=${left}` );
    } );

    this.equivalentSpring.leftProperty.lazyLink( left => {
      throw new Error( `Left end of equivalent spring must remain fixed, left=${left}` );
    } );

    this.equivalentSpring.equilibriumXProperty.lazyLink( equilibriumX => {
      throw new Error( `Equilibrium position of equivalent spring must remain fixed, equilibriumX=${equilibriumX}` );
    } );
  }

  public reset(): void {
    this.topSpring.reset();
    this.bottomSpring.reset();
    this.roboticArm.reset();
    this.equivalentSpring.reset();
  }
}

hookesLaw.register( 'ParallelSystem', ParallelSystem );