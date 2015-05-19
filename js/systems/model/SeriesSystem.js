// Copyright 2002-2015, University of Colorado Boulder

/**
 * Model of 2 springs in series.
 *
 * Feq = F1 = F2
 * keq = 1 / ( 1/k1 + 1/k2 )
 * xeq = x1 + x2
 * Eeq = E1 + E2 = ( ( k1 * x1 * x1 ) / 2 ) + ( ( k2 * x2 * x2 ) / 2 )
 *
 * where:
 *
 * F = applied force, N/m
 * k = spring constant, N/m
 * x = displacement from equilibrium position, m
 * E = stored energy, J
 * subscript "eq" is an equivalent value for the system
 * subscript "1" is for the left spring
 * subscript "2" is for the right spring
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Range = require( 'DOT/Range' );
  var RoboticArm = require( 'HOOKES_LAW/common/model/RoboticArm' );
  var Spring = require( 'HOOKES_LAW/common/model/Spring' );

  //TODO delete this
  var debug = function( message ) {
    console.log( message );
  };

  /**
   * @param {Object} [options]
   * @constructor
   */
  function SeriesSystem( options ) {

    options = _.extend( {
      debugName: 'series'
    }, options );

    var thisSystem = this;

    this.appliedForceRange = new Range( -100, 100, 0 ); // range and initial value of Feq, units = N

    this.leftSpring = new Spring( {
      debugName: options.debugName + '.left',
      left: 0,
      equilibriumLength: 0.75,
      springConstantRange: new Range( 200, 600, 200 ),
      appliedForceRange: this.appliedForceRange // Feq = F1 = F2
    } );

    this.rightSpring = new Spring( {
      debugName: options.debugName + '.right',
      left: this.leftSpring.rightProperty.get(),
      equilibriumLength: this.leftSpring.equilibriumLength,
      springConstantRange: this.leftSpring.springConstantRange,
      appliedForceRange: this.appliedForceRange // Feq = F1 = F2
    } );

    this.roboticArm = new RoboticArm( {
      left: this.rightSpring.rightProperty.get(),
      right: 3
    } );

    PropertySet.call( this, {
      appliedForce: this.appliedForceRange.defaultValue // Feq
    } );

    // Derived properties -----------------------------------------------------------

    // equivalent spring force opposes the equivalent applied force, units = N
    this.springForceProperty = new DerivedProperty( [ this.appliedForceProperty ],
      function( appliedForce ) {
        debug( 'series: derive springForceProperty, appliedForce=' + appliedForce );//XXX
        return -appliedForce;
      } );

    // equivalent equilibrium position for the system, read-only
    this.equilibriumX = this.leftSpring.leftProperty.get() + this.leftSpring.equilibriumLength + this.rightSpring.equilibriumLength;

    // keq = 1 / ( 1/k1 + 1/k2 )
    var springConstantRange = new Range(
      1 / ( ( 1 / this.leftSpring.springConstantRange.min ) + ( 1 / this.rightSpring.springConstantRange.min ) ),
      1 / ( ( 1 / this.leftSpring.springConstantRange.max ) + ( 1 / this.rightSpring.springConstantRange.max ) ) );
    var springConstantProperty = new DerivedProperty(
      [ this.leftSpring.springConstantProperty, this.rightSpring.springConstantProperty ],
      function( leftSpringConstant, rightSpringConstant ) {
        debug( 'series: derive springConstantProperty, leftSpringConstant=' + leftSpringConstant + ', rightSpringConstant=' + rightSpringConstant );//XXX
        var springConstant = 1 / ( ( 1 / leftSpringConstant ) + ( 1 / rightSpringConstant ) );
        assert && assert( springConstantRange.contains( springConstant ), options.debugName + ': equivalent spring constant out of range: ' + springConstant );
        return springConstant;
      } );

    // xeq = x1 + x2
    var displacementRange = new Range( this.appliedForceRange.min / springConstantRange.min, this.appliedForceRange.max / springConstantRange.min );
    this.displacementProperty = new DerivedProperty( [ this.leftSpring.displacementProperty, this.rightSpring.displacementProperty ],
      function( leftDisplacement, rightDisplacement ) {
        debug( 'series: derive displacementProperty, leftDisplacement=' + leftDisplacement + ', rightDisplacement=' + rightDisplacement );//XXX
        var displacement = leftDisplacement + rightDisplacement;
        assert && assert( displacementRange.contains( displacement ), options.debugName + ': equivalent displacement is out of range: ' + displacement );
        return displacement;
      }
    );

    // Property observers -----------------------------------------------------------

    // Feq = F1 = F2
    this.appliedForceProperty.link( function( appliedForce ) {
      debug( 'series: appliedForce observer: ' + appliedForce );//XXX
      assert && assert( thisSystem.appliedForceRange.contains( appliedForce ), options.debugName + ': equivalent appliedForce is out of range: ' + appliedForce );
      thisSystem.leftSpring.appliedForceProperty.set( appliedForce );
      thisSystem.rightSpring.appliedForceProperty.set( appliedForce );
    } );

    this.leftSpring.leftProperty.lazyLink( function( left ) {
      throw new Error( 'Left end of left spring must remain fixed for a series system, left=' + left );
    } );

    this.leftSpring.rightProperty.link( function( right ) {
      debug( 'series: observer, leftSpring.right=' + right );//XXX
      thisSystem.rightSpring.leftProperty.set( right );
    } );

    this.rightSpring.rightProperty.link( function( right ) {
      debug( 'series: observer, rightSpring.right=' + right );//XXX
      thisSystem.roboticArm.leftProperty.set( right );
    } );

    this.roboticArm.leftProperty.link( function( left ) {
      debug( 'series: observer, roboticArm.left=' + left );//XXX
      var displacement = left - thisSystem.equilibriumX;
      assert && assert( displacementRange.contains( displacement ), options.debugName + ': equivalent displacement is out of range: ' + displacement );
      var appliedForce = springConstantProperty.get() * displacement; // F = kx
      // constrain to delta
      appliedForce = Math.round( appliedForce / HookesLawConstants.APPLIED_FORCE_DELTA ) * HookesLawConstants.APPLIED_FORCE_DELTA;
      // constrain to range
      thisSystem.appliedForce = thisSystem.appliedForceRange.constrainValue( appliedForce );
    } );
  }

  return inherit( PropertySet, SeriesSystem, {

    // @override
    reset: function() {
      PropertySet.prototype.reset.call( this );
      this.leftSpring.reset();
      this.rightSpring.reset();
      this.roboticArm.reset();
    }
  } );
} );
