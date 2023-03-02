// Copyright 2015-2023, University of Colorado Boulder

/**
 * Abstract base type for the Force and Energy XY plots.
 *
 * Responsibilities:
 * - draws the axes
 * - draws a point at (x,y)
 * - draws leader lines from axes to point
 * - draws values, and keeps them from colliding with each other or with the axes
 * - draws tick marks for (x,y) values
 * - draws a 1-dimensional vector for the x value
 * - handles visibility of values and the 1-dimensional vector
 * - keeps all of the above synchronized with x and y Properties
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Utils from '../../../../dot/js/Utils.js';
import optionize, { combineOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Circle, Font, Line, LineOptions, Node, NodeOptions, NodeTranslationOptions, Rectangle, TColor, Text } from '../../../../scenery/js/imports.js';
import HookesLawColors from '../../common/HookesLawColors.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawStrings from '../../HookesLawStrings.js';
import XYAxes from './XYAxes.js';

// constants
const VALUE_X_MARGIN = 6;
const VALUE_Y_MARGIN = 3;
const VALUE_BACKGROUND_CORNER_RADIUS = 3;
const LEADER_LINE_OPTIONS = {
  stroke: 'black',
  lineWidth: 1,
  lineDash: [ 3, 3 ]
};
const TICK_LENGTH = 12;
const TICK_OPTIONS = {
  stroke: 'black',
  lineWidth: 1
};
const DEFAULT_AXIS_FONT = new PhetFont( 12 );
const DEFAULT_VALUE_FONT = new PhetFont( 12 );

type SelfOptions = {

  // both axes
  axisFont?: Font;
  valueFont?: Font;

  // x-axis
  minX?: number;
  maxX?: number;
  xString?: string;
  xDecimalPlaces?: number;
  xUnits?: string;
  xValueFill?: TColor;
  xUnitLength?: number;
  xLabelMaxWidth?: number | null;
  xValueBackgroundColor?: TColor;

  // y-axis
  minY?: number;
  maxY?: number;
  yString?: string;
  yDecimalPlaces?: number;
  yUnits?: string;
  yValueFill?: TColor;
  yUnitLength?: number;
  yValueBackgroundColor?: TColor;

  // point
  pointFill?: TColor;
  pointRadius?: number;
};

export type XYPointPlotOptions = SelfOptions & NodeTranslationOptions & PickRequired<NodeOptions, 'tandem' | 'visibleProperty'>;

export default class XYPointPlot extends Node {

  /**
   * @param xProperty - x coordinate value
   * @param yProperty - y coordinate value
   * @param valuesVisibleProperty - whether values are visible on the plot
   * @param displacementVectorVisibleProperty - whether the horizontal displacement is displayed
   * @param providedOptions
   */
  protected constructor( xProperty: TReadOnlyProperty<number>,
                         yProperty: TReadOnlyProperty<number>,
                         valuesVisibleProperty: TReadOnlyProperty<boolean>,
                         displacementVectorVisibleProperty: TReadOnlyProperty<boolean>,
                         providedOptions: XYPointPlotOptions ) {

    const options = optionize<XYPointPlotOptions, SelfOptions, NodeOptions>()( {

      // SelfOptions
      // both axes
      axisFont: DEFAULT_AXIS_FONT,
      valueFont: DEFAULT_VALUE_FONT,

      // x-axis
      minX: -1,
      maxX: 1,
      xString: 'x',
      xDecimalPlaces: 0,
      xUnits: '',
      xValueFill: 'black',
      xUnitLength: 1,
      xLabelMaxWidth: null,
      xValueBackgroundColor: null,

      // y-axis
      minY: -1,
      maxY: 1,
      yString: 'y',
      yDecimalPlaces: 0,
      yUnits: '',
      yValueFill: 'black',
      yUnitLength: 1,
      yValueBackgroundColor: null,

      // point
      pointFill: 'black',
      pointRadius: 5
    }, providedOptions );

    assert && assert( options.xDecimalPlaces >= 0 );
    assert && assert( options.yDecimalPlaces >= 0 );
    assert && assert( options.xUnitLength > 0 );
    assert && assert( options.yUnitLength > 0 );
    assert && assert( options.pointRadius > 0 );

    // XY axes
    const axesNode = new XYAxes( {
      minX: options.minX,
      maxX: options.maxX,
      minY: options.minY,
      maxY: options.maxY,
      xString: options.xString,
      yString: options.yString,
      font: options.axisFont,
      xLabelMaxWidth: options.xLabelMaxWidth,
      tandem: options.tandem.createTandem( 'axesNode' )
    } );

    // point
    const pointNode = new Circle( options.pointRadius, {
      fill: options.pointFill
    } );

    // x nodes
    const xValueText = new Text( '', {
      maxWidth: 150, // i18n
      fill: options.xValueFill,
      font: options.valueFont,
      tandem: options.tandem.createTandem( 'xValueText' )
    } );
    const xTickNode = new Line( 0, 0, 0, TICK_LENGTH, combineOptions<LineOptions>( {}, TICK_OPTIONS, { centerY: 0 } ) );
    const xLeaderLine = new Line( 0, 0, 0, 1, LEADER_LINE_OPTIONS );
    const xVectorNode = new Line( 0, 0, 1, 0, { lineWidth: 3, stroke: HookesLawColors.DISPLACEMENT } );
    const xValueBackgroundNode = new Rectangle( 0, 0, 1, 1, { fill: options.xValueBackgroundColor } );

    // y nodes
    const yValueText = new Text( '', {
      maxWidth: 150, // i18n
      fill: options.yValueFill,
      font: options.valueFont,
      tandem: options.tandem.createTandem( 'yValueText' )
    } );
    const yTickNode = new Line( 0, 0, TICK_LENGTH, 0, combineOptions<LineOptions>( {}, TICK_OPTIONS, { centerX: 0 } ) );
    const yLeaderLine = new Line( 0, 0, 1, 0, LEADER_LINE_OPTIONS );
    const yValueBackgroundNode = new Rectangle( 0, 0, 1, 1, { fill: options.yValueBackgroundColor } );

    options.children = [
      axesNode,
      xLeaderLine, xTickNode, xValueBackgroundNode, xValueText, xVectorNode,
      yLeaderLine, yTickNode, yValueBackgroundNode, yValueText,
      pointNode
    ];

    // visibility
    displacementVectorVisibleProperty.link( visible => {
      const xFixed = Utils.toFixedNumber( xProperty.value, options.xDecimalPlaces ); // the displayed value
      xVectorNode.visible = ( visible && xFixed !== 0 );
    } );
    valuesVisibleProperty.link( visible => {

      // x-axis nodes
      xValueText.visible = visible;
      xValueBackgroundNode.visible = visible;
      xTickNode.visible = visible;
      xLeaderLine.visible = visible;

      // y-axis nodes
      yValueText.visible = visible;
      yValueBackgroundNode.visible = visible;
      yTickNode.visible = visible;
      yLeaderLine.visible = visible;
    } );

    xProperty.link( x => {

      const xFixed = Utils.toFixedNumber( x, options.xDecimalPlaces );
      const xView = options.xUnitLength * xFixed;

      // x vector
      xVectorNode.visible = ( xFixed !== 0 && displacementVectorVisibleProperty.value ); // can't draw a zero-length arrow
      if ( xFixed !== 0 ) {
        xVectorNode.setLine( 0, 0, xView, 0 );
      }

      // x tick mark
      xTickNode.visible = ( xFixed !== 0 && valuesVisibleProperty.value );
      xTickNode.centerX = xView;

      // x value
      const xString = Utils.toFixed( xFixed, HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES );
      xValueText.string = StringUtils.format( HookesLawStrings.pattern[ '0value' ][ '1units' ], xString, options.xUnits );

      // placement of x value, so that it doesn't collide with y value or axes
      if ( options.minY === 0 ) {
        xValueText.centerX = xView; // centered on the tick
        xValueText.top = 12; // below the x
      }
      else {
        const X_SPACING = 6;
        if ( Math.abs( xView ) > ( X_SPACING + xValueText.width / 2 ) ) {
          xValueText.centerX = xView; // centered on the tick
        }
        else if ( xFixed >= 0 ) {
          xValueText.left = X_SPACING; // to the right of the y-axis
        }
        else {
          xValueText.right = -X_SPACING; // to the left of the y-axis
        }

        const Y_SPACING = 12;
        if ( yProperty.value >= 0 ) {
          xValueText.top = Y_SPACING; // below the x-axis
        }
        else {
          xValueText.bottom = -Y_SPACING; // above the x-axis
        }
      }

      // x value background
      xValueBackgroundNode.setRect( 0, 0,
        xValueText.width + ( 2 * VALUE_X_MARGIN ), xValueText.height + ( 2 * VALUE_Y_MARGIN ),
        VALUE_BACKGROUND_CORNER_RADIUS, VALUE_BACKGROUND_CORNER_RADIUS );
      xValueBackgroundNode.center = xValueText.center;
    } );

    yProperty.link( y => {

      const yFixed = Utils.toFixedNumber( y, options.yDecimalPlaces );
      const yView = yFixed * options.yUnitLength;

      // y tick mark
      yTickNode.visible = ( yFixed !== 0 && valuesVisibleProperty.value );
      yTickNode.centerY = -yView;

      // y value
      const yString = Utils.toFixed( yFixed, options.yDecimalPlaces );
      yValueText.string = StringUtils.format( HookesLawStrings.pattern[ '0value' ][ '1units' ], yString, options.yUnits );

      // placement of y value, so that it doesn't collide with x value or axes
      const X_SPACING = 10;
      if ( xProperty.value >= 0 ) {
        yValueText.right = -X_SPACING; // to the left of the y-axis
      }
      else {
        yValueText.left = X_SPACING; // to the right of the y-axis
      }

      const Y_SPACING = 4;
      if ( Math.abs( yView ) > Y_SPACING + yValueText.height / 2 ) {
        yValueText.centerY = -yView; // centered on the tick
      }
      else if ( yFixed >= 0 ) {
        yValueText.bottom = -Y_SPACING; // above the x-axis
      }
      else {
        yValueText.top = Y_SPACING; // below the x-axis
      }

      // y value background
      yValueBackgroundNode.setRect( 0, 0,
        yValueText.width + ( 2 * VALUE_X_MARGIN ), yValueText.height + ( 2 * VALUE_Y_MARGIN ),
        VALUE_BACKGROUND_CORNER_RADIUS, VALUE_BACKGROUND_CORNER_RADIUS );
      yValueBackgroundNode.center = yValueText.center;
    } );

    // Move point and leader lines
    Multilink.multilink( [ xProperty, yProperty ],
      ( x, y ) => {

        const xFixed = Utils.toFixedNumber( x, options.xDecimalPlaces );
        const xView = options.xUnitLength * xFixed;
        const yView = -y * options.yUnitLength;

        // point
        pointNode.x = xView;
        pointNode.y = yView;

        // leader lines
        xLeaderLine.setLine( xView, 0, xView, yView );
        yLeaderLine.setLine( 0, yView, xView, yView );
      } );

    super( options );
  }
}

hookesLaw.register( 'XYPointPlot', XYPointPlot );