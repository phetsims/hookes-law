// Copyright 2002-2015, University of Colorado Boulder

/**
 * Base type for the Force and Energy XY plots.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Circle = require( 'SCENERY/nodes/Circle' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
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
      minX: -1,
      maxX: 1,
      minY: -1,
      maxY: 1,
      xString: 'x',
      yString: 'y',
      xDecimalPlaces: 0,
      yDecimalPlaces: 0,
      xUnits: '',
      yUnits: '',
      axisFont: new PhetFont( 12 ),
      valueFont: new PhetFont( 12 ),
      xValueFill: 'black',
      yValueFill: 'black',
      modelViewTransform: ModelViewTransform2.createIdentity(),
      valuesVisibleProperty: new Property( true ),
      xVectorVisibleProperty: new Property( true ),
      pointFill: 'black',
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
    var pointNode = new Circle( 6, {
      fill: options.pointFill
    } );

    // x nodes
    var xVectorNode = new LineArrowNode( 0, 0, 1, 0, HookesLawConstants.DISPLACEMENT_VECTOR_OPTIONS );
    var xValueNode = new Text( '', {
      fill: options.xValueFill,
      font: options.valueFont
    } );
    var xTickNode = new Line( 0, 0, 0, TICK_LENGTH, _.extend( TICK_OPTIONS, {
      centerY: 0
    } ) );
    var xLeaderLine = new Line( 0, 0, 0, 1, LEADER_LINE_OPTIONS );

    // y nodes
    var yValueNode = new Text( '', {
      fill: options.yValueFill,
      font: options.valueFont
    } );
    var yTickNode = new Line( 0, 0, TICK_LENGTH, 0, _.extend( TICK_OPTIONS, {
      centerX: 0
    } ) );
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
      var fixedX = Util.toFixedNumber( xProperty.get(), options.xDecimalPlaces );
      xVectorNode.visible = ( visible && fixedX !== 0 );
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

      var fixedX = Util.toFixedNumber( x, options.xDecimalPlaces );
      var viewX = options.modelViewTransform.modelToViewX( fixedX );

      // x vector
      xVectorNode.visible = ( fixedX !== 0 && options.xVectorVisibleProperty.get() ); // can't draw a zero-length arrow
      if ( fixedX !== 0 ) {
        xVectorNode.setTailAndTip( 0, 0, viewX, 0 );
      }

      // x tick mark
      xTickNode.visible = ( fixedX !== 0 && options.valuesVisibleProperty.get() );
      xTickNode.centerX = viewX;

      // x value
      var xText = Util.toFixed( fixedX, HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES );
      xValueNode.text = StringUtils.format( pattern_0value_1units, xText, options.xUnits );

      // placement of x value
      if ( options.minY === 0 ) {
        xValueNode.centerX = viewX;
        xValueNode.top = 12;
      }
      else {
        //TODO simplify placement
        var xSpacing = 6;
        if ( Math.abs( viewX ) > ( xSpacing + xValueNode.width / 2 ) ) {
            xValueNode.centerX = viewX;
        }
        else {
          if ( fixedX >= 0 ) {
            xValueNode.left = xSpacing;
          }
          else {
            xValueNode.right = -xSpacing;
          }
        }
        var ySpacing = 12;
        if ( yProperty.get() >= 0 ) {
          xValueNode.top = ySpacing;
        }
        else {
          xValueNode.bottom = -ySpacing;
        }
      }
    } );

    yProperty.link( function( y ) {

      var fixedY = Util.toFixedNumber( y, options.yDecimalPlaces );
      var viewY = fixedY * options.yUnitLength;

      // y tick mark
      yTickNode.visible = ( fixedY !== 0 && options.valuesVisibleProperty.get() );
      yTickNode.centerY = -viewY;

      // y value
      var yText = Util.toFixed( fixedY, options.yDecimalPlaces );
      yValueNode.text = StringUtils.format( pattern_0value_1units, yText, options.yUnits );

      //TODO simplify placement
      // placement of y value
      var xSpacing = 10;
      if ( xProperty.get() >= 0 ) {
        yValueNode.right = -xSpacing;
      }
      else {
        yValueNode.left = xSpacing;
      }
      var ySpacing = 4;
      if ( Math.abs( viewY ) > ySpacing + yValueNode.height / 2 ) {
          yValueNode.centerY = -viewY;
      }
      else {
        if ( fixedY >= 0 ) {
          yValueNode.bottom = -ySpacing;
        }
        else {
          yValueNode.top = ySpacing;
        }
      }
    } );

    Property.multilink( [ xProperty, yProperty ],
      function( x, y ) {

        var fixedX = Util.toFixedNumber( x, options.xDecimalPlaces );
        var viewX = options.modelViewTransform.modelToViewX( fixedX );
        var viewY = -y * options.yUnitLength;

        // point
        pointNode.x = viewX;
        pointNode.y = viewY;

        // leader lines
        xLeaderLine.setLine( viewX, 0, viewX, viewY );
        yLeaderLine.setLine( 0, viewY, viewX, viewY );
      } );
  }

  return inherit( Node, XYPointPlot );
} );
