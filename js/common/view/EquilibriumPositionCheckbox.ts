// Copyright 2022-2024, University of Colorado Boulder

/**
 * EquilibriumPositionCheckbox is the 'Equilibrium Position' checkbox that appears in control panels.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import Checkbox, { CheckboxOptions } from '../../../../sun/js/Checkbox.js';
import HookesLawStrings from '../../HookesLawStrings.js';
import EquilibriumPositionNode from './EquilibriumPositionNode.js';
import hookesLaw from '../../hookesLaw.js';
import { HBox, Text } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import HookesLawConstants from '../HookesLawConstants.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';

export default class EquilibriumPositionCheckbox extends Checkbox {

  public constructor( equilibriumPositionVisibleProperty: Property<boolean>, tandem: Tandem ) {

    const text = new Text( HookesLawStrings.equilibriumPositionStringProperty, {
      font: HookesLawConstants.CONTROL_TEXT_FONT,
      maxWidth: 145
    } );

    const line = new EquilibriumPositionNode( text.height, {
      tandem: Tandem.OPT_OUT
    } );

    const content = new HBox( {
      children: [ text, line ],
      spacing: 6
    } );

    super( equilibriumPositionVisibleProperty, content, combineOptions<CheckboxOptions>( {
      tandem: tandem
    }, HookesLawConstants.CHECKBOX_OPTIONS ) );
  }
}

hookesLaw.register( 'EquilibriumPositionCheckbox', EquilibriumPositionCheckbox );