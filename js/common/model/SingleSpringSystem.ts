// Copyright 2015-2022, University of Colorado Boulder

// @ts-nocheck
/**
 * Model of a system with 1 spring, pulled by a robotic arm.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import hookesLaw from '../../hookesLaw.js';
import RoboticArm from './RoboticArm.js';
import Spring from './Spring.js';

export default class SingleSpringSystem {

  /**
   * @param {Tandem} tandem
   * @param {Object} [springOptions] - options that are passed to Spring
   */
  constructor( tandem, springOptions ) {

    //------------------------------------------------
    // Components of the system

    // @public spring
    this.spring = new Spring( merge( {}, springOptions, {
      tandem: tandem.createTandem( 'spring' )
    } ) );
    assert && assert( this.spring.displacementProperty.value === 0 ); // spring is at equilibrium

    // @public arm, left end attached to spring
    this.roboticArm = new RoboticArm( {
      left: this.spring.rightProperty.value,
      right: this.spring.rightProperty.value + this.spring.lengthProperty.value,
      tandem: tandem.createTandem( 'roboticArm' )
    } );

    //------------------------------------------------
    // Property observers

    // Connect arm to spring.
    this.spring.rightProperty.link( right => {
      this.roboticArm.leftProperty.value = right;
    } );

    // Robotic arm sets displacement of spring.
    this.roboticArm.leftProperty.link( left => {
      this.spring.displacementProperty.value = ( left - this.spring.equilibriumXProperty.value );
    } );

    //------------------------------------------------
    // Check for conditions supported by the general Spring model that aren't allowed by this system

    this.spring.leftProperty.lazyLink( left => {
      throw new Error( `Left end of spring must remain fixed, left=${left}` );
    } );

    this.spring.equilibriumXProperty.lazyLink( equilibriumX => {
      throw new Error( `Equilibrium position must remain fixed, equilibriumX=${equilibriumX}` );
    } );
  }

  // @public
  reset() {
    this.spring.reset();
    this.roboticArm.reset();
  }
}

hookesLaw.register( 'SingleSpringSystem', SingleSpringSystem );