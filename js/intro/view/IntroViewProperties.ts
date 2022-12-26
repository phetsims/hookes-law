// Copyright 2015-2022, University of Colorado Boulder

/**
 * View-specific properties for the "Intro" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import Property from '../../../../axon/js/Property.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import HookesLawQueryParameters from '../../common/HookesLawQueryParameters.js';
import ViewProperties from '../../common/view/ViewProperties.js';
import hookesLaw from '../../hookesLaw.js';

export default class IntroViewProperties extends ViewProperties {

  // number of systems visible
  public readonly numberOfSystemsProperty: Property<number>;

  // is the spring force vector visible?
  public readonly springForceVectorVisibleProperty: Property<boolean>;

  public constructor( tandem: Tandem ) {

    super( tandem );

    this.numberOfSystemsProperty = new NumberProperty( 1, {
      validValues: [ 1, 2 ],
      tandem: tandem.createTandem( 'numberOfSystemsProperty' )
    } );

    this.springForceVectorVisibleProperty = new BooleanProperty( HookesLawQueryParameters.checkAll, {
      tandem: tandem.createTandem( 'springForceVectorVisibleProperty' )
    } );
  }

  public override reset(): void {
    this.numberOfSystemsProperty.reset();
    this.springForceVectorVisibleProperty.reset();
    super.reset();
  }
}

hookesLaw.register( 'IntroViewProperties', IntroViewProperties );