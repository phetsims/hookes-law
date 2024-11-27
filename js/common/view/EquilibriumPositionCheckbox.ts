// Copyright 2022-2024, University of Colorado Boulder

/**
 * EquilibriumPositionCheckbox is the 'Equilibrium Position' checkbox that appears in control panels.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import { HBox, Text } from '../../../../scenery/js/imports.js';
import Checkbox, { CheckboxOptions } from '../../../../sun/js/Checkbox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawStrings from '../../HookesLawStrings.js';
import HookesLawConstants from '../HookesLawConstants.js';
import EquilibriumPositionNode from './EquilibriumPositionNode.js';

export default class EquilibriumPositionCheckbox extends Checkbox {

  public constructor( equilibriumPositionVisibleProperty: Property<boolean>, tandem: Tandem ) {

    const text = new Text( HookesLawStrings.equilibriumPositionStringProperty, {
      font: HookesLawConstants.CONTROL_TEXT_FONT,
      maxWidth: 155
    } );

    // vertical dashed line
    const icon = new EquilibriumPositionNode( text.height, {
      tandem: Tandem.OPT_OUT
    } );

    const content = new HBox( {
      children: [ text, icon ],
      spacing: 6,
      justify: 'left' // constant space between text and icon
    } );

    super( equilibriumPositionVisibleProperty, content, combineOptions<CheckboxOptions>( {
      tandem: tandem
    }, HookesLawConstants.CHECKBOX_OPTIONS ) );
  }
}

hookesLaw.register( 'EquilibriumPositionCheckbox', EquilibriumPositionCheckbox );