// Copyright 2002-2015, University of Colorado Boulder

/**
 * The robotic arm. The left end is movable, the right end is fixed.
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

    var thisArm = this;

    options = _.extend( {
      left: 0,  // {number} initial x location of the left (movable) end of the arm, units = m
      right: 1 // {number} initial x location of the right (fixed) end of the arm, units = m
    }, options );

    this.right = options.right; // right (fixed) end of the arm, read-only

    PropertySet.call( this, {
      left: options.left
    }, options );

    this.leftProperty.link( function( left ) {
      assert && assert( left < thisArm.right, 'robotic arm is constrained to extend from right to left' );
    } );
  }

  return inherit( PropertySet, RoboticArm );
} );
