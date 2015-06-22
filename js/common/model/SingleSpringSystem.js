// Copyright 2002-2015, University of Colorado Boulder

/**
 * Model of a system with 1 spring, pulled by a robotic arm.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Spring = require( 'HOOKES_LAW/common/model/Spring' );
  var RoboticArm = require( 'HOOKES_LAW/common/model/RoboticArm' );

  /**
   * @param {Object} [springOptions] - options that are passed to Spring
   * @constructor
   */
  function SingleSpringSystem( springOptions ) {

    // Components of the system -----------------------------------------------------

    // spring
    this.spring = new Spring( springOptions );

    // arm, left end attached to spring
    this.roboticArm = new RoboticArm( {
      left: this.spring.rightProperty.get(),
      right: 3
    } );

    // Property observers -----------------------------------------------------------

    var thisSystem = this;

    // Connect arm to spring.
    this.spring.rightProperty.link( function( right ) {
      thisSystem.roboticArm.leftProperty.set( right );
    } );

    // Robotic arm sets displacement of spring.
    this.roboticArm.leftProperty.link( function( left ) {
      thisSystem.spring.displacementProperty.set( left - thisSystem.spring.equilibriumXProperty.get() );
    } );

    // Check for violations of the general Spring model ------------------------------

    this.spring.leftProperty.lazyLink( function( left ) {
      throw new Error( 'Left end of spring must remain fixed, left=' + left );
    } );

    this.spring.equilibriumXProperty.lazyLink( function( equilibriumX ) {
      throw new Error( 'Equilibrium position must remain fixed, equilibriumX=' + equilibriumX );
    } );
  }

  return inherit( Object, SingleSpringSystem, {

    reset: function() {
      this.spring.reset();
      this.roboticArm.reset();
    }
  } );
} );
