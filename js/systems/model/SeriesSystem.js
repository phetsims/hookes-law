// Copyright 2002-2015, University of Colorado Boulder

/**
 * Model of 2 springs in series.
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
  function SeriesSystem() {

    var thisSystem = this;

    this.leftSpring = new Spring( {
      left: 0,
      equilibriumLength: 1,
      springConstantRange: new Range( 200, 600, 200 )
    } );

    this.rightSpring = new Spring( {
      left: this.leftSpring.right,
      equilibriumLength: this.leftSpring.equilibriumLength,
      springConstantRange: this.leftSpring.springConstantRange
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

    this.roboticArm.leftProperty.link( function( left ) {
      thisSystem.rightSpring.right = left;
    } );
  }

  return inherit( Object, SeriesSystem, {

    reset: function() {
      this.leftSpring.reset();
      this.rightSpring.reset();
      this.roboticArm.reset();
    }
  } );
} );
