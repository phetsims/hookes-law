// Copyright 2018, University of Colorado Boulder

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
define( function( require ) {
  'use strict';

  // modules
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var DerivedPropertyIO = require( 'AXON/DerivedPropertyIO' );
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var PhetioObject = require( 'TANDEM/PhetioObject' );
  var Range = require( 'DOT/Range' );
  var RangeWithValue = require( 'DOT/RangeWithValue' );
  var Tandem = require( 'TANDEM/Tandem' );

  // ifphetio
  var NumberIO = require( 'ifphetio!PHET_IO/types/NumberIO' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Spring( options ) {

    var self = this;

    options = _.extend( {

      // name that appears in log messages
      logName: null,

      // {number} x location of the left end of the spring, units = m
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
      tandem: Tandem.required,
      phetioState: false // since this type has no inherent state to save, to avoid circular JSON error

    }, options );

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
      units: 'newtons',
      tandem: options.tandem.createTandem( 'appliedForceProperty' )
    } );
    phet.log && this.appliedForceProperty.link(
      function( appliedForce ) { phet.log( options.logName + ' appliedForce=' + appliedForce ); } );

    // @public spring constant (k)
    this.springConstantProperty = new NumberProperty( this.springConstantRange.defaultValue, {
      range: this.springConstantRange,
      units: 'newtons/meters',
      tandem: options.tandem.createTandem( 'springConstantProperty' )
    } );
    phet.log && this.springConstantProperty.link(
      function( springConstant ) { phet.log( options.logName + ' springConstant=' + springConstant ); } );

    // @public displacement from equilibrium position (x)
    this.displacementProperty = new NumberProperty( this.displacementRange.defaultValue, {

      // Applied force (F) and displacement (x) participate in a 2-way relationship, where changing
      // one of them results in recalculation of the other.  For some values, this results in floating-point
      // error that causes reentrant behavior.  See #63.
      range: this.displacementRange,
      units: 'meters',
      tandem: options.tandem.createTandem( 'displacementProperty' )
    } );
    phet.log && this.displacementProperty.link(
      function( displacement ) { phet.log( options.logName + ' displacement=' + displacement ); } );

    // @public location of the left end of the spring
    this.leftProperty = new NumberProperty( options.left );
    phet.log && this.leftProperty.link(
      function( left ) { phet.log( options.logName + ' left=' + left ); } );

    //------------------------------------------------
    // Property observers

    // F: When applied force changes, maintain spring constant, change displacement.
    this.appliedForceProperty.link( function( appliedForce ) {
      assert && assert( self.appliedForceRange.contains( appliedForce ),
        'appliedForce is out of range: ' + appliedForce );

      // x = F/k
      self.displacementProperty.set( appliedForce / self.springConstantProperty.get() );
    } );

    // k: When spring constant changes, adjust either applied force or displacement.
    this.springConstantProperty.link( function( springConstant ) {
      assert && assert( self.springConstantRange.contains( springConstant ),
        'springConstant is out of range: ' + springConstant );

      if ( options.appliedForceRange ) {

        // If the applied force range was specified via options, then maintain the applied force, change displacement.
        // This applies to the Intro and Systems screens.
        // x = F/k
        self.displacementProperty.set( self.appliedForceProperty.get() / springConstant );
      }
      else {

        // If displacement range was specified via options, maintain the displacement, change applied force.
        // This applies to the Energy screen.
        // F = kx
        self.appliedForceProperty.set( springConstant * self.displacementProperty.get() );
      }
    } );

    // x: When displacement changes, maintain the spring constant, change applied force.
    this.displacementProperty.link( function( displacement ) {
      assert && assert( self.displacementRange.contains( displacement ),
        'displacement is out of range: ' + displacement );

      // F = kx
      var appliedForce = self.springConstantProperty.get() * displacement;

      // Constrain to range, needed due to floating-point error.
      appliedForce = self.appliedForceRange.constrainValue( appliedForce );

      self.appliedForceProperty.set( appliedForce );
    } );

    //------------------------------------------------
    // Derived properties

    // @public spring force opposes the applied force (-F)
    this.springForceProperty = new DerivedProperty( [ this.appliedForceProperty ],
      function( appliedForce ) {
        return -appliedForce;
      }, {
        units: 'newtons',
        phetioType: DerivedPropertyIO( NumberIO ),
        tandem: options.tandem.createTandem( 'springForceProperty' )
      } );
    phet.log && this.springForceProperty.link(
      function( springForce ) { phet.log( options.logName + ' springForce=' + springForce ); } );

    // @public equilibrium x location
    // This must be a Property to support systems of springs. For example, for 2 springs in series,
    // equilibriumXProperty changes for the right spring, whose left end moves.
    this.equilibriumXProperty = new DerivedProperty( [ this.leftProperty ],
      function( left ) {
        return left + self.equilibriumLength;
      } );
    phet.log && this.equilibriumXProperty.link(
      function( equilibriumX ) { phet.log( options.logName + ' equilibriumX=' + equilibriumX ); } );

    // @public x location of the right end of the spring
    this.rightProperty = new DerivedProperty( [ this.equilibriumXProperty, this.displacementProperty ],
      function( equilibriumX, displacement ) {
        var left = self.leftProperty.get();
        var right = equilibriumX + displacement;
        assert && assert( right - left > 0, 'right must be > left, right=' + right + ', left=' + left );
        return right;
      } );
    phet.log && this.rightProperty.link(
      function( right ) { phet.log( options.logName + ' right=' + right ); } );

    // @public Range of the right end of the spring
    // Derivation differs depending on whether changing spring constant modifies applied force or displacement.
    this.rightRangeProperty = null;
    if ( options.appliedForceRange ) {
      this.rightRangeProperty = new DerivedProperty( [ this.springConstantProperty, this.equilibriumXProperty ],
        function( springConstant, equilibriumX ) {
          var minDisplacement = self.appliedForceRange.min / springConstant;
          var maxDisplacement = self.appliedForceRange.max / springConstant;
          return new Range( equilibriumX + minDisplacement, equilibriumX + maxDisplacement );
        } );
    }
    else {
      this.rightRangeProperty = new DerivedProperty( [ this.equilibriumXProperty ],
        function( equilibriumX ) {
          return new Range( equilibriumX + self.displacementRange.min, equilibriumX + self.displacementRange.max );
        } );
    }
    phet.log && this.rightRangeProperty.link(
      function( rightRange ) { phet.log( options.logName + ' rightRange=' + rightRange ); } );

    // @public length of the spring
    this.lengthProperty = new DerivedProperty( [ this.leftProperty, this.rightProperty ],
      function( left, right ) {
        return Math.abs( right - left );
      } );
    phet.log && this.lengthProperty.link(
      function( length ) { phet.log( options.logName + ' length=' + length ); } );

    // @public potential energy, E = ( k1 * x1 * x1 ) / 2
    // To avoid intermediate values, define this *after* the listeners that update its dependencies.
    this.potentialEnergyProperty = new DerivedProperty( [ this.springConstantProperty, this.displacementProperty ],
      function( springConstant, displacement ) {
        return ( springConstant * displacement * displacement ) / 2;
      }, {
        units: 'joules',
        phetioType: DerivedPropertyIO( NumberIO ),
        tandem: options.tandem.createTandem( 'potentialEnergyProperty' )
      } );
    phet.log && this.potentialEnergyProperty.link(
      function( potentialEnergy ) { phet.log( options.logName + ' potentialEnergy=' + potentialEnergy ); } );

    PhetioObject.call( this, options );
  }

  hookesLaw.register( 'Spring', Spring );

  return inherit( PhetioObject, Spring, {

    // @public
    reset: function() {
      this.appliedForceProperty.reset();
      this.springConstantProperty.reset();
      this.displacementProperty.reset();
      this.leftProperty.reset();
    }
  } );
} );
