// Copyright 2018, University of Colorado Boulder

/**
 * NumberProperty that sets its values only if the new value is sufficiently different from the current value.
 * Used to avoid update cycles that are due to floating point error.
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
  function ToleranceProperty( value, options ) {

    options = _.extend( {
      tolerance: 1e-10
    }, options );

    // @private
    this.tolerance = options.tolerance;

    NumberProperty.call( this, value, options );
  }

  hookesLaw.register( 'ToleranceProperty', ToleranceProperty );

  return inherit( NumberProperty, ToleranceProperty, {

    /**
     * Sets the value if it's difference from the current value exceeds some tolerance.
     * Otherwise the value is not set, silently ignored, and this is a no-op.
     * @param {number} value
     */
    set: function( value ) {
      if ( Math.abs( value - this.get() ) > this.tolerance ) {
        NumberProperty.prototype.set.call( this, value );
      }
    }
  } );
} );