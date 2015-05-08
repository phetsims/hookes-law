// Copyright 2002-2015, University of Colorado Boulder

/**
 * The robotic arm.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function RoboticArm( options ) {

    options = _.extend( {
      x: 0, // {number} initial x location of the fixed end of the arm, units = m
      length: 1  // {number} distance from the fixed end of the arm to the tip of the hook, units = m
    }, options );

    this.x = options.x; // read-only

    PropertySet.call( this, {
      length: options.length
    } );
  }

  return inherit( PropertySet, RoboticArm );
} );
