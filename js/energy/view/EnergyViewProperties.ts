// Copyright 2015-2022, University of Colorado Boulder

/**
 * View-specific Properties and properties for the "Energy" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import Property from '../../../../axon/js/Property.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import HookesLawQueryParameters from '../../common/HookesLawQueryParameters.js';
import ViewProperties from '../../common/view/ViewProperties.js';
import hookesLaw from '../../hookesLaw.js';
import EnergyGraph from './EnergyGraph.js';

export default class EnergyViewProperties extends ViewProperties {

  // which energy graph is visible
  public readonly graphProperty: EnumerationProperty<EnergyGraph>;

  // is energy depicted on the Force plot?
  public readonly energyOnForcePlotVisibleProperty: Property<boolean>;

  public constructor( tandem: Tandem ) {

    super( tandem );

    this.graphProperty = new EnumerationProperty( EnergyGraph.BAR_GRAPH, {
      tandem: tandem.createTandem( 'graphProperty' )
    } );

    this.energyOnForcePlotVisibleProperty = new BooleanProperty( HookesLawQueryParameters.checkAll, {
      tandem: tandem.createTandem( 'energyOnForcePlotVisibleProperty' )
    } );
  }

  public override reset(): void {
    this.graphProperty.reset();
    this.valuesVisibleProperty.reset();
    this.energyOnForcePlotVisibleProperty.reset();
    super.reset();
  }
}

hookesLaw.register( 'EnergyViewProperties', EnergyViewProperties );