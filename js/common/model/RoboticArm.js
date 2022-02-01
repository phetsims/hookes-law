// Copyright 2015-2021, University of Colorado Boulder

/**
 * The robotic arm. The left end is movable, the right end is fixed.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import NumberProperty from '../../../../axon/js/NumberProperty.js';
import merge from '../../../../phet-core/js/merge.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import hookesLaw from '../../hookesLaw.js';

class RoboticArm {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      left: 0,  // {number} initial x position of the left (movable) end of the arm, units = m
      right: 1, // {number} initial x position of the right (fixed) end of the arm, units = m
      tandem: Tandem.REQUIRED
    }, options );

    // @public (read-only) right (fixed) end of the arm
    this.right = options.right;

    // @public left (movable) end of the arm
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

  // @public
  reset() {
    this.leftProperty.reset();
  }
}

hookesLaw.register( 'RoboticArm', RoboticArm );

export default RoboticArm;