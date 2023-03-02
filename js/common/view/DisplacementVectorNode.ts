// Copyright 2015-2023, University of Colorado Boulder

/**
 * DisplacementVectorNode is the vector representation of displacement (x).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Utils from '../../../../dot/js/Utils.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickOptional from '../../../../phet-core/js/types/PickOptional.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import LineArrowNode from '../../../../scenery-phet/js/LineArrowNode.js';
import { Line, Node, NodeOptions, NodeTranslationOptions, Rectangle, Text } from '../../../../scenery/js/imports.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawStrings from '../../HookesLawStrings.js';
import HookesLawColors from '../HookesLawColors.js';
import HookesLawConstants from '../HookesLawConstants.js';

type SelfOptions = {
  verticalLineVisible?: boolean;
  unitDisplacementLength?: number;
};

type DisplacementVectorNodeOptions = SelfOptions & NodeTranslationOptions &
  PickOptional<NodeOptions, 'visibleProperty'> & PickRequired<NodeOptions, 'tandem'>;

export default class DisplacementVectorNode extends Node {

  public constructor( displacementProperty: TReadOnlyProperty<number>,
                      valueVisibleProperty: TReadOnlyProperty<boolean>,
                      providedOptions: DisplacementVectorNodeOptions ) {

    const options = optionize<DisplacementVectorNodeOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      verticalLineVisible: true,
      unitDisplacementLength: 1
    }, providedOptions );

    const arrowNode = new LineArrowNode( 0, 0, 1, 0, {
      stroke: HookesLawColors.DISPLACEMENT,
      headWidth: 20,
      headHeight: 10,
      headLineWidth: 3,
      tailLineWidth: 3
    } );

    const valueText = new Text( '', {
      visibleProperty: valueVisibleProperty,
      maxWidth: 150, // i18n
      fill: HookesLawColors.DISPLACEMENT,
      font: HookesLawConstants.VECTOR_VALUE_FONT,
      top: arrowNode.bottom + 2, // below the arrow,
      tandem: options.tandem.createTandem( 'valueText' )
    } );

    // translucent background, so that value isn't difficult to read when it overlaps with other UI components
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

    displacementProperty.link( displacement => {

      // update the vector
      arrowNode.visible = ( displacement !== 0 ); // since we can't draw a zero-length arrow
      if ( displacement !== 0 ) {
        arrowNode.setTailAndTip( 0, 0, options.unitDisplacementLength * displacement, 0 );
      }

      // update the value
      const displacementText = Utils.toFixed( Math.abs( displacement ), HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES );
      valueText.string = StringUtils.format( HookesLawStrings.pattern[ '0value' ][ '1units' ], displacementText, HookesLawStrings.meters );

      // center value on arrow
      valueText.centerX = ( displacement === 0 ) ? 0 : arrowNode.centerX;

      // resize the background behind the value
      backgroundNode.setRect( 0, 0, 1.1 * valueText.width, 1.1 * valueText.height, 5, 5 );
      backgroundNode.center = valueText.center;
    } );

    super( options );
  }
}

hookesLaw.register( 'DisplacementVectorNode', DisplacementVectorNode );