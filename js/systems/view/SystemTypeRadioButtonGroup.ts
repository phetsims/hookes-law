// Copyright 2015-2024, University of Colorado Boulder

/**
 * Scene control for the "Systems" screen, switches between series and parallel systems.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import RectangularRadioButtonGroup, { RectangularRadioButtonGroupItem } from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import HookesLawIconFactory from '../../common/view/HookesLawIconFactory.js';
import hookesLaw from '../../hookesLaw.js';
import SystemType from './SystemType.js';

export default class SystemTypeRadioButtonGroup extends RectangularRadioButtonGroup<SystemType> {

  public constructor( systemTypeProperty: EnumerationProperty<SystemType>, tandem: Tandem ) {

    const items: RectangularRadioButtonGroupItem<SystemType>[] = [
      {
        value: SystemType.PARALLEL,
        createNode: () => HookesLawIconFactory.createParallelSystemIcon(),
        tandemName: 'parallelRadioButton'
      },
      {
        value: SystemType.SERIES,
        createNode: () => HookesLawIconFactory.createSeriesSystemIcon(),
        tandemName: 'seriesRadioButton'
      }
    ];

    super( systemTypeProperty, items, {
      orientation: 'horizontal',
      spacing: 10,
      radioButtonOptions: {
        xMargin: 5,
        yMargin: 5,
        buttonAppearanceStrategyOptions: {
          selectedLineWidth: 2
        }
      },
      tandem: tandem
    } );
  }
}

hookesLaw.register( 'SystemTypeRadioButtonGroup', SystemTypeRadioButtonGroup );