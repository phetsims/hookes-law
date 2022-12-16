// Copyright 2015-2022, University of Colorado Boulder

/**
 * Model for the "Intro" screen, two unrelated single-spring systems.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import RangeWithValue from '../../../../dot/js/RangeWithValue.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import SingleSpringSystem from '../../common/model/SingleSpringSystem.js';
import hookesLaw from '../../hookesLaw.js';
import { SpringOptions } from '../../common/model/Spring.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import TModel from '../../../../joist/js/TModel.js';

export default class IntroModel implements TModel {

  public readonly system1: SingleSpringSystem;
  public readonly system2: SingleSpringSystem;

  public constructor( tandem: Tandem ) {

    const springOptions = {
      springConstantRange: new RangeWithValue( 100, 1000, 200 ), // units = N/m
      appliedForceRange: new RangeWithValue( -100, 100, 0 ) // units = N
    };

    this.system1 = new SingleSpringSystem( {
      springOptions: combineOptions<SpringOptions>( {
        logName: 'spring1'
      }, springOptions ),
      tandem: tandem.createTandem( 'system1' )
    } );

    this.system2 = new SingleSpringSystem( {
      springOptions: combineOptions<SpringOptions>( {
        logName: 'spring2'
      }, springOptions ),
      tandem: tandem.createTandem( 'system2' )
    } );
  }

  public reset(): void {
    this.system1.reset();
    this.system2.reset();
  }
}

hookesLaw.register( 'IntroModel', IntroModel );