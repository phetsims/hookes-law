// Copyright 2022, University of Colorado Boulder

/**
 * VectorCheckbox is the checkbox used for visibility of a vector in control panels, labeled with text and a vector icon.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { combineOptions, optionize3 } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StrictOmit from '../../../../phet-core/js/types/StrictOmit.js';
import LineArrowNode from '../../../../scenery-phet/js/LineArrowNode.js';
import { AlignBox, AlignBoxOptions, HBox, TColor, Text, TextOptions } from '../../../../scenery/js/imports.js';
import Checkbox, { CheckboxOptions } from '../../../../sun/js/Checkbox.js';
import HookesLawConstants from '../HookesLawConstants.js';
import HookesLawIconFactory from './HookesLawIconFactory.js';
import hookesLaw from '../../hookesLaw.js';

type SelfOptions = {
  vectorType: 'force' | 'displacement';
  arrowFill: TColor;
  textAlignBoxOptions?: StrictOmit<AlignBoxOptions, 'tandem'>; // to give text labels the same effective width
};

type VectorCheckboxOptions = SelfOptions & PickRequired<CheckboxOptions, 'tandem'>;

export default class VectorCheckbox extends Checkbox {

  public constructor( visibleProperty: Property<boolean>,
                      stringProperty: TReadOnlyProperty<string>,
                      providedOptions: VectorCheckboxOptions ) {

    const options = optionize3<VectorCheckboxOptions, StrictOmit<SelfOptions, 'textAlignBoxOptions'>, CheckboxOptions>()(
      {}, HookesLawConstants.CHECKBOX_OPTIONS, providedOptions );

    const text = new Text( stringProperty,
      combineOptions<TextOptions>( {}, HookesLawConstants.CONTROL_TEXT_OPTIONS, {
        tandem: options.tandem.createTandem( 'text' )
      } ) );

    const textAlignBox = new AlignBox( text, options.textAlignBoxOptions );

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
      children: [ textAlignBox, arrowNode ],
      spacing: 10
    } );

    super( visibleProperty, content, options );
  }
}

hookesLaw.register( 'VectorCheckbox', VectorCheckbox );