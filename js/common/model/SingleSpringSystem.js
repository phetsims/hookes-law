// Copyright 2015-2019, University of Colorado Boulder

/**
 * Model of a system with 1 spring, pulled by a robotic arm.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import hookesLaw from '../../hookesLaw.js';
import RoboticArm from './RoboticArm.js';
import Spring from './Spring.js';

/**
 * @param {Tandem} tandem
 * @param {Object} [springOptions] - options that are passed to Spring
 * @constructor
 */
function SingleSpringSystem( tandem, springOptions ) {

  const self = this;

  //------------------------------------------------
  // Components of the system

  // @public spring
  this.spring = new Spring( merge( {}, springOptions, {
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
    self.spring.displacementProperty.set( left - self.spring.equilibriumXProperty.get() );
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

export default inherit( Object, SingleSpringSystem, {

  // @public
  reset: function() {
    this.spring.reset();
    this.roboticArm.reset();
  }
} );