// Copyright 2022, University of Colorado Boulder

/**
 * EnergyCheckboxOptions is 'Energy' check box in the control panel on the 'Energy' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawStrings from '../../HookesLawStrings.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import HookesLawColors from '../../common/HookesLawColors.js';
import Checkbox, { CheckboxOptions } from '../../../../sun/js/Checkbox.js';
import { combineOptions, EmptySelfOptions, optionize3 } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { HBox, Path, Text, TextOptions } from '../../../../scenery/js/imports.js';
import { Shape } from '../../../../kite/js/imports.js';

type SelfOptions = EmptySelfOptions;

type EnergyCheckboxOptions = SelfOptions & PickRequired<CheckboxOptions, 'tandem' | 'enabledProperty'>;

export default class EnergyCheckbox extends Checkbox {

  public constructor( energyOnForcePlotVisibleProperty: Property<boolean>, providedOptions: EnergyCheckboxOptions ) {

    const options = optionize3<EnergyCheckboxOptions, SelfOptions, CheckboxOptions>()(
      {}, HookesLawConstants.CHECKBOX_OPTIONS, providedOptions );

    const text = new Text( HookesLawStrings.energyStringProperty,
      combineOptions<TextOptions>( {}, HookesLawConstants.CONTROL_TEXT_OPTIONS, {
        tandem: options.tandem.createTandem( 'text' )
      } ) );

    const triangle = new Path( new Shape().moveTo( 0, 0 ).lineTo( 20, 0 ).lineTo( 20, -10 ).close(), {
      fill: HookesLawColors.ENERGY
    } );

    const content = new HBox( {
      children: [ text, triangle ],
      spacing: 6
    } );

    super( energyOnForcePlotVisibleProperty, content, options );
  }
}

hookesLaw.register( 'EnergyCheckbox', EnergyCheckbox );