// Copyright 2015-2018, University of Colorado Boulder

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
define( require => {
  'use strict';

  // modules
  const Circle = require( 'SCENERY/nodes/Circle' );
  const hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  const HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  const HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Line = require( 'SCENERY/nodes/Line' );
  const Node = require( 'SCENERY/nodes/Node' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const Property = require( 'AXON/Property' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Util = require( 'DOT/Util' );
  const XYAxes = require( 'HOOKES_LAW/energy/view/XYAxes' );

  // strings
  const pattern0Value1UnitsString = require( 'string!HOOKES_LAW/pattern.0value.1units' );

  // constants
  var VALUE_X_MARGIN = 6;
  var VALUE_Y_MARGIN = 3;
  var VALUE_BACKGROUND_CORNER_RADIUS = 3;
  var LEADER_LINE_OPTIONS = {
    stroke: 'black',
    lineWidth: 1,
    lineDash: [ 3, 3 ]
  };
  var TICK_LENGTH = 12;
  var TICK_OPTIONS = {
    stroke: 'black',
    lineWidth: 1
  };

  /**
   * @param {NumberProperty} xProperty - x coordinate value
   * @param {NumberProperty} yProperty - y coordinate value
   * @param {BooleanProperty} valuesVisibleProperty - whether values are visible on the plot
   * @param {BooleanProperty} displacementVectorVisibleProperty - whether the horizontal displacement is displayed
   * @param {Object} [options]
   * @constructor
   * @abstract
   */
  function XYPointPlot( xProperty, yProperty, valuesVisibleProperty, displacementVectorVisibleProperty, options ) {

    options = _.extend( {

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
      tandem: Tandem.required

    }, options );

    // XY axes
    var axesNode = new XYAxes( {
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
    var pointNode = new Circle( options.pointRadius, {
      fill: options.pointFill
    } );

    // x nodes
    var xValueNode = new Text( '', {
      maxWidth: 150, // i18n
      fill: options.xValueFill,
      font: options.valueFont
    } );
    var xTickNode = new Line( 0, 0, 0, TICK_LENGTH, _.extend( TICK_OPTIONS, { centerY: 0 } ) );
    var xLeaderLine = new Line( 0, 0, 0, 1, LEADER_LINE_OPTIONS );
    var xVectorNode = new Line( 0, 0, 1, 0, { lineWidth: 3, stroke: HookesLawColors.DISPLACEMENT } );
    var xValueBackgroundNode = new Rectangle( 0, 0, 1, 1, { fill: options.xValueBackgroundColor } );

    // y nodes
    var yValueNode = new Text( '', {
      maxWidth: 150, // i18n
      fill: options.yValueFill,
      font: options.valueFont
    } );
    var yTickNode = new Line( 0, 0, TICK_LENGTH, 0, _.extend( TICK_OPTIONS, { centerX: 0 } ) );
    var yLeaderLine = new Line( 0, 0, 1, 0, LEADER_LINE_OPTIONS );
    var yValueBackgroundNode = new Rectangle( 0, 0, 1, 1, { fill: options.yValueBackgroundColor } );

    assert && assert( !options.children, 'XYPointPlot sets children' );
    options.children = [
      axesNode,
      xLeaderLine, xTickNode, xValueBackgroundNode, xValueNode, xVectorNode,
      yLeaderLine, yTickNode, yValueBackgroundNode, yValueNode,
      pointNode
    ];

    // visibility
    displacementVectorVisibleProperty.link( function( visible ) {
      var xFixed = Util.toFixedNumber( xProperty.get(), options.xDecimalPlaces ); // the displayed value
      xVectorNode.visible = ( visible && xFixed !== 0 );
    } );
    valuesVisibleProperty.link( function( visible ) {

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

    xProperty.link( function( x ) {

      var xFixed = Util.toFixedNumber( x, options.xDecimalPlaces );
      var xView = options.xUnitLength * xFixed;

      // x vector
      xVectorNode.visible = ( xFixed !== 0 && displacementVectorVisibleProperty.get() ); // can't draw a zero-length arrow
      if ( xFixed !== 0 ) {
        xVectorNode.setLine( 0, 0, xView, 0 );
      }

      // x tick mark
      xTickNode.visible = ( xFixed !== 0 && valuesVisibleProperty.get() );
      xTickNode.centerX = xView;

      // x value
      var xText = Util.toFixed( xFixed, HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES );
      xValueNode.text = StringUtils.format( pattern0Value1UnitsString, xText, options.xUnits );

      // placement of x value, so that it doesn't collide with y value or axes
      if ( options.minY === 0 ) {
        xValueNode.centerX = xView; // centered on the tick
        xValueNode.top = 12; // below the x axis
      }
      else {
        var X_SPACING = 6;
        if ( Math.abs( xView ) > ( X_SPACING + xValueNode.width / 2 ) ) {
          xValueNode.centerX = xView; // centered on the tick
        }
        else if ( xFixed >= 0 ) {
          xValueNode.left = X_SPACING; // to the right of the y axis
        }
        else {
          xValueNode.right = -X_SPACING; // to the left of the y axis
        }

        var Y_SPACING = 12;
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

    yProperty.link( function( y ) {

      var yFixed = Util.toFixedNumber( y, options.yDecimalPlaces );
      var yView = yFixed * options.yUnitLength;

      // y tick mark
      yTickNode.visible = ( yFixed !== 0 && valuesVisibleProperty.get() );
      yTickNode.centerY = -yView;

      // y value
      var yText = Util.toFixed( yFixed, options.yDecimalPlaces );
      yValueNode.text = StringUtils.format( pattern0Value1UnitsString, yText, options.yUnits );

      // placement of y value, so that it doesn't collide with x value or axes
      var X_SPACING = 10;
      if ( xProperty.get() >= 0 ) {
        yValueNode.right = -X_SPACING; // to the left of the y axis
      }
      else {
        yValueNode.left = X_SPACING; // to the right of the y axis
      }

      var Y_SPACING = 4;
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
    Property.multilink( [ xProperty, yProperty ],
      function( x, y ) {

        var xFixed = Util.toFixedNumber( x, options.xDecimalPlaces );
        var xView = options.xUnitLength * xFixed;
        var yView = -y * options.yUnitLength;

        // point
        pointNode.x = xView;
        pointNode.y = yView;

        // leader lines
        xLeaderLine.setLine( xView, 0, xView, yView );
        yLeaderLine.setLine( 0, yView, xView, yView );
      } );

    Node.call( this, options );
  }

  hookesLaw.register( 'XYPointPlot', XYPointPlot );

  return inherit( Node, XYPointPlot );
} );
