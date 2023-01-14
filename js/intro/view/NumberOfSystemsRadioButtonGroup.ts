// Copyright 2015-2023, University of Colorado Boulder

/**
 * Scene control for the "Intro" screen, switches between 1 and 2 systems.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import RectangularRadioButton from '../../../../sun/js/buttons/RectangularRadioButton.js';
import RectangularRadioButtonGroup, { RectangularRadioButtonGroupItem } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import HookesLawIconFactory from '../../common/view/HookesLawIconFactory.js';
import hookesLaw from '../../hookesLaw.js';

export default class NumberOfSystemsRadioButtonGroup extends RectangularRadioButtonGroup<number> {

  public constructor( numberOfSystemsProperty: Property<number>, tandem: Tandem ) {

    const items: RectangularRadioButtonGroupItem<number>[] = [
      {
        value: 1,
        createNode: () => HookesLawIconFactory.createSingleSpringIcon(),
        tandemName: `oneSystem${RectangularRadioButton.TANDEM_NAME_SUFFIX}`
      },
      {
        value: 2,
        createNode: () => HookesLawIconFactory.createTwoSpringsIcon(),
        tandemName: `twoSystems${RectangularRadioButton.TANDEM_NAME_SUFFIX}`
      }
    ];

    super( numberOfSystemsProperty, items, {
      orientation: 'horizontal',
      spacing: 10,
      radioButtonOptions: {
        xMargin: 20,
        yMargin: 5,
        buttonAppearanceStrategyOptions: {
          selectedLineWidth: 2
        }
      },
      tandem: tandem
    } );
  }
}

hookesLaw.register( 'NumberOfSystemsRadioButtonGroup', NumberOfSystemsRadioButtonGroup );