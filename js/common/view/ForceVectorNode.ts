// Copyright 2015-2023, University of Colorado Boulder

/**
 * ForceVectorNode is the base class for force vectors.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Utils from '../../../../dot/js/Utils.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import { Node, NodeOptions, NodeTranslationOptions, Rectangle, TColor, Text } from '../../../../scenery/js/imports.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawStrings from '../../HookesLawStrings.js';
import HookesLawConstants from '../HookesLawConstants.js';

type SelfOptions = {
  fill?: TColor;
  stroke?: TColor;
  decimalPlaces?: number;
  unitLength?: number; // view length of a 1N vector
  alignZero?: 'left' | 'right'; // how to align zero ('0 N') values, relative to the arrow tail
};

export type ForceVectorNodeOptions = SelfOptions & NodeTranslationOptions &
  PickOptional<NodeOptions, 'visibleProperty'> &
  PickRequired<NodeOptions, 'tandem'>;

export default class ForceVectorNode extends Node {

  /**
   * @param forceProperty - units = N
   * @param valueVisibleProperty - whether a value is visible on the vector
   * @param providedOptions
   */
  protected constructor( forceProperty: TReadOnlyProperty<number>,
                         valueVisibleProperty: TReadOnlyProperty<boolean>,
                         providedOptions: ForceVectorNodeOptions ) {

    const options = optionize<ForceVectorNodeOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      fill: 'white',
      stroke: 'black',
      decimalPlaces: 0,
      unitLength: HookesLawConstants.UNIT_FORCE_X,
      alignZero: 'left'
    }, providedOptions );

    const arrowNode = new ArrowNode( 0, 0, 50, 0, {
      fill: options.fill,
      stroke: options.stroke,
      tailWidth: 10,
      headWidth: HookesLawConstants.VECTOR_HEAD_SIZE.width,
      headHeight: HookesLawConstants.VECTOR_HEAD_SIZE.height
    } );

    const valueText = new Text( '', {
      visibleProperty: valueVisibleProperty,
      maxWidth: 150,
      fill: options.fill,
      font: HookesLawConstants.VECTOR_VALUE_FONT,
      bottom: arrowNode.top - 2, // above the arrow
      tandem: options.tandem.createTandem( 'valueText' )
    } );

    // translucent background, so that value isn't difficult to read when it overlaps with other UI components
    const backgroundNode = new Rectangle( 0, 0, 1, 1, {
      fill: 'rgba( 255, 255, 255, 0.8 )',
      cornerRadius: 5,
      visibleProperty: valueVisibleProperty
    } );

    options.children = [ arrowNode, backgroundNode, valueText ];

    forceProperty.link( value => {

      // update the arrow
      arrowNode.visible = ( value !== 0 ); // since we can't draw a zero-length arrow
      if ( value !== 0 ) {
        arrowNode.setTailAndTip( 0, 0, value * options.unitLength, 0 );
      }

      // update the value
      valueText.string = StringUtils.format( HookesLawStrings.pattern[ '0value' ][ '1units' ],
        Utils.toFixed( Math.abs( value ), options.decimalPlaces ), HookesLawStrings.newtons );

      // value position
      const margin = 5;
      if ( value === 0 ) {
        if ( options.alignZero === 'left' ) {
          valueText.left = margin;
        }
        else {
          valueText.right = -margin;
        }
      }
      else if ( valueText.width + ( 2 * margin ) < arrowNode.width ) {
        valueText.centerX = arrowNode.centerX;
      }
      else if ( value > 0 ) {
        valueText.left = margin;
      }
      else {
        valueText.right = -margin;
      }

      // resize the background behind the value
      backgroundNode.setRect( 0, 0, 1.1 * valueText.width, 1.1 * valueText.height, 5, 5 );
      backgroundNode.center = valueText.center;
    } );

    super( options );
  }
}

hookesLaw.register( 'ForceVectorNode', ForceVectorNode );