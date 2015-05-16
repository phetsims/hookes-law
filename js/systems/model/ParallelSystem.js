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
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Range = require( 'DOT/Range' );
  var RoboticArm = require( 'HOOKES_LAW/common/model/RoboticArm' );
  var Spring = require( 'HOOKES_LAW/common/model/Spring' );

  /**
   * @constructor
   */
  function ParallelSystem() {

    PropertySet.call( this, {
      //TODO add Feq, xeq, keq, Eeq
    } );

    this.topSpring = new Spring( {
      left: 0,
      equilibriumLength: 1,
      springConstantRange: new Range( 200, 600, 200 )
    } );

    this.bottomSpring = new Spring( {
      left: this.topSpring.right,
      equilibriumLength: this.topSpring.equilibriumLength,
      springConstantRange: this.topSpring.springConstantRange
    } );

    this.roboticArm = new RoboticArm( {
      left: this.bottomSpring.right,
      right: 3
    } );

    //TODO wire up ends, complete the model, etc.
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
