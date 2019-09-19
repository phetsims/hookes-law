// Copyright 2015-2018, University of Colorado Boulder

/**
 * View-specific Properties and properties for the "Energy" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const BooleanProperty = require( 'AXON/BooleanProperty' );
  const hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  const HookesLawQueryParameters = require( 'HOOKES_LAW/common/HookesLawQueryParameters' );
  const inherit = require( 'PHET_CORE/inherit' );
  const StringProperty = require( 'AXON/StringProperty' );
  const ViewProperties = require( 'HOOKES_LAW/common/view/ViewProperties' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function EnergyViewProperties( tandem ) {

    ViewProperties.call( this, tandem );

    // @public which graph is visible
    this.graphProperty = new StringProperty( 'barGraph', {
      validValues: [ 'barGraph', 'energyPlot', 'forcePlot' ],
      tandem: tandem.createTandem( 'graphProperty' )
    } );

    // @public is energy depicted on the Force plot?
    this.energyOnForcePlotVisibleProperty = new BooleanProperty( HookesLawQueryParameters.checkAll, {
      tandem: tandem.createTandem( 'energyOnForcePlotVisibleProperty' )
    } );
  }

  hookesLaw.register( 'EnergyViewProperties', EnergyViewProperties );

  return inherit( ViewProperties, EnergyViewProperties, {

    /**
     * @public
     * @override
     */
    reset: function() {
      this.graphProperty.reset();
      this.valuesVisibleProperty.reset();
      this.energyOnForcePlotVisibleProperty.reset();
      ViewProperties.prototype.reset.call( this );
    }
  } );
} );
