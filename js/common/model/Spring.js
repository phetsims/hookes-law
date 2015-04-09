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
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

  /**
   * @param {number} springConstant spring constant, units = N/m
   * @constructor
   */
  function Spring( springConstant ) {

    var thisSpring = this;

    PropertySet.call( this, {
      springConstant: springConstant,  // {number} k, spring constant, units = N/m
      appliedForce: 0, // {number} F, force applied to the spring, units = N
      displacement: 0  // {number} x, horizontal displacement from equilibrium position, units = m
    } );

    // {number} horizontal location of equilibrium, units = m, read-only
    this.equilibriumX = 1.2 * ( HookesLawConstants.APPLIED_FORCE_RANGE.max / HookesLawConstants.SPRING_CONSTANT_RANGE.min ); // largest F/k

    // length of the spring, units = m
    this.lengthProperty = new DerivedProperty( [ this.displacementProperty ], function( displacement ) {
      return thisSpring.equilibriumX + displacement;
    } );

    // spring force opposes the applied force, units = N
    this.springForceProperty = new DerivedProperty( [ this.appliedForceProperty ], function( appliedForce ) {
      return -appliedForce;
    } );

    this.springConstantProperty.link( function( springConstant ) {
      thisSpring.displacement = thisSpring.appliedForce / springConstant; // x = F/k
    } );

    this.appliedForceProperty.link( function( appliedForce ) {
      thisSpring.displacement = appliedForce / thisSpring.springConstant; // x = F/k
    } );

    this.displacementProperty.link( function( displacement ) {
      thisSpring.appliedForce = thisSpring.springConstant * displacement; // F = kx
    } );
  }

  return inherit( PropertySet, Spring, {

    // Gets the maximum displacement, x = F/k
    getMaxDisplacement: function() {
      return HookesLawConstants.APPLIED_FORCE_RANGE.max / this.springConstantProperty.get();
    },

    // Gets the minimum displacement, x = F/k
    getMinDisplacement: function() {
      return HookesLawConstants.APPLIED_FORCE_RANGE.min / this.springConstantProperty.get();
    }
  } );
} );
