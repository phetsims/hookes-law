// Copyright 2015-2021, University of Colorado Boulder

/**
 * Axes for XY plots.
 * Draws x and y axes with arrows pointing in the positive directions, and labels at the positive ends.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, Text } from '../../../../scenery/js/imports.js';
import hookesLaw from '../../hookesLaw.js';

// constants
const AXIS_OPTIONS = {
  headHeight: 10,
  headWidth: 10,
  tailWidth: 1,
  fill: 'black',
  stroke: null
};

class XYAxes extends Node {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      minX: -1,
      maxX: 1,
      minY: -1,
      maxY: 1,
      xString: 'x',
      yString: 'y',
      font: new PhetFont( 14 ),
      xLabelMaxWidth: null
    }, options );

    // x axis, arrow in positive direction only
    const xAxisNode = new ArrowNode( options.minX, 0, options.maxX, 0, AXIS_OPTIONS );
    const xAxisLabel = new Text( options.xString, {
      font: options.font,
      left: xAxisNode.right + 4,
      centerY: xAxisNode.centerY,
      maxWidth: options.xLabelMaxWidth // constrain for i18n
    } );

    // y axis, arrow in positive direction only
    const yAxisNode = new ArrowNode( 0, -options.minY, 0, -options.maxY, AXIS_OPTIONS );
    const yAxisLabel = new Text( options.yString, {
      font: options.font,
      centerX: yAxisNode.centerX,
      bottom: yAxisNode.top - 2,
      maxWidth: 0.85 * xAxisNode.width // constrain for i18n
    } );

    assert && assert( !options.children, 'XYAxes sets children' );
    options.children = [ xAxisNode, xAxisLabel, yAxisNode, yAxisLabel ];

    super( options );
  }
}

hookesLaw.register( 'XYAxes', XYAxes );

export default XYAxes;