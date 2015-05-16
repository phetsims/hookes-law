// Copyright 2002-2015, University of Colorado Boulder

/**
 * Model of 2 springs in series.
 *
 * Feq = F1 = F2
 * 1/keq = 1/k1 + 1/k2
 * xeq = x1 + x2
 *
 * where "eq" is equivalent value for the system, "1" is the left spring, "2" is the right spring.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Range = require( 'DOT/Range' );
  var RoboticArm = require( 'HOOKES_LAW/common/model/RoboticArm' );
  var Spring = require( 'HOOKES_LAW/common/model/Spring' );

  /**
   * @constructor
   */
  function SeriesSystem() {

    var thisSystem = this;

    this.appliedForceRange = new Range( -100, 100, 0 );

    PropertySet.call( this, {
      appliedForce: this.appliedForceRange.defaultValue
    } );

    this.leftSpring = new Spring( {
      left: 0,
      equilibriumLength: 1,
      springConstantRange: new Range( 200, 600, 200 ),
      appliedForceRange: this.appliedForceRange
    } );

    this.rightSpring = new Spring( {
      left: this.leftSpring.right,
      equilibriumLength: this.leftSpring.equilibriumLength,
      springConstantRange: this.leftSpring.springConstantRange,
      appliedForceRange: this.appliedForceRange
    } );

    this.roboticArm = new RoboticArm( {
      left: this.rightSpring.right,
      right: 3
    } );

    this.leftSpring.rightProperty.link( function( right ) {
      thisSystem.rightSpring.leftProperty.set( right );
    } );

    this.rightSpring.leftProperty.link( function( left ) {
      thisSystem.leftSpring.right = left;
    } );

    this.rightSpring.rightProperty.link( function( right ) {
      thisSystem.roboticArm.leftProperty.set( right );
    } );

    this.roboticArm.leftProperty.link( function( left ) {
      thisSystem.rightSpring.right = left;
    } );

    // Feq = F1 = F2
    this.appliedForceProperty.link( function( appliedForce ) {
      thisSystem.leftSpring.appliedForceProperty.set( appliedForce );
      thisSystem.rightSpring.appliedForceProperty.set( appliedForce );
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
