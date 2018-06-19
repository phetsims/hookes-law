// Copyright 2015-2018, University of Colorado Boulder

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
  var NumberProperty = require( 'AXON/NumberProperty' );
  var Tandem = require( 'TANDEM/Tandem' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function RoboticArm( options ) {

    var self = this;

    options = _.extend( {
      left: 0,  // {number} initial x location of the left (movable) end of the arm, units = m
      right: 1, // {number} initial x location of the right (fixed) end of the arm, units = m
      tandem: Tandem.required
    }, options );

    this.right = options.right; // @public right (fixed) end of the arm, read-only

    // @public left (movable) end of the arm, constrained to extend from right to left
    this.leftProperty = new NumberProperty( options.left, {
      isValidValue: function( value ) { return value < self.right; },
      units: 'meters',
      tandem: options.tandem.createTandem( 'leftProperty' ),
      phetioInstanceDocumentation: 'the left (movable) end of the robotic arm.'
    } );

    // log value change
    phet.log && this.leftProperty.link( function( left ) { phet.log( 'RoboticArm left=' + left ); } );
  }

  hookesLaw.register( 'RoboticArm', RoboticArm );

  return inherit( Object, RoboticArm, {

    // @public
    reset: function() {
      this.leftProperty.reset();
    }
  } );
} );
