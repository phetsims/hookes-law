// Copyright 2015-2020, University of Colorado Boulder

/**
 * View-specific properties for the "Systems" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import HookesLawQueryParameters from '../../common/HookesLawQueryParameters.js';
import ViewProperties from '../../common/view/ViewProperties.js';
import hookesLaw from '../../hookesLaw.js';
import SystemType from './SystemType.js';

class SystemsViewProperties extends ViewProperties {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    super( tandem );

    // @public which system is visible
    this.systemTypeProperty = new EnumerationProperty( SystemType, SystemType.PARALLEL, {
      tandem: tandem.createTandem( 'systemTypeProperty' )
    } );

    // @public is the spring force vector visible?
    this.springForceVectorVisibleProperty = new BooleanProperty( HookesLawQueryParameters.checkAll, {
      tandem: tandem.createTandem( 'springForceVectorVisibleProperty' )
    } );

    // @public how spring force is represented
    this.springForceRepresentationProperty = new StringProperty( 'total', {
      validValues: [ 'total', 'components' ],
      tandem: tandem.createTandem( 'springForceRepresentationProperty' )
    } );
  }

  /**
   * @public
   * @override
   */
  reset() {
    this.systemTypeProperty.reset();
    this.springForceVectorVisibleProperty.reset();
    this.springForceRepresentationProperty.reset();
    super.reset();
  }
}

hookesLaw.register( 'SystemsViewProperties', SystemsViewProperties );

export default SystemsViewProperties;