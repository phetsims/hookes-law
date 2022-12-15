// Copyright 2015-2022, University of Colorado Boulder

/**
 * Model of a system with 1 spring, pulled by a robotic arm.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import { combineOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import hookesLaw from '../../hookesLaw.js';
import RoboticArm from './RoboticArm.js';
import Spring, { SpringOptions } from './Spring.js';

type SelfOptions = {
  springOptions?: StrictOmit<SpringOptions, 'tandem'>; // options for the Spring in this system
};

export type SingleSpringSystemOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class SingleSpringSystem {

  public readonly spring: Spring;
  public readonly roboticArm: RoboticArm; // arm, left end attached to spring

  public constructor( providedOptions: SingleSpringSystemOptions ) {

    const options = providedOptions;

    //------------------------------------------------
    // Components of the system

    this.spring = new Spring( combineOptions<SpringOptions>( {
      tandem: options.tandem.createTandem( 'spring' )
    }, options.springOptions ) );
    assert && assert( this.spring.displacementProperty.value === 0 ); // spring is at equilibrium

    this.roboticArm = new RoboticArm( {
      left: this.spring.rightProperty.value,
      right: this.spring.rightProperty.value + this.spring.lengthProperty.value,
      tandem: options.tandem.createTandem( 'roboticArm' )
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

  public reset(): void {
    this.spring.reset();
    this.roboticArm.reset();
  }
}

hookesLaw.register( 'SingleSpringSystem', SingleSpringSystem );