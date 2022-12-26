// Copyright 2015-2022, University of Colorado Boulder

/**
 * View-specific properties for the "Systems" screen.
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
import SpringForceRepresentation from './SpringForceRepresentation.js';
import SystemType from './SystemType.js';

export default class SystemsViewProperties extends ViewProperties {

  // which system is visible
  public readonly systemTypeProperty: EnumerationProperty<SystemType>;

  // is the spring force vector visible?
  public readonly springForceVectorVisibleProperty: Property<boolean>;

  // how spring force is represented
  public readonly springForceRepresentationProperty: EnumerationProperty<SpringForceRepresentation>;

  public constructor( tandem: Tandem ) {

    super( tandem );

    this.systemTypeProperty = new EnumerationProperty( SystemType.PARALLEL, {
      tandem: tandem.createTandem( 'systemTypeProperty' )
    } );

    this.springForceVectorVisibleProperty = new BooleanProperty( HookesLawQueryParameters.checkAll, {
      tandem: tandem.createTandem( 'springForceVectorVisibleProperty' )
    } );

    this.springForceRepresentationProperty = new EnumerationProperty( SpringForceRepresentation.TOTAL, {
      tandem: tandem.createTandem( 'springForceRepresentationProperty' )
    } );
  }

  public override reset(): void {
    this.systemTypeProperty.reset();
    this.springForceVectorVisibleProperty.reset();
    this.springForceRepresentationProperty.reset();
    super.reset();
  }
}

hookesLaw.register( 'SystemsViewProperties', SystemsViewProperties );