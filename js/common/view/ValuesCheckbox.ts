// Copyright 2022, University of Colorado Boulder

/**
 * VectorCheckbox is the 'Values' checkbox that appears in control panels.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import { Text, TextOptions } from '../../../../scenery/js/imports.js';
import Checkbox, { CheckboxOptions } from '../../../../sun/js/Checkbox.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import HookesLawStrings from '../../HookesLawStrings.js';
import HookesLawConstants from '../HookesLawConstants.js';
import hookesLaw from '../../hookesLaw.js';

export default class ValuesCheckbox extends Checkbox {

  public constructor( valuesVisibleProperty: Property<boolean>, tandem: Tandem ) {

    const text = new Text( HookesLawStrings.valuesStringProperty,
      combineOptions<TextOptions>( {}, HookesLawConstants.CONTROL_TEXT_OPTIONS, {
        tandem: tandem.createTandem( 'text' )
      } ) );

    super( valuesVisibleProperty, text, combineOptions<CheckboxOptions>( {}, HookesLawConstants.CHECKBOX_OPTIONS, {
      tandem: tandem
    } ) );
  }
}

hookesLaw.register( 'ValuesCheckbox', ValuesCheckbox );