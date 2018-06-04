// Copyright 2015-2016, University of Colorado Boulder

/**
 * Properties that are specific to visibility of things in the "Energy" view.
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
  var StringProperty = require( 'AXON/StringProperty' );

  /**
   * @constructor
   */
  function EnergyViewProperties() {

    // check all Checkboxes, to make development easier
    var checked = HookesLawQueryParameters.checkAll;

    // @public which graph is visible
    this.graphProperty = new StringProperty( 'energyBar', {
      validValues: [ 'energyBar', 'energyXY', 'forceXY' ]
    } );

    // @public is the applied force vector visible?
    this.appliedForceVectorVisibleProperty = new BooleanProperty( checked );

    // @public is the displacement vector visible?
    this.displacementVectorVisibleProperty = new BooleanProperty( checked );

    // @public is the equilibrium position visible?
    this.equilibriumPositionVisibleProperty = new BooleanProperty( checked );

    // @public are numeric values visible?
    this.valuesVisibleProperty = new BooleanProperty( checked );

    // @public is energy depicted on the Force plot?
    this.energyOnForcePlotVisibleProperty = new BooleanProperty( checked );
  }

  hookesLaw.register( 'EnergyViewProperties', EnergyViewProperties );

  return inherit( Object, EnergyViewProperties, {

    // @public
    reset: function() {
      this.graphProperty.reset();
      this.appliedForceVectorVisibleProperty.reset();
      this.displacementVectorVisibleProperty.reset();
      this.equilibriumPositionVisibleProperty.reset();
      this.valuesVisibleProperty.reset();
      this.energyOnForcePlotVisibleProperty.reset();
    }
  } );
} );
