// Copyright 2015-2023, University of Colorado Boulder

/**
 * The robotic arm. The left end is movable, the right end is fixed.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { PhetioObjectOptions } from '../../../../tandem/js/PhetioObject.js';
import hookesLaw from '../../hookesLaw.js';

type SelfOptions = {
  left?: number;  // {number} initial x position of the left (movable) end of the arm, units = m
  right?: number; // {number} initial x position of the right (fixed) end of the arm, units = m
};

type RoboticArmOptions = SelfOptions & PickRequired<PhetioObjectOptions, 'tandem'>;

export default class RoboticArm {

  // right (fixed) end of the arm
  public readonly right: number;

  // left (movable) end of the arm
  public readonly leftProperty: Property<number>;

  public constructor( providedOptions: RoboticArmOptions ) {

    const options = optionize<RoboticArmOptions, SelfOptions>()( {

      // SelfOptions
      left: 0,
      right: 1
    }, providedOptions );

    this.right = options.right;

    this.leftProperty = new NumberProperty( options.left, {

      // The left end of the robotic arm and the spring's displacement (x) participate in a 2-way relationship,
      // where changing one of them results in recalculation of the other.  For some values, this results in
      // floating-point error that causes reentrant behavior.  See #63.
      reentrant: true,
      isValidValue: value => ( value < this.right ),
      tandem: options.tandem.createTandem( 'leftProperty' ),
      phetioReadOnly: true // because you should adjust the appliedForceProperty instead
    } );
    phet.log && this.leftProperty.link( left => phet.log( `roboticArm left=${left}` ) );
  }

  public dispose(): void {
    assert && assert( false, 'dispose is not supported, exists for the lifetime of the sim' );
  }

  public reset(): void {
    this.leftProperty.reset();
  }
}

hookesLaw.register( 'RoboticArm', RoboticArm );