// Copyright 2022-2023, University of Colorado Boulder

/**
 * EnergyGraphRadioButtonGroup is the radio button group that appears in the 'Energy' screen, for choosing
 * which energy graph to view.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import EnergyGraph from './EnergyGraph.js';
import hookesLaw from '../../hookesLaw.js';
import AquaRadioButtonGroup, { AquaRadioButtonGroupItem, AquaRadioButtonGroupOptions } from '../../../../sun/js/AquaRadioButtonGroup.js';
import HookesLawStrings from '../../HookesLawStrings.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import { Text } from '../../../../scenery/js/imports.js';
import Property from '../../../../axon/js/Property.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';

type SelfOptions = EmptySelfOptions;

type EnergyGraphRadioButtonGroupOptions = SelfOptions &
  PickOptional<AquaRadioButtonGroupOptions, 'spacing'> &
  PickRequired<AquaRadioButtonGroupOptions, 'tandem'>;

export default class EnergyGraphRadioButtonGroup extends AquaRadioButtonGroup<EnergyGraph> {

  public constructor( graphProperty: Property<EnergyGraph>, providedOptions: EnergyGraphRadioButtonGroupOptions ) {

    const options = optionize<EnergyGraphRadioButtonGroupOptions, SelfOptions, AquaRadioButtonGroupOptions>()( {
      radioButtonOptions: HookesLawConstants.AQUA_RADIO_BUTTON_OPTIONS
    }, providedOptions );

    const items: AquaRadioButtonGroupItem<EnergyGraph>[] = [
      {
        value: EnergyGraph.BAR_GRAPH,
        createNode: () => new Text( HookesLawStrings.barGraphStringProperty, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
        tandemName: 'barGraphRadioButton'
      },
      {
        value: EnergyGraph.ENERGY_PLOT,
        createNode: () => new Text( HookesLawStrings.energyPlotStringProperty, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
        tandemName: 'energyPlotRadioButton'
      },
      {
        value: EnergyGraph.FORCE_PLOT,
        createNode: () => new Text( HookesLawStrings.forcePlotStringProperty, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
        tandemName: 'forcePlotRadioButton'
      }
    ];

    super( graphProperty, items, options );
  }
}

hookesLaw.register( 'EnergyGraphRadioButtonGroup', EnergyGraphRadioButtonGroup );