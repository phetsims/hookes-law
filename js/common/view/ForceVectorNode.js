// Copyright 2015-2022, University of Colorado Boulder

// @ts-nocheck
/**
 * Base type for force vectors.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import { Node, Rectangle, Text } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawStrings from '../../HookesLawStrings.js';
import HookesLawConstants from '../HookesLawConstants.js';

export default class ForceVectorNode extends Node {

  /**
   * @param {NumberProperty} forceProperty units = N
   * @param {BooleanProperty} valueVisibleProperty - whether value is visible on the vector
   * @param {Object} [options]
   */
  constructor( forceProperty, valueVisibleProperty, options ) {

    options = merge( {
      fill: 'white',
      stroke: 'black',
      decimalPlaces: 0,
      unitLength: HookesLawConstants.UNIT_FORCE_X, // view length of a 1N vector
      alignZero: 'left', // how to align zero ('0 N') values, relative to the arrow tail, 'left'|'right'
      tandem: Tandem.REQUIRED
    }, options );

    const arrowNode = new ArrowNode( 0, 0, 50, 0, {
      fill: options.fill,
      stroke: options.stroke,
      tailWidth: 10,
      headWidth: HookesLawConstants.VECTOR_HEAD_SIZE.width,
      headHeight: HookesLawConstants.VECTOR_HEAD_SIZE.height
    } );

    const valueNode = new Text( '', {
      maxWidth: 150, // i18n
      fill: options.fill,
      font: HookesLawConstants.VECTOR_VALUE_FONT,
      bottom: arrowNode.top - 2 // above the arrow
    } );

    // translucent background, so that value isn't difficult to read when it overlaps with other UI components
    const backgroundNode = new Rectangle( 0, 0, 1, 1, 5, 5, { fill: 'rgba( 255, 255, 255, 0.8 )' } );

    assert && assert( !options.children, 'ForceVectorNode sets children' );
    options.children = [ arrowNode, backgroundNode, valueNode ];

    forceProperty.link( value => {

      // update the arrow
      arrowNode.visible = ( value !== 0 ); // since we can't draw a zero-length arrow
      if ( value !== 0 ) {
        arrowNode.setTailAndTip( 0, 0, value * options.unitLength, 0 );
      }

      // update the value
      valueNode.text = StringUtils.format( HookesLawStrings.pattern[ '0value' ][ '1units' ],
        Utils.toFixed( Math.abs( value ), options.decimalPlaces ), HookesLawStrings.newtons );

      // value position
      const margin = 5;
      if ( value === 0 ) {
        if ( options.alignZero === 'left' ) {
          valueNode.left = margin;
        }
        else {
          valueNode.right = -margin;
        }
      }
      else if ( valueNode.width + ( 2 * margin ) < arrowNode.width ) {
        valueNode.centerX = arrowNode.centerX;
      }
      else if ( value > 0 ) {
        valueNode.left = margin;
      }
      else {
        valueNode.right = -margin;
      }

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

hookesLaw.register( 'ForceVectorNode', ForceVectorNode );