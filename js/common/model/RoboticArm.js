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
  var HookesLawQueryParameters = require( 'HOOKES_LAW/common/HookesLawQueryParameters' );
  var inherit = require( 'PHET_CORE/inherit' );
  var EpsilonProperty = require( 'HOOKES_LAW/common/model/EpsilonProperty' );
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
    // Computation of this Property's value often results in floating-point error that causes update cycles,
    // so use a Property that updates only if the new value is sufficiently different from the current value.
    // See https://github.com/phetsims/hookes-law/issues/52
    this.leftProperty = new EpsilonProperty( options.left, {
      reentrant: HookesLawQueryParameters.reentrant,
      isValidValue: function( value ) { return value < self.right; }
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
