// Copyright 2022-2024, University of Colorado Boulder

/**
 * VectorCheckbox is the checkbox used for visibility of a vector in control panels, labeled with text and a vector icon.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { optionize3 } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import LineArrowNode from '../../../../scenery-phet/js/LineArrowNode.js';
import { HBox, TColor, Text } from '../../../../scenery/js/imports.js';
import Checkbox, { CheckboxOptions } from '../../../../sun/js/Checkbox.js';
import HookesLawConstants from '../HookesLawConstants.js';
import HookesLawIconFactory from './HookesLawIconFactory.js';
import hookesLaw from '../../hookesLaw.js';

type SelfOptions = {
  vectorType: 'force' | 'displacement';
  arrowFill: TColor;
};

type VectorCheckboxOptions = SelfOptions & PickRequired<CheckboxOptions, 'tandem'>;

export default class VectorCheckbox extends Checkbox {

  public constructor( visibleProperty: Property<boolean>,
                      stringProperty: TReadOnlyProperty<string>,
                      providedOptions: VectorCheckboxOptions ) {

    const options = optionize3<VectorCheckboxOptions, SelfOptions, CheckboxOptions>()(
      {}, HookesLawConstants.CHECKBOX_OPTIONS, providedOptions );

    const text = new Text( stringProperty, {
      font: HookesLawConstants.CONTROL_TEXT_FONT,
      maxWidth: 110
    } );

    let arrowNode;
    if ( options.vectorType === 'force' ) {
      arrowNode = HookesLawIconFactory.createForceVectorIcon( {
        fill: options.arrowFill
      } );
    }
    else {
      arrowNode = new LineArrowNode( 0, 0, 30, 0, {
        stroke: options.arrowFill,
        headWidth: HookesLawConstants.VECTOR_HEAD_SIZE.width,
        headHeight: HookesLawConstants.VECTOR_HEAD_SIZE.height,
        headLineWidth: 3,
        tailLineWidth: 3
      } );
    }

    const content = new HBox( {
      children: [ text, arrowNode ],
      spacing: 10,
      justify: 'left'
    } );

    super( visibleProperty, content, options );
  }
}

hookesLaw.register( 'VectorCheckbox', VectorCheckbox );