// Copyright 2015-2022, University of Colorado Boulder

/**
 * Axes for XY plots.
 * Draws x and y axes with arrows pointing in the positive directions, and labels at the positive ends.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Font, Node, NodeOptions, Text } from '../../../../scenery/js/imports.js';
import hookesLaw from '../../hookesLaw.js';

// constants
const AXIS_OPTIONS = {
  headHeight: 10,
  headWidth: 10,
  tailWidth: 1,
  fill: 'black',
  stroke: null
};
const DEFAULT_FONT = new PhetFont( 14 );

type SelfOptions = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  xString: string;
  yString: string;
  font?: Font;
  xLabelMaxWidth?: number | null;
};

type XYAxesOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class XYAxes extends Node {

  public constructor( providedOptions: XYAxesOptions ) {

    const options = optionize<XYAxesOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      font: DEFAULT_FONT,
      xLabelMaxWidth: null
    }, providedOptions );

    // x-axis, arrow in positive direction only
    const xAxisNode = new ArrowNode( options.minX, 0, options.maxX, 0, AXIS_OPTIONS );
    const xAxisText = new Text( options.xString, {
      font: options.font,
      left: xAxisNode.right + 4,
      centerY: xAxisNode.centerY,
      maxWidth: options.xLabelMaxWidth, // constrain for i18n
      tandem: options.tandem.createTandem( 'xAxisText' )
    } );

    // y-axis, arrow in positive direction only
    const yAxisNode = new ArrowNode( 0, -options.minY, 0, -options.maxY, AXIS_OPTIONS );
    const yAxisText = new Text( options.yString, {
      font: options.font,
      centerX: yAxisNode.centerX,
      bottom: yAxisNode.top - 2,
      maxWidth: 0.85 * xAxisNode.width, // constrain for i18n
      tandem: options.tandem.createTandem( 'yAxisText' )
    } );

    options.children = [ xAxisNode, xAxisText, yAxisNode, yAxisText ];

    super( options );
  }
}

hookesLaw.register( 'XYAxes', XYAxes );