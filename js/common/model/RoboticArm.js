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

    // @public (read-only) right (fixed) end of the arm
    this.right = options.right;

    // @public left (movable) end of the arm
    this.leftProperty = new NumberProperty( options.left, {

      // The left end of the robotic arm and the spring's displacement (x) participate in a 2-way relationship,
      // where changing one of them results in recalculation of the other.  For some values, this results in
      // floating-point error that causes reentrant behavior.  See #63.
      reentrant: true,
      isValidValue: function( value ) { return value < self.right; },
      tandem: options.tandem.createTandem( 'leftProperty' ),
      phetioStudioControl: false // because the range is dynamic
    } );
    phet.log && this.leftProperty.link( function( left ) { phet.log( 'roboticArm left=' + left ); } );
  }

  hookesLaw.register( 'RoboticArm', RoboticArm );

  return inherit( Object, RoboticArm, {

    // @public
    reset: function() {
      this.leftProperty.reset();
    }
  } );
} );
