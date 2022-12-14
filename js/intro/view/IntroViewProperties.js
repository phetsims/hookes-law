// Copyright 2015-2022, University of Colorado Boulder

/**
 * View-specific properties for the "Intro" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import HookesLawQueryParameters from '../../common/HookesLawQueryParameters.js';
import ViewProperties from '../../common/view/ViewProperties.js';
import hookesLaw from '../../hookesLaw.js';

export default class IntroViewProperties extends ViewProperties {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    super( tandem );

    // @public number of systems visible
    this.numberOfSystemsProperty = new NumberProperty( 1, {
      validValues: [ 1, 2 ],
      tandem: tandem.createTandem( 'numberOfSystemsProperty' )
    } );

    // @public is the spring force vector visible?
    this.springForceVectorVisibleProperty = new BooleanProperty( HookesLawQueryParameters.checkAll, {
      tandem: tandem.createTandem( 'springForceVectorVisibleProperty' )
    } );
  }

  /**
   * @public
   * @override
   */
  reset() {
    this.numberOfSystemsProperty.reset();
    this.springForceVectorVisibleProperty.reset();
    super.reset();
  }
}

hookesLaw.register( 'IntroViewProperties', IntroViewProperties );