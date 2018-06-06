// Copyright 2015-2018, University of Colorado Boulder

/**
 * View-specific properties for the "Intro" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var BooleanProperty = require( 'AXON/BooleanProperty' );
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  var HookesLawQueryParameters = require( 'HOOKES_LAW/common/HookesLawQueryParameters' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberProperty = require( 'AXON/NumberProperty' );
  var ViewProperties = require( 'HOOKES_LAW/common/view/ViewProperties' );

  /**
   * @constructor
   */
  function IntroViewProperties() {

    // @public number of systems visible
    this.numberOfSystemsProperty = new NumberProperty( 1, {
      validValues: [ 1, 2 ]
    } );

    // @public is the spring force vector visible?
    this.springForceVectorVisibleProperty = new BooleanProperty( HookesLawQueryParameters.checkAll );

    ViewProperties.call( this );
  }

  hookesLaw.register( 'IntroViewProperties', IntroViewProperties );

  return inherit( ViewProperties, IntroViewProperties, {

    // @public
    reset: function() {
      this.numberOfSystemsProperty.reset();
      this.springForceVectorVisibleProperty.reset();
      ViewProperties.prototype.reset.call( this );
    }
  } );
} );
