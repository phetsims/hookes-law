// Copyright 2015-2024, University of Colorado Boulder

/**
 * Axes for XY plots.
 * Draws x and y axes with arrows pointing in the positive directions, and labels at the positive ends.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import optionize from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Font from '../../../../scenery/js/util/Font.js';
import hookesLaw from '../../hookesLaw.js';

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
  xStringProperty: TReadOnlyProperty<string>;
  yStringProperty: TReadOnlyProperty<string>;
  font?: Font;
};

type XYAxesOptions = SelfOptions & PickRequired<NodeOptions, 'tandem'>;

export default class XYAxes extends Node {

  public constructor( providedOptions: XYAxesOptions ) {

    const options = optionize<XYAxesOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      font: DEFAULT_FONT
    }, providedOptions );

    // x-axis, arrow in positive direction only
    const xAxisNode = new ArrowNode( options.minX, 0, options.maxX, 0, AXIS_OPTIONS );
    const xAxisText = new Text( options.xStringProperty, {
      font: options.font,
      maxWidth: 100 // constrain for i18n
    } );
    xAxisText.localBoundsProperty.link( () => {
      xAxisText.left = xAxisNode.right + 4;
      xAxisText.centerY = xAxisNode.centerY;
    } );

    // y-axis, arrow in positive direction only
    const yAxisNode = new ArrowNode( 0, -options.minY, 0, -options.maxY, AXIS_OPTIONS );
    const yAxisText = new Text( options.yStringProperty, {
      font: options.font,
      maxWidth: 0.5 * xAxisNode.width // constrain for i18n
    } );
    yAxisText.localBoundsProperty.link( () => {
      yAxisText.centerX = yAxisNode.centerX;
      yAxisText.bottom = yAxisNode.top - 2;
    } );

    options.children = [ xAxisNode, xAxisText, yAxisNode, yAxisText ];

    super( options );
  }
}

hookesLaw.register( 'XYAxes', XYAxes );