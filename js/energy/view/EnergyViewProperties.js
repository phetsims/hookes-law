// Copyright 2015-2020, University of Colorado Boulder

/**
 * View-specific Properties and properties for the "Energy" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import inherit from '../../../../phet-core/js/inherit.js';
import HookesLawQueryParameters from '../../common/HookesLawQueryParameters.js';
import ViewProperties from '../../common/view/ViewProperties.js';
import hookesLaw from '../../hookesLaw.js';

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

export default inherit( ViewProperties, EnergyViewProperties, {

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