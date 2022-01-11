// Copyright 2015-2020, University of Colorado Boulder

/**
 * Scene control for the "Systems" screen, switches between series and parallel systems.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import HookesLawIconFactory from '../../common/view/HookesLawIconFactory.js';
import hookesLaw from '../../hookesLaw.js';
import SystemType from './SystemType.js';

class SystemTypeRadioButtonGroup extends RectangularRadioButtonGroup {

  /**
   * @param {EnumerationDeprecatedProperty.<SystemType>} systemTypeProperty
   * @param {Object} [options]
   */
  constructor( systemTypeProperty, options ) {

    options = merge( {

      // RectangularRadioButtonGroup options
      orientation: 'horizontal',
      spacing: 10,
      buttonContentXMargin: 5,
      buttonContentYMargin: 5,
      selectedLineWidth: 2,

      // phet-io
      tandem: Tandem.REQUIRED
    }, options );

    super( systemTypeProperty, [
      { value: SystemType.PARALLEL, node: HookesLawIconFactory.createParallelSystemIcon(), tandemName: 'parallelRadioButton' },
      { value: SystemType.SERIES, node: HookesLawIconFactory.createSeriesSystemIcon(), tandemName: 'seriesRadioButton' }
    ], options );
  }
}

hookesLaw.register( 'SystemTypeRadioButtonGroup', SystemTypeRadioButtonGroup );

export default SystemTypeRadioButtonGroup;