// Copyright 2015-2020, University of Colorado Boulder

/**
 * View-specific Properties and properties for the "Energy" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import HookesLawQueryParameters from '../../common/HookesLawQueryParameters.js';
import ViewProperties from '../../common/view/ViewProperties.js';
import hookesLaw from '../../hookesLaw.js';
import EnergyGraphs from './EnergyGraphs.js';

class EnergyViewProperties extends ViewProperties {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    super( tandem );

    // @public which graph is visible
    this.graphProperty = new EnumerationProperty( EnergyGraphs, EnergyGraphs.BAR_GRAPH, {
      tandem: tandem.createTandem( 'graphProperty' )
    } );

    // @public is energy depicted on the Force plot?
    this.energyOnForcePlotVisibleProperty = new BooleanProperty( HookesLawQueryParameters.checkAll, {
      tandem: tandem.createTandem( 'energyOnForcePlotVisibleProperty' )
    } );
  }

  /**
   * @public
   * @override
   */
  reset() {
    this.graphProperty.reset();
    this.valuesVisibleProperty.reset();
    this.energyOnForcePlotVisibleProperty.reset();
    super.reset();
  }
}

hookesLaw.register( 'EnergyViewProperties', EnergyViewProperties );

export default EnergyViewProperties;