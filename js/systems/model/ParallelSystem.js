// Copyright 2002-2015, University of Colorado Boulder

/**
 * Model of 2 springs in parallel.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Range = require( 'DOT/Range' );
  var RoboticArm = require( 'HOOKES_LAW/common/model/RoboticArm' );
  var Spring = require( 'HOOKES_LAW/common/model/Spring' );

  /**
   * @constructor
   */
  function ParallelSystem() {

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

    //TODO wire up ends
  }

  return inherit( Object, ParallelSystem, {

    reset: function() {
      this.topSpring.reset();
      this.bottomSpring.reset();
      this.roboticArm.reset();
    }
  } );
} );
