// Copyright 2015-2016, University of Colorado Boulder

/**
 * Properties that are specific to visibility of things in the "Energy" view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  var HookesLawQueryParameters = require( 'HOOKES_LAW/common/HookesLawQueryParameters' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );

  /**
   * @constructor
   */
  function EnergyViewProperties() {

    // to make development easier
    var checked = HookesLawQueryParameters.dev;

    // @public {string} which graph is visible, 'energyBar'|'energyXY'|'forceXY'
    this.graphProperty = new Property( 'energyBar' );

    // @public {boolean} is the applied force vector visible?
    this.appliedForceVectorVisibleProperty = new Property( checked );

    // @public {boolean} is the displacement vector visible?
    this.displacementVectorVisibleProperty = new Property( checked );

    // @public {boolean} is the equilibrium position visible?
    this.equilibriumPositionVisibleProperty = new Property( checked );

    // @public {boolean} are numeric values visible?
    this.valuesVisibleProperty = new Property( checked );

    // @public {boolean} is energy depicted on the Force plot?
    this.energyOnForcePlotVisibleProperty = new Property( checked );
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
