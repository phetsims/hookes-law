// Copyright 2015-2018, University of Colorado Boulder

/**
 * Model of a system with 1 spring, pulled by a robotic arm.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var RoboticArm = require( 'HOOKES_LAW/common/model/RoboticArm' );
  var Spring = require( 'HOOKES_LAW/common/model/Spring' );
  var Util = require( 'DOT/Util' );

  /**
   * @param {Tandem} tandem
   * @param {Object} [springOptions] - options that are passed to Spring
   * @constructor
   */
  function SingleSpringSystem( tandem, springOptions ) {

    var self = this;

    //------------------------------------------------
    // Components of the system

    // @public spring
    this.spring = new Spring( 'singleSpring', _.extend( {}, springOptions, {
      tandem: tandem.createTandem( 'spring' )
    } ) );
    assert && assert( this.spring.displacementProperty.get() === 0 ); // spring is at equilibrium

    // @public arm, left end attached to spring
    this.roboticArm = new RoboticArm( {
      left: this.spring.rightProperty.get(),
      right: this.spring.rightProperty.get() + this.spring.lengthProperty.get(),
      tandem: tandem.createTandem( 'roboticArm' )
    } );

    //------------------------------------------------
    // Property observers

    // Connect arm to spring.
    this.spring.rightProperty.link( function( right ) {
      self.roboticArm.leftProperty.set( right );
    } );

    // Robotic arm sets displacement of spring.
    this.roboticArm.leftProperty.link( function( left ) {
      var displacement = Util.toFixedNumber( left - self.spring.equilibriumXProperty.get(),
        HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES );
      self.spring.displacementProperty.set( displacement );
    } );

    //------------------------------------------------
    // Check for conditions supported by the general Spring model that aren't allowed by this system

    this.spring.leftProperty.lazyLink( function( left ) {
      throw new Error( 'Left end of spring must remain fixed, left=' + left );
    } );

    this.spring.equilibriumXProperty.lazyLink( function( equilibriumX ) {
      throw new Error( 'Equilibrium position must remain fixed, equilibriumX=' + equilibriumX );
    } );
  }

  hookesLaw.register( 'SingleSpringSystem', SingleSpringSystem );

  return inherit( Object, SingleSpringSystem, {

    // @public
    reset: function() {
      this.spring.reset();
      this.roboticArm.reset();
    }
  } );
} );
