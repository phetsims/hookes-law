// Copyright 2002-2015, University of Colorado Boulder

/**
 * Model of a spring.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

  /**
   * @constructor
   */
  function Spring( springConstant ) {

    var thisSpring = this;

    PropertySet.call( this, {
      springConstant: springConstant,  // {number} spring constant, units = N/m
      appliedForce: 0, // {number} force applied to the spring, units = N
      displacement: 0  // {number} horizontal displacement from equilibrium, units = m
    } );

    this.equilibriumPosition = 0.5; // {number} horizontal location of equilibrium, units = m, read-only

    // length of the spring, units = m
    this.lengthProperty = new DerivedProperty( [ this.displacementProperty ], function( displacement ) {
      return thisSpring.equilibriumPosition + displacement;
    } );

    // force applied by the spring, opposes the applied force, units = N
    this.springForceProperty = new DerivedProperty( [ this.appliedForceProperty ], function( appliedForce ) {
      return -appliedForce;
    } );

    this.springConstantProperty.link( function( springConstant ) {
      thisSpring.displacement = thisSpring.appliedForce / springConstant; // x = F/k
    } );

    this.appliedForceProperty.link( function( appliedForce ) {
      thisSpring.displacement = appliedForce / thisSpring.springConstant; // x = F/k
    });
  }

  return inherit( PropertySet, Spring );
} );
