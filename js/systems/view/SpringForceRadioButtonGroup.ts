// Copyright 2020-2023, University of Colorado Boulder

/**
 * SpringForceRadioButtonGroup is the radio button group used to select which vector representation of spring force
 * is display. The choices are 'Total' or 'Components'.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import EnumerationProperty from '../../../../axon/js/EnumerationProperty.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import BracketNode from '../../../../scenery-phet/js/BracketNode.js';
import { HBox, Text, VBox } from '../../../../scenery/js/imports.js';
import AquaRadioButton from '../../../../sun/js/AquaRadioButton.js';
import AquaRadioButtonGroup, { AquaRadioButtonGroupItem, AquaRadioButtonGroupOptions } from '../../../../sun/js/AquaRadioButtonGroup.js';
import HookesLawColors from '../../common/HookesLawColors.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import HookesLawIconFactory from '../../common/view/HookesLawIconFactory.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawStrings from '../../HookesLawStrings.js';
import SpringForceRepresentation from './SpringForceRepresentation.js';
import SystemType from './SystemType.js';

type SelfOptions = EmptySelfOptions;

type SpringForceRadioButtonGroupOptions = SelfOptions &
  PickRequired<AquaRadioButtonGroupOptions, 'tandem' | 'enabledProperty'>;

export default class SpringForceRadioButtonGroup extends AquaRadioButtonGroup<SpringForceRepresentation> {

  public constructor( springForceRepresentationProperty: EnumerationProperty<SpringForceRepresentation>,
                      systemTypeProperty: EnumerationProperty<SystemType>,
                      providedOptions: SpringForceRadioButtonGroupOptions ) {

    const options = optionize<SpringForceRadioButtonGroupOptions, SelfOptions, AquaRadioButtonGroupOptions>()( {

      // AquaRadioButtonGroupOptions
      spacing: 10,
      radioButtonOptions: HookesLawConstants.AQUA_RADIO_BUTTON_OPTIONS
    }, providedOptions );

    // Label for 'Components' radio button
    const componentsIcon1 = HookesLawIconFactory.createForceVectorIcon( {
      fill: HookesLawColors.spring1MiddleColorProperty
    } );
    const componentsIcon2 = HookesLawIconFactory.createForceVectorIcon( {
      fill: HookesLawColors.spring2MiddleColorProperty
    } );
    const componentsIcons = new VBox( {
      children: [ componentsIcon1, componentsIcon2 ],
      spacing: 10
    } );

    const items: AquaRadioButtonGroupItem<SpringForceRepresentation>[] = [
      {
        value: SpringForceRepresentation.TOTAL,
        createNode: tandem => new HBox( {
          children: [
            new Text( HookesLawStrings.totalStringProperty, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
            HookesLawIconFactory.createForceVectorIcon( { fill: HookesLawColors.singleSpringMiddleColorProperty } )
          ],
          spacing: 10
        } ),
        tandemName: `total${AquaRadioButton.TANDEM_NAME_SUFFIX}`
      },
      {
        value: SpringForceRepresentation.COMPONENTS,
        createNode: tandem => new HBox( {
          children: [
            new Text( HookesLawStrings.componentsStringProperty, HookesLawConstants.CONTROL_TEXT_OPTIONS ),
            new BracketNode( {
              orientation: 'left',
              bracketLength: componentsIcons.height
            } ),
            componentsIcons
          ],
          spacing: 10
        } ),
        tandemName: `components${AquaRadioButton.TANDEM_NAME_SUFFIX}`
      }
    ];

    super( springForceRepresentationProperty, items, options );
  }
}

hookesLaw.register( 'SpringForceRadioButtonGroup', SpringForceRadioButtonGroup );