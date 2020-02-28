// Copyright 2015-2020, University of Colorado Boulder

/**
 * View-specific properties for the "Intro" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import BooleanProperty from '../../../../axon/js/BooleanProperty.js';
import NumberProperty from '../../../../axon/js/NumberProperty.js';
import inherit from '../../../../phet-core/js/inherit.js';
import HookesLawQueryParameters from '../../common/HookesLawQueryParameters.js';
import ViewProperties from '../../common/view/ViewProperties.js';
import hookesLaw from '../../hookesLaw.js';

/**
 * @param {Tandem} tandem
 * @constructor
 */
function IntroViewProperties( tandem ) {

  ViewProperties.call( this, tandem );

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

hookesLaw.register( 'IntroViewProperties', IntroViewProperties );

export default inherit( ViewProperties, IntroViewProperties, {

  /**
   * @public
   * @override
   */
  reset: function() {
    this.numberOfSystemsProperty.reset();
    this.springForceVectorVisibleProperty.reset();
    ViewProperties.prototype.reset.call( this );
  }
} );