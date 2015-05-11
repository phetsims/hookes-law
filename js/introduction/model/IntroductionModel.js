// Copyright 2002-2015, University of Colorado Boulder

/**
 * Model for the "Introduction" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var SingleSpringSystem = require( 'HOOKES_LAW/introduction/model/SingleSpringSystem' );

  /**
   * @constructor
   */
  function IntroductionModel() {

    PropertySet.call( this, {
      numberOfSystems: 1  // {number} 1 or 2
    } );

    this.system1 = new SingleSpringSystem();
    this.system2 = new SingleSpringSystem();
  }

  return inherit( PropertySet, IntroductionModel, {

    // @override
    reset: function() {
      PropertySet.prototype.reset.call( this );
      this.system1.reset();
      this.system2.reset();
    }
  } );
} );