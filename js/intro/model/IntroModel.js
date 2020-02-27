// Copyright 2015-2019, University of Colorado Boulder

/**
 * Model for the "Intro" screen, two unrelated single-spring systems.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import RangeWithValue from '../../../../dot/js/RangeWithValue.js';
import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import SingleSpringSystem from '../../common/model/SingleSpringSystem.js';
import hookesLaw from '../../hookesLaw.js';

/**
 * @param {Tandem} tandem
 * @constructor
 */
function IntroModel( tandem ) {

  const springOptions = {
    springConstantRange: new RangeWithValue( 100, 1000, 200 ), // units = N/m
    appliedForceRange: new RangeWithValue( -100, 100, 0 ) // units = N
  };

  // @public
  this.system1 = new SingleSpringSystem( tandem.createTandem( 'system1' ),
    merge( {}, springOptions, { logName: 'spring1' } ) );
  this.system2 = new SingleSpringSystem( tandem.createTandem( 'system2' ),
    merge( {}, springOptions, { logName: 'spring2' } ) );
}

hookesLaw.register( 'IntroModel', IntroModel );

export default inherit( Object, IntroModel, {

  // @public
  reset: function() {
    this.system1.reset();
    this.system2.reset();
  }
} );