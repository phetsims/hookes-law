// Copyright 2022-2025, University of Colorado Boulder

/**
 * VectorCheckbox is the 'Values' checkbox that appears in control panels.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Checkbox, { CheckboxOptions } from '../../../../sun/js/Checkbox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawStrings from '../../HookesLawStrings.js';
import HookesLawConstants from '../HookesLawConstants.js';

export default class ValuesCheckbox extends Checkbox {

  public constructor( valuesVisibleProperty: Property<boolean>, tandem: Tandem ) {

    const text = new Text( HookesLawStrings.valuesStringProperty, {
      font: HookesLawConstants.CONTROL_TEXT_FONT,
      maxWidth: 125
    } );

    super( valuesVisibleProperty, text, combineOptions<CheckboxOptions>( {}, HookesLawConstants.CHECKBOX_OPTIONS, {
      tandem: tandem
    } ) );
  }
}

hookesLaw.register( 'ValuesCheckbox', ValuesCheckbox );