// Copyright 2015-2022, University of Colorado Boulder

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
import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Circle } from '../../../../scenery/js/imports.js';
import { Line } from '../../../../scenery/js/imports.js';
import { Node } from '../../../../scenery/js/imports.js';
import { Rectangle } from '../../../../scenery/js/imports.js';
import { Text } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import HookesLawColors from '../../common/HookesLawColors.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import hookesLaw from '../../hookesLaw.js';
import hookesLawStrings from '../../hookesLawStrings.js';
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

class XYPointPlot extends Node {

  /**
   * @param {NumberProperty} xProperty - x coordinate value
   * @param {NumberProperty} yProperty - y coordinate value
   * @param {BooleanProperty} valuesVisibleProperty - whether values are visible on the plot
   * @param {BooleanProperty} displacementVectorVisibleProperty - whether the horizontal displacement is displayed
   * @param {Object} [options]
   * @abstract
   */
  constructor( xProperty, yProperty, valuesVisibleProperty, displacementVectorVisibleProperty, options ) {

    options = merge( {

      // both axes
      axisFont: new PhetFont( 12 ),
      valueFont: new PhetFont( 12 ),

      // x axis
      minX: -1,
      maxX: 1,
      xString: 'x',
      xDecimalPlaces: 0,
      xUnits: '',
      xValueFill: 'black',
      xUnitLength: 1,
      xLabelMaxWidth: null,
      xValueBackgroundColor: null,

      // y axis
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
      pointRadius: 5,

      // phet-io
      tandem: Tandem.REQUIRED

    }, options );

    // XY axes
    const axesNode = new XYAxes( {
      minX: options.minX,
      maxX: options.maxX,
      minY: options.minY,
      maxY: options.maxY,
      xString: options.xString,
      yString: options.yString,
      font: options.axisFont,
      xLabelMaxWidth: options.xLabelMaxWidth
    } );

    // point
    const pointNode = new Circle( options.pointRadius, {
      fill: options.pointFill
    } );

    // x nodes
    const xValueNode = new Text( '', {
      maxWidth: 150, // i18n
      fill: options.xValueFill,
      font: options.valueFont
    } );
    const xTickNode = new Line( 0, 0, 0, TICK_LENGTH, merge( TICK_OPTIONS, { centerY: 0 } ) );
    const xLeaderLine = new Line( 0, 0, 0, 1, LEADER_LINE_OPTIONS );
    const xVectorNode = new Line( 0, 0, 1, 0, { lineWidth: 3, stroke: HookesLawColors.DISPLACEMENT } );
    const xValueBackgroundNode = new Rectangle( 0, 0, 1, 1, { fill: options.xValueBackgroundColor } );

    // y nodes
    const yValueNode = new Text( '', {
      maxWidth: 150, // i18n
      fill: options.yValueFill,
      font: options.valueFont
    } );
    const yTickNode = new Line( 0, 0, TICK_LENGTH, 0, merge( TICK_OPTIONS, { centerX: 0 } ) );
    const yLeaderLine = new Line( 0, 0, 1, 0, LEADER_LINE_OPTIONS );
    const yValueBackgroundNode = new Rectangle( 0, 0, 1, 1, { fill: options.yValueBackgroundColor } );

    assert && assert( !options.children, 'XYPointPlot sets children' );
    options.children = [
      axesNode,
      xLeaderLine, xTickNode, xValueBackgroundNode, xValueNode, xVectorNode,
      yLeaderLine, yTickNode, yValueBackgroundNode, yValueNode,
      pointNode
    ];

    // visibility
    displacementVectorVisibleProperty.link( visible => {
      const xFixed = Utils.toFixedNumber( xProperty.get(), options.xDecimalPlaces ); // the displayed value
      xVectorNode.visible = ( visible && xFixed !== 0 );
    } );
    valuesVisibleProperty.link( visible => {

      // x-axis nodes
      xValueNode.visible = visible;
      xValueBackgroundNode.visible = visible;
      xTickNode.visible = visible;
      xLeaderLine.visible = visible;

      // y axis nodes
      yValueNode.visible = visible;
      yValueBackgroundNode.visible = visible;
      yTickNode.visible = visible;
      yLeaderLine.visible = visible;
    } );

    xProperty.link( x => {

      const xFixed = Utils.toFixedNumber( x, options.xDecimalPlaces );
      const xView = options.xUnitLength * xFixed;

      // x vector
      xVectorNode.visible = ( xFixed !== 0 && displacementVectorVisibleProperty.get() ); // can't draw a zero-length arrow
      if ( xFixed !== 0 ) {
        xVectorNode.setLine( 0, 0, xView, 0 );
      }

      // x tick mark
      xTickNode.visible = ( xFixed !== 0 && valuesVisibleProperty.get() );
      xTickNode.centerX = xView;

      // x value
      const xText = Utils.toFixed( xFixed, HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES );
      xValueNode.text = StringUtils.format( hookesLawStrings.pattern[ '0value' ][ '1units' ], xText, options.xUnits );

      // placement of x value, so that it doesn't collide with y value or axes
      if ( options.minY === 0 ) {
        xValueNode.centerX = xView; // centered on the tick
        xValueNode.top = 12; // below the x axis
      }
      else {
        const X_SPACING = 6;
        if ( Math.abs( xView ) > ( X_SPACING + xValueNode.width / 2 ) ) {
          xValueNode.centerX = xView; // centered on the tick
        }
        else if ( xFixed >= 0 ) {
          xValueNode.left = X_SPACING; // to the right of the y axis
        }
        else {
          xValueNode.right = -X_SPACING; // to the left of the y axis
        }

        const Y_SPACING = 12;
        if ( yProperty.get() >= 0 ) {
          xValueNode.top = Y_SPACING; // below the x axis
        }
        else {
          xValueNode.bottom = -Y_SPACING; // above the x axis
        }
      }

      // x value background
      xValueBackgroundNode.setRect( 0, 0,
        xValueNode.width + ( 2 * VALUE_X_MARGIN ), xValueNode.height + ( 2 * VALUE_Y_MARGIN ),
        VALUE_BACKGROUND_CORNER_RADIUS, VALUE_BACKGROUND_CORNER_RADIUS );
      xValueBackgroundNode.center = xValueNode.center;
    } );

    yProperty.link( y => {

      const yFixed = Utils.toFixedNumber( y, options.yDecimalPlaces );
      const yView = yFixed * options.yUnitLength;

      // y tick mark
      yTickNode.visible = ( yFixed !== 0 && valuesVisibleProperty.get() );
      yTickNode.centerY = -yView;

      // y value
      const yText = Utils.toFixed( yFixed, options.yDecimalPlaces );
      yValueNode.text = StringUtils.format( hookesLawStrings.pattern[ '0value' ][ '1units' ], yText, options.yUnits );

      // placement of y value, so that it doesn't collide with x value or axes
      const X_SPACING = 10;
      if ( xProperty.get() >= 0 ) {
        yValueNode.right = -X_SPACING; // to the left of the y axis
      }
      else {
        yValueNode.left = X_SPACING; // to the right of the y axis
      }

      const Y_SPACING = 4;
      if ( Math.abs( yView ) > Y_SPACING + yValueNode.height / 2 ) {
        yValueNode.centerY = -yView; // centered on the tick
      }
      else if ( yFixed >= 0 ) {
        yValueNode.bottom = -Y_SPACING; // above the x axis
      }
      else {
        yValueNode.top = Y_SPACING; // below the x axis
      }

      // y value background
      yValueBackgroundNode.setRect( 0, 0,
        yValueNode.width + ( 2 * VALUE_X_MARGIN ), yValueNode.height + ( 2 * VALUE_Y_MARGIN ),
        VALUE_BACKGROUND_CORNER_RADIUS, VALUE_BACKGROUND_CORNER_RADIUS );
      yValueBackgroundNode.center = yValueNode.center;
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

export default XYPointPlot;