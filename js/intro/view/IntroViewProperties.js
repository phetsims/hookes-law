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

  /**
   * @constructor
   */
  function IntroViewProperties() {

    // check all Checkboxes, to make development easier
    var checked = HookesLawQueryParameters.checkAll;

    // @public number of systems visible
    this.numberOfSystemsProperty = new NumberProperty( 1, {
      validValues: [ 1, 2 ]
    } );

    // @public is the applied force vector visible?
    this.appliedForceVectorVisibleProperty = new BooleanProperty( checked );

    // @public is the spring force vector visible?
    this.springForceVectorVisibleProperty = new BooleanProperty( checked );

    // @public is the displacement vector visible?
    this.displacementVectorVisibleProperty = new BooleanProperty( checked );

    // @public is the equilibrium position visible?
    this.equilibriumPositionVisibleProperty = new BooleanProperty( checked );

    // @public are numeric values visible?
    this.valuesVisibleProperty = new BooleanProperty( checked );
  }

  hookesLaw.register( 'IntroViewProperties', IntroViewProperties );

  return inherit( Object, IntroViewProperties, {

    // @public
    reset: function() {
      this.numberOfSystemsProperty.reset();
      this.appliedForceVectorVisibleProperty.reset();
      this.springForceVectorVisibleProperty.reset();
      this.displacementVectorVisibleProperty.reset();
      this.equilibriumPositionVisibleProperty.reset();
      this.valuesVisibleProperty.reset();
    }
  } );
} );
