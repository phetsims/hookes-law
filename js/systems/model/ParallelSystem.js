// Copyright 2015-2021, University of Colorado Boulder

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
import RoboticArm from '../../common/model/RoboticArm.js';
import Spring from '../../common/model/Spring.js';
import hookesLaw from '../../hookesLaw.js';

export default class ParallelSystem {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    //------------------------------------------------
    // Components of the system

    // @public
    this.topSpring = new Spring( {
      logName: 'topSpring',
      left: 0, // x position of the left end of the spring, units = m
      equilibriumLength: 1.5, // length of the spring at equilibrium, units = m
      springConstantRange: new RangeWithValue( 200, 600, 200 ), // range and initial value of k1, units = N/m
      appliedForceRange: new RangeWithValue( -100, 100, 0 ), // range and initial value of F1, units = N
      tandem: tandem.createTandem( 'topSpring' ),
      phetioDocumentation: 'The top spring in the parallel system'
    } );

    // @public bottom spring, in parallel with top spring, with identical configuration
    this.bottomSpring = new Spring( {
      logName: 'bottomSpring',
      left: this.topSpring.leftProperty.get(),
      equilibriumLength: this.topSpring.equilibriumLength,
      springConstantRange: this.topSpring.springConstantRange,
      appliedForceRange: this.topSpring.appliedForceRange,
      tandem: tandem.createTandem( 'bottomSpring' ),
      phetioDocumentation: 'The bottom spring in the parallel system'
    } );

    // verify that springs are indeed parallel
    assert && assert( this.topSpring.leftProperty.get() === this.bottomSpring.leftProperty.get(), 'top and bottom springs must have same left' );
    assert && assert( this.topSpring.rightProperty.get() === this.bottomSpring.rightProperty.get(), 'top and bottom springs must have same right' );
    assert && assert( this.topSpring.equilibriumXProperty.get() === this.bottomSpring.equilibriumXProperty.get(),
      'top and bottom springs must have same equilibrium position' );

    // @public the single spring that is equivalent to the 2 springs in parallel
    this.equivalentSpring = new Spring( {
      logName: 'equivalentSpring',
      left: this.topSpring.leftProperty.get(),
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
    assert && assert( this.equivalentSpring.displacementProperty.get() === 0 ); // equivalent spring is at equilibrium

    // @public robotic arm, connected to the right end of the equivalent spring
    this.roboticArm = new RoboticArm( {
      left: this.equivalentSpring.rightProperty.get(),
      right: this.equivalentSpring.rightProperty.get() + this.equivalentSpring.lengthProperty.get(),
      tandem: tandem.createTandem( 'roboticArm' )
    } );

    //------------------------------------------------
    // Property observers

    // xeq = x1 = x2
    this.equivalentSpring.displacementProperty.link( displacement => {
      this.topSpring.displacementProperty.set( displacement ); // x1 = xeq
      this.bottomSpring.displacementProperty.set( displacement ); // x2 = xeq
    } );

    // keq = k1 + k2
    const updateEquivalentSpringConstant = () => {
      const topSpringConstant = this.topSpring.springConstantProperty.get();
      const bottomSpringConstant = this.bottomSpring.springConstantProperty.get();
      this.equivalentSpring.springConstantProperty.set( topSpringConstant + bottomSpringConstant );
    };
    this.topSpring.springConstantProperty.link( updateEquivalentSpringConstant );
    this.bottomSpring.springConstantProperty.link( updateEquivalentSpringConstant );

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

    // Connect robotic arm to equivalent spring.
    this.equivalentSpring.rightProperty.link( right => {
      this.roboticArm.leftProperty.set( right );
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

  // @public
  reset() {
    this.topSpring.reset();
    this.bottomSpring.reset();
    this.roboticArm.reset();
    this.equivalentSpring.reset();
  }
}

hookesLaw.register( 'ParallelSystem', ParallelSystem );