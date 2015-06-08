// Copyright 2002-2015, University of Colorado Boulder

/**
 * Base type for the Force and Energy XY plots.
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
define( function( require ) {
  'use strict';

  // modules
  var Circle = require( 'SCENERY/nodes/Circle' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var LineArrowNode = require( 'HOOKES_LAW/common/view/LineArrowNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );
  var XYAxes = require( 'HOOKES_LAW/energy/view/XYAxes' );

  // strings
  var pattern_0value_1units = require( 'string!HOOKES_LAW/pattern.0value.1units' );

  // constants
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
   * @param {Property.<number>} xProperty
   * @param {Property.<number>} yProperty
   * @param {Object} [options]
   * @constructor
   */
  function XYPointPlot( xProperty, yProperty, options ) {

    options = _.extend( {

      // both axes
      axisFont: new PhetFont( 12 ),
      valueFont: new PhetFont( 12 ),
      valuesVisibleProperty: new Property( true ),

      // point
      pointFill: 'black',
      pointRadius: 6,

      // x axis
      minX: -1,
      maxX: 1,
      xString: 'x',
      xDecimalPlaces: 0,
      xUnits: '',
      xValueFill: 'black',
      xUnitLength: 1,
      xVectorVisibleProperty: new Property( true ),

      // y axis
      minY: -1,
      maxY: 1,
      yString: 'y',
      yDecimalPlaces: 0,
      yUnits: '',
      yValueFill: 'black',
      yUnitLength: 1

    }, options );

    // XY axes
    var axesNode = new XYAxes( {
      minX: options.minX,
      maxX: options.maxX,
      minY: options.minY,
      maxY: options.maxY,
      xString: options.xString,
      yString: options.yString,
      font: options.axisFont
    } );

    // point
    var pointNode = new Circle( options.pointRadius, {
      fill: options.pointFill
    } );

    // x nodes
    var xValueNode = new Text( '', {
      fill: options.xValueFill,
      font: options.valueFont
    } );
    var xTickNode = new Line( 0, 0, 0, TICK_LENGTH, _.extend( TICK_OPTIONS, { centerY: 0 } ) );
    var xLeaderLine = new Line( 0, 0, 0, 1, LEADER_LINE_OPTIONS );
    var xVectorNode = new LineArrowNode( 0, 0, 1, 0, HookesLawConstants.DISPLACEMENT_VECTOR_OPTIONS );

    // y nodes
    var yValueNode = new Text( '', {
      fill: options.yValueFill,
      font: options.valueFont
    } );
    var yTickNode = new Line( 0, 0, TICK_LENGTH, 0, _.extend( TICK_OPTIONS, { centerX: 0 } ) );
    var yLeaderLine = new Line( 0, 0, 1, 0, LEADER_LINE_OPTIONS );

    options.children = [
      axesNode,
      xLeaderLine, xTickNode, xValueNode, xVectorNode,
      yLeaderLine, yTickNode, yValueNode,
      pointNode
    ];
    Node.call( this, options );

    // visibility
    options.xVectorVisibleProperty.link( function( visible ) {
      var xFixed = Util.toFixedNumber( xProperty.get(), options.xDecimalPlaces ); // the displayed value
      xVectorNode.visible = ( visible && xFixed !== 0 );
    } );
    options.valuesVisibleProperty.link( function( visible ) {
      // this is more efficient than linkAttribute for each node
      xValueNode.visible = visible;
      xTickNode.visible = visible;
      xLeaderLine.visible = visible;
      yValueNode.visible = visible;
      yTickNode.visible = visible;
      yLeaderLine.visible = visible;
    } );

    xProperty.link( function( x ) {

      var xFixed = Util.toFixedNumber( x, options.xDecimalPlaces );
      var xView = options.xUnitLength * xFixed;

      // x vector
      xVectorNode.visible = ( xFixed !== 0 && options.xVectorVisibleProperty.get() ); // can't draw a zero-length arrow
      if ( xFixed !== 0 ) {
        xVectorNode.setTailAndTip( 0, 0, xView, 0 );
      }

      // x tick mark
      xTickNode.visible = ( xFixed !== 0 && options.valuesVisibleProperty.get() );
      xTickNode.centerX = xView;

      // x value
      var xText = Util.toFixed( xFixed, HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES );
      xValueNode.text = StringUtils.format( pattern_0value_1units, xText, options.xUnits );

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
    } );

    yProperty.link( function( y ) {

      var yFixed = Util.toFixedNumber( y, options.yDecimalPlaces );
      var yView = yFixed * options.yUnitLength;

      // y tick mark
      yTickNode.visible = ( yFixed !== 0 && options.valuesVisibleProperty.get() );
      yTickNode.centerY = -yView;

      // y value
      var yText = Util.toFixed( yFixed, options.yDecimalPlaces );
      yValueNode.text = StringUtils.format( pattern_0value_1units, yText, options.yUnits );

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
  }

  return inherit( Node, XYPointPlot );
} );
