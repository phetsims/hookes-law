// Copyright 2022-2024, University of Colorado Boulder

/**
 * EnergyCheckboxOptions is 'Energy' check box in the control panel on the 'Energy' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import { Shape } from '../../../../kite/js/imports.js';
import { EmptySelfOptions, optionize3 } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { HBox, Path, Text } from '../../../../scenery/js/imports.js';
import Checkbox, { CheckboxOptions } from '../../../../sun/js/Checkbox.js';
import HookesLawColors from '../../common/HookesLawColors.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawStrings from '../../HookesLawStrings.js';

type SelfOptions = EmptySelfOptions;

type EnergyCheckboxOptions = SelfOptions & PickRequired<CheckboxOptions, 'tandem' | 'visibleProperty' | 'enabledProperty' | 'layoutOptions'>;

export default class EnergyCheckbox extends Checkbox {

  public constructor( energyOnForcePlotVisibleProperty: Property<boolean>, providedOptions: EnergyCheckboxOptions ) {

    const options = optionize3<EnergyCheckboxOptions, SelfOptions, CheckboxOptions>()(
      {}, HookesLawConstants.CHECKBOX_OPTIONS, providedOptions );

    const text = new Text( HookesLawStrings.energyStringProperty, {
      font: HookesLawConstants.CONTROL_TEXT_FONT,
      maxWidth: 80
    } );

    // triangle
    const icon = new Path( new Shape().moveTo( 0, 0 ).lineTo( 20, 0 ).lineTo( 20, -10 ).close(), {
      fill: HookesLawColors.energyColorProperty
    } );

    const content = new HBox( {
      children: [ text, icon ],
      spacing: 6,
      justify: 'left' // constant space between text and icon
    } );

    super( energyOnForcePlotVisibleProperty, content, options );
  }
}

hookesLaw.register( 'EnergyCheckbox', EnergyCheckbox );