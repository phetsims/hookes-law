// Copyright 2015-2020, University of Colorado Boulder

/**
 * Base type for view-specific Properties. These are the Properties that are common to all screens.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawQueryParameters from '../HookesLawQueryParameters.js';

class ViewProperties {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    // @public is the applied force vector visible?
    this.appliedForceVectorVisibleProperty = new BooleanProperty( HookesLawQueryParameters.checkAll, {
      tandem: tandem.createTandem( 'appliedForceVectorVisibleProperty' )
    } );

    // @public is the displacement vector visible?
    this.displacementVectorVisibleProperty = new BooleanProperty( HookesLawQueryParameters.checkAll, {
      tandem: tandem.createTandem( 'displacementVectorVisibleProperty' )
    } );

    // @public is the equilibrium position visible?
    this.equilibriumPositionVisibleProperty = new BooleanProperty( HookesLawQueryParameters.checkAll, {
      tandem: tandem.createTandem( 'equilibriumPositionVisibleProperty' )
    } );

    // @public are numeric values visible?
    this.valuesVisibleProperty = new BooleanProperty( HookesLawQueryParameters.checkAll, {
      tandem: tandem.createTandem( 'valuesVisibleProperty' )
    } );
  }

  // @public
  reset() {
    this.appliedForceVectorVisibleProperty.reset();
    this.displacementVectorVisibleProperty.reset();
    this.equilibriumPositionVisibleProperty.reset();
    this.valuesVisibleProperty.reset();
  }
}

hookesLaw.register( 'ViewProperties', ViewProperties );

export default ViewProperties;