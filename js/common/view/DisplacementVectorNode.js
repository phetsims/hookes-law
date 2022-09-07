// Copyright 2015-2022, University of Colorado Boulder

/**
 * Vector representation of displacement (x).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import LineArrowNode from '../../../../scenery-phet/js/LineArrowNode.js';
import { Line, Node, Rectangle, Text } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawStrings from '../../HookesLawStrings.js';
import HookesLawColors from '../HookesLawColors.js';
import HookesLawConstants from '../HookesLawConstants.js';

class DisplacementVectorNode extends Node {

  /**
   * @param {NumberProperty} displacementProperty units = m
   * @param {BooleanProperty} valueVisibleProperty - whether value is visible on the vector
   * @param {Object} [options]
   */
  constructor( displacementProperty, valueVisibleProperty, options ) {

    options = merge( {
      verticalLineVisible: true,
      unitDisplacementLength: 1,
      tandem: Tandem.REQUIRED
    }, options );

    const arrowNode = new LineArrowNode( 0, 0, 1, 0, HookesLawConstants.DISPLACEMENT_VECTOR_OPTIONS );

    const valueNode = new Text( '', {
      maxWidth: 150, // i18n
      fill: HookesLawColors.DISPLACEMENT,
      font: HookesLawConstants.VECTOR_VALUE_FONT,
      top: arrowNode.bottom + 2 // below the arrow
    } );

    // translucent background, so that value isn't difficult to read when it overlaps with other UI components
    const backgroundNode = new Rectangle( 0, 0, 1, 1, 5, 5, { fill: 'rgba( 255, 255, 255, 0.8 )' } );

    const verticalLine = new Line( 0, 0, 0, 20, {
      stroke: 'black',
      lineWidth: 2,
      centerY: arrowNode.centerY,
      visible: options.verticalLineVisible
    } );

    assert && assert( !options.children, 'DisplacementVectorNode sets children' );
    options.children = [ verticalLine, arrowNode, backgroundNode, valueNode ];

    displacementProperty.link( displacement => {

      // update the vector
      arrowNode.visible = ( displacement !== 0 ); // since we can't draw a zero-length arrow
      if ( displacement !== 0 ) {
        arrowNode.setTailAndTip( 0, 0, options.unitDisplacementLength * displacement, 0 );
      }

      // update the value
      const displacementText = Utils.toFixed( Math.abs( displacement ), HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES );
      valueNode.text = StringUtils.format( HookesLawStrings.pattern[ '0value' ][ '1units' ], displacementText, HookesLawStrings.meters );

      // center value on arrow
      valueNode.centerX = ( displacement === 0 ) ? 0 : arrowNode.centerX;

      // resize the background behind the value
      backgroundNode.setRect( 0, 0, 1.1 * valueNode.width, 1.1 * valueNode.height, 5, 5 );
      backgroundNode.center = valueNode.center;
    } );

    valueVisibleProperty.link( visible => {
      valueNode.visible = backgroundNode.visible = visible;
    } );

    super( options );
  }
}

hookesLaw.register( 'DisplacementVectorNode', DisplacementVectorNode );

export default DisplacementVectorNode;