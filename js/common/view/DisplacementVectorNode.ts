// Copyright 2015-2025, University of Colorado Boulder

/**
 * DisplacementVectorNode is the vector representation of displacement (x).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import StringProperty from '../../../../axon/js/StringProperty.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Utils from '../../../../dot/js/Utils.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import LineArrowNode from '../../../../scenery-phet/js/LineArrowNode.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node, { NodeOptions, NodeTranslationOptions } from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawStrings from '../../HookesLawStrings.js';
import HookesLawColors from '../HookesLawColors.js';
import HookesLawConstants from '../HookesLawConstants.js';

// Margins for the translucent background behind the vector value.
const BACKGROUND_X_MARGIN = 3;
const BACKGROUND_Y_MARGIN = 2;

type SelfOptions = {
  verticalLineVisible?: boolean;
  unitDisplacementLength?: number;
};

type DisplacementVectorNodeOptions = SelfOptions & NodeTranslationOptions & PickOptional<NodeOptions, 'visibleProperty'>;

export default class DisplacementVectorNode extends Node {

  public constructor( displacementProperty: TReadOnlyProperty<number>,
                      valueVisibleProperty: TReadOnlyProperty<boolean>,
                      providedOptions?: DisplacementVectorNodeOptions ) {

    const options = optionize<DisplacementVectorNodeOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      verticalLineVisible: true,
      unitDisplacementLength: 1
    }, providedOptions );

    const arrowNode = new LineArrowNode( 0, 0, 1, 0, {
      stroke: HookesLawColors.displacementColorProperty,
      headWidth: 20,
      headHeight: 10,
      headLineWidth: 3,
      tailLineWidth: 3
    } );

    const valueStringProperty = new StringProperty( '' );
    const valueText = new Text( valueStringProperty, {
      visibleProperty: valueVisibleProperty,
      maxWidth: 150, // i18n
      fill: HookesLawColors.displacementColorProperty,
      font: HookesLawConstants.VECTOR_VALUE_FONT,
      top: arrowNode.bottom + 2 // below the arrow
    } );

    // Translucent background, so that value isn't difficult to read when it overlaps with other UI components.
    const backgroundNode = new Rectangle( 0, 0, 1, 1, {
      visibleProperty: valueVisibleProperty,
      fill: 'rgba( 255, 255, 255, 0.8 )',
      cornerRadius: 5
    } );

    const verticalLine = new Line( 0, 0, 0, 20, {
      stroke: 'black',
      lineWidth: 2,
      centerY: arrowNode.centerY,
      visible: options.verticalLineVisible
    } );

    options.children = [ verticalLine, arrowNode, backgroundNode, valueText ];

    Multilink.multilink(
      [ displacementProperty, HookesLawStrings.pattern[ '0value' ][ '1unitsStringProperty' ], HookesLawStrings.metersStringProperty ],
      ( displacement, patternString, metersString ) => {

        // Update the vector.
        arrowNode.visible = ( displacement !== 0 ); // since we can't draw a zero-length arrow
        if ( displacement !== 0 ) {
          arrowNode.setTailAndTip( 0, 0, options.unitDisplacementLength * displacement, 0 );
        }

        // Update the value.
        const displacementText = Utils.toFixed( Math.abs( displacement ), HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES );
        valueStringProperty.value = StringUtils.format( patternString, displacementText, metersString );

        // Center the value on the arrow.
        valueText.centerX = ( displacement === 0 ) ? 0 : arrowNode.centerX;
      } );

    // Resize the background to fit the value.
    valueText.boundsProperty.link( () => {
      backgroundNode.setRect( 0, 0, valueText.width + 2 * BACKGROUND_X_MARGIN, valueText.height + 2 * BACKGROUND_Y_MARGIN, 5, 5 );
      backgroundNode.center = valueText.center;
    } );

    super( options );
  }
}

hookesLaw.register( 'DisplacementVectorNode', DisplacementVectorNode );