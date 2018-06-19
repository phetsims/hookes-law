// Copyright 2015-2018, University of Colorado Boulder

/**
 * Model of a spring, contains purely model Properties.
 * The left end is attached to something like a wall or another spring.
 * A force is applied to the right end, by something like a robotic arm or another spring.
 *
 * Either displacement range or applied force range must be specified, but not both.
 * The unspecified range is computed, and whichever range is not specified is the
 * quantity that changes when spring constant is modified. For example, if applied force
 * range is specified, then displacement range is computed, and changing spring constant
 * will modify displacement.
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
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var DerivedPropertyIO = require( 'AXON/DerivedPropertyIO' );
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var PhetioObject = require( 'TANDEM/PhetioObject' );
  var Range = require( 'DOT/Range' );
  var RangeWithValue = require( 'DOT/RangeWithValue' );
  var Tandem = require( 'TANDEM/Tandem' );
  var Util = require( 'DOT/Util' );

  // ifphetio
  var NumberIO = require( 'ifphetio!PHET_IO/types/NumberIO' );
  var RangeIO = require( 'ifphetio!DOT/RangeIO' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function Spring( options ) {

    var self = this;

    options = _.extend( {

      // {number} x location of the left end of the spring, units = m
      left: 0,

      // {number} length of the spring at equilibrium, units = m
      equilibriumLength: 1.5,

      // {RangeWithValue} spring constant range and initial value, units = N/m
      springConstantRange: new RangeWithValue( 100, 1000, 200 ),

      // {RangeWithValue|null} displacement range and initial value, units = m
      displacementRange: null,

      // {RangeWithValue|null} applied force range and initial value, units = N
      appliedForceRange: null,

      // {number} applied force (and thus spring force) are constrained to this delta,
      // if options.appliedForceRange is non-null
      appliedForceDelta: HookesLawConstants.APPLIED_FORCE_DELTA,

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

    assert && assert( options.appliedForceDelta > 0,
      'appliedForceDelta must be > 0 : ' + options.appliedForceDelta );
    this.appliedForceDelta = options.appliedForceDelta; // @public read-only

    // Either applied force range or displacement range can be specified, the other is computed.
    assert && assert( options.displacementRange && !options.appliedForceRange ||
                      !options.displacementRange && options.appliedForceRange,
      'specify either displacementRange or appliedForceRange, but not both' );
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
      range: this.appliedForceRange,
      units: 'newtons',
      tandem: options.tandem.createTandem( 'appliedForceProperty' )
    } );

    // @public spring constant (k)
    this.springConstantProperty = new NumberProperty( this.springConstantRange.defaultValue, {
      range: this.springConstantRange,
      units: 'newtons/meters',
      tandem: options.tandem.createTandem( 'springConstantProperty' )
    } );

    // @public displacement from equilibrium position (x)
    this.displacementProperty = new NumberProperty( this.displacementRange.defaultValue, {
      range: this.displacementRange,
      units: 'meters',
      tandem: options.tandem.createTandem( 'displacementProperty' )
    } );

    // @public location of the left end of the spring
    this.leftProperty = new NumberProperty( options.left, {
      units: 'meters',
      tandem: options.tandem.createTandem( 'leftProperty' ),
      phetioInstanceDocumentation: 'location of the left end of the spring.'
    } );

    // log each NumberProperty value when it changes
    phet.log && this.appliedForceProperty.link( function( appliedForce ) { phet.log( 'Spring appliedForce=' + appliedForce ); } );
    phet.log && this.springConstantProperty.link( function( springConstant ) { phet.log( 'Spring springConstant=' + springConstant ); } );
    phet.log && this.springConstantProperty.link( function( displacement ) { phet.log( 'Spring displacement=' + displacement ); } );
    phet.log && this.leftProperty.link( function( left ) { phet.log( 'Spring left=' + left ); } );

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

    // @public equilibrium x location
    this.equilibriumXProperty = new DerivedProperty( [ this.leftProperty ],
      function( left ) {
        return left + self.equilibriumLength;
      }, {
        units: 'meters',
        phetioType: DerivedPropertyIO( NumberIO ),
        tandem: options.tandem.createTandem( 'equilibriumXProperty' )
      } );

    // @public x location of the right end of the spring
    this.rightProperty = new DerivedProperty( [ this.equilibriumXProperty, this.displacementProperty ],
      function( equilibriumX, displacement ) {
        var left = self.leftProperty.get();
        var right = equilibriumX + displacement;
        assert && assert( right - left > 0, 'right must be > left, right=' + right + ', left=' + left );
        return right;
      }, {
        units: 'meters',
        phetioType: DerivedPropertyIO( NumberIO ),
        tandem: options.tandem.createTandem( 'rightProperty' ),
        phetioInstanceDocumentation: 'location of the right end of the spring.'
      } );
    phet.log && this.rightProperty.link( function( right ) { phet.log( 'Spring right=' + right ); } );

    // @public Range of the right end of the spring
    // Derivation differs depending on whether changing spring constant modifies applied force or displacement.
    this.rightRangeProperty = null;
    var rightRangePropertyOptions = {
      units: 'meters',
      valueType: Range,
      phetioType: DerivedPropertyIO( RangeIO ),
      tandem: options.tandem.createTandem( 'rightRangeProperty' )
    };
    if ( options.appliedForceRange ) {
      this.rightRangeProperty = new DerivedProperty( [ this.springConstantProperty, this.equilibriumXProperty ],
        function( springConstant, equilibriumX ) {
          var minDisplacement = self.appliedForceRange.min / springConstant;
          var maxDisplacement = self.appliedForceRange.max / springConstant;
          return new Range( equilibriumX + minDisplacement, equilibriumX + maxDisplacement );
        }, rightRangePropertyOptions );
    }
    else {
      this.rightRangeProperty = new DerivedProperty( [ this.equilibriumXProperty ],
        function( equilibriumX ) {
          return new Range( equilibriumX + self.displacementRange.min, equilibriumX + self.displacementRange.max );
        }, rightRangePropertyOptions );
    }

    // @public length of the spring
    this.lengthProperty = new DerivedProperty( [ this.leftProperty, this.rightProperty ],
      function( left, right ) {
        return Math.abs( right - left );
      }, {
        units: 'meters',
        phetioType: DerivedPropertyIO( NumberIO ),
        tandem: options.tandem.createTandem( 'lengthProperty' )
      } );

    // @public potential energy, E = ( k1 * x1 * x1 ) / 2
    this.energyProperty = new DerivedProperty( [ this.springConstantProperty, this.displacementProperty ],
      function( springConstant, displacement ) {
        return ( springConstant * displacement * displacement ) / 2;
      }, {
        units: 'joules',
        phetioType: DerivedPropertyIO( NumberIO ),
        tandem: options.tandem.createTandem( 'energyProperty' )
      } );

    //------------------------------------------------
    // Property observers

    // F: When applied force changes, maintain the spring constant, change displacement.
    this.appliedForceProperty.link( function( appliedForce ) {
      assert && assert( self.appliedForceRange.contains( appliedForce ), 'appliedForce is out of range: ' + appliedForce );

      // x = F/k
      var displacement = Util.toFixedNumber( appliedForce / self.springConstantProperty.get(),
        HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES );
      self.displacementProperty.set( displacement );
    } );

    // k: When spring constant changes, adjust either displacement or applied force.
    this.springConstantProperty.link( function( springConstant ) {
      assert && assert( self.springConstantRange.contains( springConstant ), 'springConstant is out of range: ' + springConstant );
      if ( options.appliedForceRange ) {

        // The applied force range was specified via options - maintain the applied force, change displacement.
        // This applies to the Intro and Systems screens.
        // x = F/k
        var displacement = Util.toFixedNumber( self.appliedForceProperty.get() / springConstant,
          HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES );
        self.displacementProperty.set( displacement );
      }
      else {

        // The displacement range was specified via options - maintain the displacement, change applied force.
        // This applies to the Energy screen.
        // F = kx
        self.appliedForceProperty.set( springConstant * self.displacementProperty.get() ); // F = kx
      }
    } );

    // x: When displacement changes, maintain the spring constant, change applied force.
    this.displacementProperty.link( function( displacement ) {
      assert && assert( self.displacementRange.contains( displacement ),
        'displacement is out of range: ' + displacement );

      // F = kx
      var appliedForce = self.springConstantProperty.get() * displacement;

      // Constrain to delta if the applied force range was specified via options.
      // This occurs in the Intro and Systems screens.
      if ( options.appliedForceRange ) {
        appliedForce = Math.round( appliedForce / options.appliedForceDelta ) * options.appliedForceDelta;
      }

      // Constrain to range.
      self.appliedForceProperty.set( self.appliedForceRange.constrainValue( appliedForce ) );
    } );

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
