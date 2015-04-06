// Copyright 2002-2015, University of Colorado Boulder

/**
 * Model of a spring.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

  /**
   * @constructor
   */
  function Spring( springConstant ) {

    PropertySet.call( this, {
      springConstant: springConstant,  // {number} spring constant, units = N/m
      displacement: 0,  // {number} horizontal displacement from equilibrium, units = m
      appliedForce: 0, // {number} force applied to the spring, units = N
      springForce: 0 // {number} force applied by the spring, units = N
    } );

    //TODO is this derived from other things?
    this.equilibriumPosition = 10; // {number} horizontal location of equilibrium, units = m
  }

  return inherit( PropertySet, Spring, {
    //TODO
  } );
} );
