// Copyright 2015-2018, University of Colorado Boulder

/**
 * View-specific properties for the "Energy" screen.
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
  var ViewProperties = require( 'HOOKES_LAW/common/view/ViewProperties' );

  /**
   * @constructor
   */
  function EnergyViewProperties() {

    ViewProperties.call( this );

    // @public which graph is visible
    this.graphProperty = new StringProperty( 'energyBar', {
      validValues: [ 'energyBar', 'energyXY', 'forceXY' ]
    } );

    // @public is energy depicted on the Force plot?
    this.energyOnForcePlotVisibleProperty = new BooleanProperty( HookesLawQueryParameters.checkAll );
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
