// Copyright 2015, University of Colorado Boulder

/**
 * The robotic arm. The left end is movable, the right end is fixed.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function RoboticArm( options ) {

    var self = this;
    
    options = _.extend( {
      left: 0,  // {number} initial x location of the left (movable) end of the arm, units = m
      right: 1 // {number} initial x location of the right (fixed) end of the arm, units = m
    }, options );

    this.right = options.right; // @public right (fixed) end of the arm, read-only

    PropertySet.call( this, {
      left: options.left  // @public left (movable) end of the arm
    }, options );

    // @public
    this.leftProperty.link( function( left ) {
      assert && assert( left < self.right, 'robotic arm is constrained to extend from right to left' );
    } );
  }

  hookesLaw.register( 'RoboticArm', RoboticArm );

  return inherit( PropertySet, RoboticArm );
} );
