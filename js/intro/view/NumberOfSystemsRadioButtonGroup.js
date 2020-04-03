// Copyright 2015-2020, University of Colorado Boulder

/**
 * Scene control for the "Intro" screen, switches between 1 and 2 systems.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import RadioButtonGroup from '../../../../sun/js/buttons/RadioButtonGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import HookesLawIconFactory from '../../common/view/HookesLawIconFactory.js';
import hookesLaw from '../../hookesLaw.js';

class NumberOfSystemsRadioButtonGroup extends RadioButtonGroup {

  /**
   * @param {NumberProperty} numberOfSystemsProperty
   * @param {Object} [options]
   */
  constructor( numberOfSystemsProperty, options ) {

    options = merge( {

      // RadioButtonGroup options
      orientation: 'horizontal',
      spacing: 10,
      buttonContentXMargin: 20,
      buttonContentYMargin: 5,
      selectedLineWidth: 2,

      // phet-io
      tandem: Tandem.REQUIRED
    }, options );

    super( numberOfSystemsProperty, [
      { value: 1, node: HookesLawIconFactory.createSingleSpringIcon(), tandemName: 'oneSystemRadioButton' },
      { value: 2, node: HookesLawIconFactory.createTwoSpringsIcon(), tandemName: 'twoSystemsRadioButton' }
    ], options );
  }
}

hookesLaw.register( 'IntroSceneControl', NumberOfSystemsRadioButtonGroup );

export default NumberOfSystemsRadioButtonGroup;