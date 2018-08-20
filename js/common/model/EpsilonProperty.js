// Copyright 2018, University of Colorado Boulder

/**
 * EpsilonProperty sets its numeric value only if the new value is sufficiently different from the current value.
 * Used to avoid update cycles that are due to floating-point error.
 * See https://github.com/phetsims/hookes-law/issues/52
 * 
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberProperty = require( 'AXON/NumberProperty' );

  /**
   * @param {number} value
   * @param {Object} options
   * @constructor
   */
  function EpsilonProperty( value, options ) {

    options = _.extend( {
      epsilon: 1e-10
    }, options );

    // @private
    this.epsilon = options.epsilon;

    NumberProperty.call( this, value, options );
  }

  hookesLaw.register( 'EpsilonProperty', EpsilonProperty );

  return inherit( NumberProperty, EpsilonProperty, {

    /**
     * Sets the value if it's difference from the current value exceeds some epsilon.
     * Otherwise the value is not set, silently ignored, and this is a no-op.
     * @param {number} value
     */
    set: function( value ) {
      if ( Math.abs( value - this.get() ) > this.epsilon ) {
        NumberProperty.prototype.set.call( this, value );
      }
    }
  } );
} );