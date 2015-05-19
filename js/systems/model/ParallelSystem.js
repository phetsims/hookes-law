// Copyright 2002-2015, University of Colorado Boulder

/**
 * Model of 2 springs in parallel.
 *
 * Feq = F1 + F2
 * keq = k1 + k2
 * xeq = x1 = x2
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
  function ParallelSystem( options ) {

    options = _.extend( {
      debugName: 'parallel'
    }, options );

    var thisSystem = this;

    this.appliedForceRange = new Range( -100, 100, 0 ); // range and initial value of Feq, units = N

    this.topSpring = new Spring( {
      debugName: options.debugName + '.top',
      left: 0,
      equilibriumLength: 1.5,
      springConstantRange: new Range( 200, 600, 200 ),
      appliedForceRange: this.appliedForceRange
    } );

    this.bottomSpring = new Spring( {
      debugName: options.debugName + '.bottom',
      left: this.topSpring.leftProperty.get(),
      equilibriumLength: this.topSpring.equilibriumLength,
      springConstantRange: this.topSpring.springConstantRange,
      appliedForceRange: this.topSpring.appliedForceRange
    } );

    assert && assert( this.topSpring.displacementProperty.get() === this.bottomSpring.displacementProperty.get() );

    this.roboticArm = new RoboticArm( {
      left: this.topSpring.rightProperty.get(),
      right: 3
    } );

    PropertySet.call( this, {
      appliedForce: this.topSpring.appliedForceProperty.get() + this.bottomSpring.appliedForceProperty.get(), // Feq = F1 + F2
      displacement: this.topSpring.displacementProperty.get() // xeq = x1 = x2
    } );

    // equivalent equilibrium position for the system, read-only
    assert && assert( this.topSpring.equilibriumXProperty.get() === this.bottomSpring.equilibriumXProperty.get(),
      'top and bottom springs must have same equilibrium position' );
    this.equilibriumX = this.topSpring.equilibriumXProperty.get();

    // Derived properties -----------------------------------------------------------

    // equivalent spring force opposes the equivalent applied force, units = N
    this.springForceProperty = new DerivedProperty( [ this.appliedForceProperty ],
      function( appliedForce ) {
        debug( options.debugName + ': derive springForceProperty, appliedForce=' + appliedForce );//XXX
        return -appliedForce;
      } );

    // keq = k1 + k2
    var springConstantRange = new Range(
      this.topSpring.springConstantRange.min + this.bottomSpring.springConstantRange.min,
      this.topSpring.springConstantRange.max + this.bottomSpring.springConstantRange.max );
    var springConstantProperty = new DerivedProperty(
      [ this.topSpring.springConstantProperty, this.bottomSpring.springConstantProperty ],
      function( topSpringConstant, bottomSpringConstant ) {
        debug( options.debugName + ': derive springConstantProperty, topSpringConstant=' + topSpringConstant + ', bottomSpringConstant=' + bottomSpringConstant );//XXX
        var springConstant = topSpringConstant + bottomSpringConstant;
        assert && assert( springConstantRange.contains( springConstant ), options.debugName + ': equivalent spring constant out of range: ' + springConstant );
        return springConstant;
      } );

    // Property observers -----------------------------------------------------------

    // Feq = F1 + F2
    this.appliedForceProperty.link( function( appliedForce ) {
      debug( options.debugName + ': observer, appliedForce=' + appliedForce );//XXX
      var displacement = appliedForce / springConstantProperty.get(); // xeq = Feq / keq
      thisSystem.displacement = displacement;
    } );

    // xeq = x1 = x2
    var modifyingDisplacement = false; // to prevent looping and thrashing
    var displacementRange = new Range( this.appliedForceRange.min / springConstantRange.min, this.appliedForceRange.max / springConstantRange.min );
    this.displacementProperty.link( function( displacement ) {
      debug( options.debugName + ': observer, displacement=' + displacement );//XXX
      if ( !modifyingDisplacement ) {
        assert && assert( displacementRange.contains( displacement ), options.debugName + ': equivalent displacement is out of range: ' + displacement );
        modifyingDisplacement = true;
        thisSystem.topSpring.displacementProperty.set( displacement ); // x1 = xeq
        thisSystem.bottomSpring.displacementProperty.set( displacement ); // x2 = xeq
        modifyingDisplacement = false;
      }
    } );

    this.topSpring.leftProperty.lazyLink( function( left ) {
      throw new Error( 'Left end of top spring must remain fixed for a parallel system, left=' + left );
    } );

    this.bottomSpring.leftProperty.lazyLink( function( left ) {
      throw new Error( 'Left end of bottom spring must remain fixed for a parallel system, left=' + left );
    } );

    this.roboticArm.leftProperty.link( function( left ) {
      debug( options.debugName + ': observer, roboticArm.left=' + left );//XXX
      var displacement = left - thisSystem.equilibriumX;
      assert && assert( displacementRange.contains( displacement ), options.debugName + ': equivalent displacement is out of range: ' + displacement );
      thisSystem.displacementProperty.set( displacement );
    } );
  }

  return inherit( PropertySet, ParallelSystem, {

    // @override
    reset: function() {
      PropertySet.prototype.reset.call( this );
      this.topSpring.reset();
      this.bottomSpring.reset();
      this.roboticArm.reset();
    }
  } );
} );
