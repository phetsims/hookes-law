// Copyright 2015-2022, University of Colorado Boulder

/**
 * Base class for view-specific Properties. These are the Properties that are common to all screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import Property from '../../../../axon/js/Property.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawQueryParameters from '../HookesLawQueryParameters.js';

export default class ViewProperties {

  // is the applied force vector visible?
  public readonly appliedForceVectorVisibleProperty: Property<boolean>;

  // is the displacement vector visible?
  public readonly displacementVectorVisibleProperty: Property<boolean>;

  // is the equilibrium position visible?
  public readonly equilibriumPositionVisibleProperty: Property<boolean>;

  // are numeric values visible?
  public readonly valuesVisibleProperty: Property<boolean>;

  protected constructor( tandem: Tandem ) {

    this.appliedForceVectorVisibleProperty = new BooleanProperty( HookesLawQueryParameters.checkAll, {
      tandem: tandem.createTandem( 'appliedForceVectorVisibleProperty' )
    } );

    this.displacementVectorVisibleProperty = new BooleanProperty( HookesLawQueryParameters.checkAll, {
      tandem: tandem.createTandem( 'displacementVectorVisibleProperty' )
    } );

    this.equilibriumPositionVisibleProperty = new BooleanProperty( HookesLawQueryParameters.checkAll, {
      tandem: tandem.createTandem( 'equilibriumPositionVisibleProperty' )
    } );

    this.valuesVisibleProperty = new BooleanProperty( HookesLawQueryParameters.checkAll, {
      tandem: tandem.createTandem( 'valuesVisibleProperty' )
    } );
  }

  public reset(): void {
    this.appliedForceVectorVisibleProperty.reset();
    this.displacementVectorVisibleProperty.reset();
    this.equilibriumPositionVisibleProperty.reset();
    this.valuesVisibleProperty.reset();
  }
}

hookesLaw.register( 'ViewProperties', ViewProperties );