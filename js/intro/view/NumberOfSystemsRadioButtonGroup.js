// Copyright 2015-2022, University of Colorado Boulder

/**
 * Scene control for the "Intro" screen, switches between 1 and 2 systems.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import HookesLawIconFactory from '../../common/view/HookesLawIconFactory.js';
import hookesLaw from '../../hookesLaw.js';

class NumberOfSystemsRadioButtonGroup extends RectangularRadioButtonGroup {

  /**
   * @param {NumberProperty} numberOfSystemsProperty
   * @param {Object} [options]
   */
  constructor( numberOfSystemsProperty, options ) {

    options = merge( {

      // RectangularRadioButtonGroup options
      orientation: 'horizontal',
      spacing: 10,
      radioButtonOptions: {
        xMargin: 20,
        yMargin: 5,
        buttonAppearanceStrategyOptions: {
          selectedLineWidth: 2
        }
      },

      // phet-io
      tandem: Tandem.REQUIRED
    }, options );

    super( numberOfSystemsProperty, [
      { value: 1, createNode: tandem => HookesLawIconFactory.createSingleSpringIcon(), tandemName: 'oneSystemRadioButton' },
      { value: 2, createNode: tandem => HookesLawIconFactory.createTwoSpringsIcon(), tandemName: 'twoSystemsRadioButton' }
    ], options );
  }
}

hookesLaw.register( 'NumberOfSystemsRadioButtonGroup', NumberOfSystemsRadioButtonGroup );

export default NumberOfSystemsRadioButtonGroup;