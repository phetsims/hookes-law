// Copyright 2015-2020, University of Colorado Boulder

/**
 * Model of a spring, contains purely model Properties.
 * The left end is attached to something like a wall or another spring.
 * A force is applied to the right end, by something like a robotic arm or another spring.
 *
 * Model equations:
 *
 * F = k * x
 * E = ( k * x * x ) / 2
 *
 * where:
 *
 * F = applied force, N
 * k = spring constant, N/m
 * x = displacement from equilibrium position, m
 * E = potential energy, J
 *
 * Either displacement range or applied force range must be specified, but not both.
 * The unspecified range is computed, and whichever range is not specified is the
 * quantity that changes when spring constant is modified. For example, if applied force
 * range is specified, then displacement range is computed, and changing spring constant
 * will modify displacement. Here's how that applies to this sim's screens:
 *
 * Intro and Systems screens (appliedForceRange specified):
 *
 * F change => compute x
 * k change => compute x
 * x change => compute F
 *
 * Energy screen (displacementRange specified):
 *
 * F change => compute x
 * k change => compute F
 * x change => compute F
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import DerivedPropertyIO from '../../../../axon/js/DerivedPropertyIO.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Range from '../../../../dot/js/Range.js';
import RangeWithValue from '../../../../dot/js/RangeWithValue.js';
import merge from '../../../../phet-core/js/merge.js';
import PhetioObject from '../../../../tandem/js/PhetioObject.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import NumberIO from '../../../../tandem/js/types/NumberIO.js';
import hookesLaw from '../../hookesLaw.js';

class Spring extends PhetioObject {
  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {

      // name that appears in log messages
      logName: null,

      // {number} x position of the left end of the spring, units = m
      left: 0,

      // {number} length of the spring at equilibrium, units = m
      equilibriumLength: 1.5,

      // {RangeWithValue} spring constant range and initial value, units = N/m
      springConstantRange: new RangeWithValue( 100, 1000, 200 ),

      // {RangeWithValue|null} applied force range and initial value, units = N
      appliedForceRange: null,

      // {RangeWithValue|null} displacement range and initial value, units = m
      displacementRange: null,

      // phet-io
      tandem: Tandem.REQUIRED,
      phetioState: false // since this type has no inherent state to save, to avoid circular JSON error

    }, options );

    super( options );

    // validate and save options
    assert && assert( options.equilibriumLength > 0,
      'equilibriumLength must be > 0 : ' + options.equilibriumLength );
    this.equilibriumLength = options.equilibriumLength; // @public read-only

    assert && assert( options.springConstantRange instanceof RangeWithValue,
      'invalid springConstantRange: ' + options.springConstantRange );
    assert && assert( options.springConstantRange.min > 0,
      'minimum spring constant must be positive : ' + options.springConstantRange.min );
    this.springConstantRange = options.springConstantRange; // @public read-only

    // Either appliedForceRange or displacementRange must be specified, and the other is computed.
    // Intro and Systems screens specify appliedForceRange. Energy screen specifies displacementRange.
    assert && assert( ( options.appliedForceRange && !options.displacementRange ) ||
                      ( !options.appliedForceRange && options.displacementRange ),
      'specify either appliedForceRange or displacementRange, but not both' );
    if ( options.appliedForceRange ) {
      assert && assert( options.appliedForceRange instanceof RangeWithValue,
        'invalid appliedForceRange: ' + options.appliedForceRange );
      this.appliedForceRange = options.appliedForceRange; // read-only

      // x = F/k, read-only
      this.displacementRange = new RangeWithValue(
        this.appliedForceRange.min / this.springConstantRange.min,
        this.appliedForceRange.max / this.springConstantRange.min,
        this.appliedForceRange.defaultValue / this.springConstantRange.defaultValue );
    }
    else {
      assert && assert( options.displacementRange instanceof RangeWithValue,
        'invalid displacementRange: ' + options.displacementRange );
      this.displacementRange = options.displacementRange; // read-only

      // F = kx, read-only
      this.appliedForceRange = new RangeWithValue(
        this.springConstantRange.max * this.displacementRange.min,
        this.springConstantRange.max * this.displacementRange.max,
        this.springConstantRange.defaultValue * this.displacementRange.defaultValue );
    }

    //------------------------------------------------
    // Properties

    // @public applied force (F)
    this.appliedForceProperty = new NumberProperty( this.appliedForceRange.defaultValue, {

      // Applied force (F) and displacement (x) participate in a 2-way relationship, where changing
      // one of them results in recalculation of the other.  For some values, this results in floating-point
      // error that causes reentrant behavior.  See #63.
      reentrant: true,
      range: this.appliedForceRange,
      units: 'N',
      tandem: options.tandem.createTandem( 'appliedForceProperty' )
    } );
    phet.log && this.appliedForceProperty.link( appliedForce => phet.log( `${options.logName} appliedForce=${appliedForce}` ) );

    // @public spring constant (k)
    this.springConstantProperty = new NumberProperty( this.springConstantRange.defaultValue, {
      range: this.springConstantRange,
      units: 'newtons/meters',
      tandem: options.tandem.createTandem( 'springConstantProperty' )
    } );
    phet.log && this.springConstantProperty.link( springConstant => phet.log( `${options.logName} springConstant= ${springConstant}` ) );

    // @public displacement from equilibrium position (x)
    this.displacementProperty = new NumberProperty( this.displacementRange.defaultValue, {

      // Applied force (F) and displacement (x) participate in a 2-way relationship, where changing
      // one of them results in recalculation of the other.  For some values, this results in floating-point
      // error that causes reentrant behavior.  See #63.
      reentrant: true,
      range: this.displacementRange,
      units: 'meters',
      tandem: options.tandem.createTandem( 'displacementProperty' )
    } );
    phet.log && this.displacementProperty.link( displacement => phet.log( `${options.logName} displacement=${displacement}` ) );

    // @public position of the left end of the spring
    this.leftProperty = new NumberProperty( options.left );
    phet.log && this.leftProperty.link( left => phet.log( `${options.logName} left=${left}` ) );

    //------------------------------------------------
    // Property observers

    // F: When applied force changes, maintain spring constant, change displacement.
    this.appliedForceProperty.link( appliedForce => {
      assert && assert( this.appliedForceRange.contains( appliedForce ),
        'appliedForce is out of range: ' + appliedForce );

      // x = F/k
      this.displacementProperty.set( appliedForce / this.springConstantProperty.get() );
    } );

    // k: When spring constant changes, adjust either applied force or displacement.
    this.springConstantProperty.link( springConstant => {
      assert && assert( this.springConstantRange.contains( springConstant ),
        'springConstant is out of range: ' + springConstant );

      if ( options.appliedForceRange ) {

        // If the applied force range was specified via options, then maintain the applied force, change displacement.
        // This applies to the Intro and Systems screens.
        // x = F/k
        this.displacementProperty.set( this.appliedForceProperty.get() / springConstant );
      }
      else {

        // If displacement range was specified via options, maintain the displacement, change applied force.
        // This applies to the Energy screen.
        // F = kx
        this.appliedForceProperty.set( springConstant * this.displacementProperty.get() );
      }
    } );

    // x: When displacement changes, maintain the spring constant, change applied force.
    this.displacementProperty.link( displacement => {
      assert && assert( this.displacementRange.contains( displacement ),
        'displacement is out of range: ' + displacement );

      // F = kx
      let appliedForce = this.springConstantProperty.get() * displacement;

      // Constrain to range, needed due to floating-point error.
      appliedForce = this.appliedForceRange.constrainValue( appliedForce );

      this.appliedForceProperty.set( appliedForce );
    } );

    //------------------------------------------------
    // Derived properties

    // @public spring force opposes the applied force (-F)
    this.springForceProperty = new DerivedProperty(
      [ this.appliedForceProperty ],
      appliedForce => -appliedForce, {
        units: 'N',
        phetioType: DerivedPropertyIO( NumberIO ),
        tandem: options.tandem.createTandem( 'springForceProperty' )
      } );
    phet.log && this.springForceProperty.link( springForce => phet.log( `${options.logName} springForce=${springForce}` ) );

    // @public equilibrium x position
    // This must be a Property to support systems of springs. For example, for 2 springs in series,
    // equilibriumXProperty changes for the right spring, whose left end moves.
    this.equilibriumXProperty = new DerivedProperty(
      [ this.leftProperty ],
      left => left + this.equilibriumLength
    );
    phet.log && this.equilibriumXProperty.link( equilibriumX => phet.log( `${options.logName} equilibriumX=${equilibriumX}` ) );

    // @public x position of the right end of the spring
    this.rightProperty = new DerivedProperty( [ this.equilibriumXProperty, this.displacementProperty ],
      ( equilibriumX, displacement ) => {
        const left = this.leftProperty.get();
        const right = equilibriumX + displacement;
        assert && assert( right - left > 0, 'right must be > left, right=' + right + ', left=' + left );
        return right;
      } );
    phet.log && this.rightProperty.link( right => phet.log( `${options.logName} right=${right}` ) );

    // @public Range of the right end of the spring
    // Derivation differs depending on whether changing spring constant modifies applied force or displacement.
    this.rightRangeProperty = null;
    if ( options.appliedForceRange ) {
      this.rightRangeProperty = new DerivedProperty(
        [ this.springConstantProperty, this.equilibriumXProperty ],
        ( springConstant, equilibriumX ) => {
          const minDisplacement = this.appliedForceRange.min / springConstant;
          const maxDisplacement = this.appliedForceRange.max / springConstant;
          return new Range( equilibriumX + minDisplacement, equilibriumX + maxDisplacement );
        } );
    }
    else {
      this.rightRangeProperty = new DerivedProperty(
        [ this.equilibriumXProperty ],
        equilibriumX => new Range( equilibriumX + this.displacementRange.min, equilibriumX + this.displacementRange.max )
      );
    }
    phet.log && this.rightRangeProperty.link( rightRange => phet.log( `${options.logName} rightRange=${rightRange}` ) );

    // @public length of the spring
    this.lengthProperty = new DerivedProperty(
      [ this.leftProperty, this.rightProperty ],
      ( left, right ) => Math.abs( right - left )
    );
    phet.log && this.lengthProperty.link( length => phet.log( `${options.logName} length=${length}` ) );

    // @public potential energy, E = ( k1 * x1 * x1 ) / 2
    // To avoid intermediate values, define this *after* the listeners that update its dependencies.
    this.potentialEnergyProperty = new DerivedProperty(
      [ this.springConstantProperty, this.displacementProperty ],
      ( springConstant, displacement ) => ( springConstant * displacement * displacement ) / 2, {
        units: 'joules',
        phetioType: DerivedPropertyIO( NumberIO ),
        tandem: options.tandem.createTandem( 'potentialEnergyProperty' )
      } );
    phet.log && this.potentialEnergyProperty.link( potentialEnergy => phet.log( `${options.logName} potentialEnergy=${potentialEnergy}` ) );
  }

  // @public
  reset() {
    this.appliedForceProperty.reset();
    this.springConstantProperty.reset();
    this.displacementProperty.reset();
    this.leftProperty.reset();
  }
}

hookesLaw.register( 'Spring', Spring );

export default Spring;