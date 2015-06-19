// Copyright 2002-2015, University of Colorado Boulder

/**
 * Model for the "Experimental" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ParametricSpring = require( 'HOOKES_LAW/common/model/ParametricSpring' );
  var Range = require( 'DOT/Range' );

  /**
   * @constructor
   */
  function ExperimentalModel() {
    this.spring = new ParametricSpring( {
      appliedForceRange: new Range( -100, 100, 0 )
    } );
  }

  return inherit( Object, ExperimentalModel, {

    reset: function() {
      this.spring.reset();
    }
  } );
} );
