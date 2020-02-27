// Copyright 2015-2019, University of Colorado Boulder

/**
 * Scene control for the "Systems" screen, switches between series and parallel systems.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import RadioButtonGroup from '../../../../sun/js/buttons/RadioButtonGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import HookesLawIconFactory from '../../common/view/HookesLawIconFactory.js';
import hookesLaw from '../../hookesLaw.js';

/**
 * @param {StringProperty} seriesParallelProperty - switches between 2 systems, 'series'|'parallel'
 * @param {Object} [options]
 * @constructor
 */
function SystemsSceneControl( seriesParallelProperty, options ) {

  options = merge( {

    // RadioButtonGroup options
    orientation: 'horizontal',
    spacing: 10,
    buttonContentXMargin: 5,
    buttonContentYMargin: 5,
    selectedLineWidth: 2,

    // phet-io
    tandem: Tandem.REQUIRED
  }, options );

  RadioButtonGroup.call( this, seriesParallelProperty, [
    { value: 'parallel', node: HookesLawIconFactory.createParallelSystemIcon(), tandemName: 'parallelRadioButton' },
    { value: 'series', node: HookesLawIconFactory.createSeriesSystemIcon(), tandemName: 'seriesRadioButton' }
  ], options );
}

hookesLaw.register( 'SystemsSceneControl', SystemsSceneControl );

inherit( RadioButtonGroup, SystemsSceneControl );
export default SystemsSceneControl;