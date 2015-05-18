// Copyright 2002-2015, University of Colorado Boulder

/**
 * Model of a system with 1 spring.
 *
 * F = kx, where:
 *
 * F = applied force, N/m
 * k = spring constant, N/m
 * x = displacement from equilibrium position, m
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
      debugName: 'single',
      left: 0,
      equilibriumLength: 1.5,
      springConstantRange: new Range( 100, 1000, 200 )
    } );

    this.roboticArm = new RoboticArm( {
      left: this.spring.rightProperty.get(),
      right: 3
    } );

    this.spring.leftProperty.lazyLink( function( left ) {
      throw new Error( 'Left end of spring must remain fixed for a single-spring system, left=' + left );
    } );

    this.spring.equilibriumXProperty.lazyLink( function( equilibriumX ) {
      throw new Error( 'Equilibrium position must remain fixed for a single-spring system, equilibriumX=' + equilibriumX );
    } );

    this.spring.rightProperty.link( function( right ) {
      thisSystem.roboticArm.leftProperty.set( right );
    } );

    this.roboticArm.leftProperty.link( function( left ) {
      thisSystem.spring.displacementProperty.set( left - thisSystem.spring.equilibriumXProperty.get() );
    } );
  }

  return inherit( Object, SingleSpringSystem, {

    reset: function() {
      this.spring.reset();
      this.roboticArm.reset();
    }
  } );
} );
