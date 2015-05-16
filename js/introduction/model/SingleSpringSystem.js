// Copyright 2002-2015, University of Colorado Boulder

/**
 * Model of a system with 1 spring.
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
  function SingleSpringSystem() {

    var thisSystem = this;

    this.spring = new Spring( {
      left: 0,
      equilibriumLength: 1.5,
      springConstantRange: new Range( 100, 1000, 200 ) // units = N/m
    } );

    this.roboticArm = new RoboticArm( {
      left: this.spring.right,
      right: 3
    } );

    this.spring.rightProperty.link( function( right ) {
      thisSystem.roboticArm.left = right;
    } );

    this.roboticArm.leftProperty.link( function( left ) {
      thisSystem.spring.right = left;
    } );
  }

  return inherit( Object, SingleSpringSystem, {

    reset: function() {
      this.spring.reset();
      this.roboticArm.reset();
    }
  } );
} );
