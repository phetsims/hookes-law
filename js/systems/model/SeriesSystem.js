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

    this.spring1 = new Spring( {
      left: 0,
      equilibriumLength: 1,
      springConstantRange: new Range( 200, 600, 200 ) // units = N/m
    } );

    this.spring2 = new Spring( {
      left: this.spring1.right,
      equilibriumLength: this.spring1.equilibriumLength,
      springConstantRange: this.spring1.springConstantRange // units = N/m
    } );

    this.roboticArm = new RoboticArm( {
      left: this.spring2.right,
      right: 3
    } );

    this.spring1.rightProperty.link( function( right ) {
      thisSystem.spring2.leftProperty.set( right );
    } );

    this.spring2.leftProperty.link( function( left ) {
      thisSystem.spring1.right = left;
    } );

    this.roboticArm.leftProperty.link( function( left ) {
      thisSystem.spring2.right = left;
    } );
  }

  return inherit( Object, SeriesSystem, {

    reset: function() {
      this.spring1.reset();
      this.spring2.reset();
      this.roboticArm.reset();
    }
  } );
} );
