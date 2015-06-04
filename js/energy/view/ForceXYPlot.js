// Copyright 2002-2015, University of Colorado Boulder

/**
 *  XY plot of displacement (x axis) vs force (y axis).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var HookesLawFont = require( 'HOOKES_LAW/common/HookesLawFont' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var LineArrowNode = require( 'HOOKES_LAW/common/view/LineArrowNode' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var appliedForceString = require( 'string!HOOKES_LAW/appliedForce' );
  var displacementString = require( 'string!HOOKES_LAW/displacement' );
  var metersString = require( 'string!HOOKES_LAW/meters' );
  var newtonsString = require( 'string!HOOKES_LAW/newtons' );
  var pattern_0value_1units = require( 'string!HOOKES_LAW/pattern.0value.1units' );

  // constants
  var AXIS_LINE_WIDTH = 1;
  var AXIS_COLOR = 'black';
  var LINE_OPTIONS = {
    stroke: 'black',
    lineWidth: 1,
    lineDash: [ 3, 3 ]
  };
  var UNIT_APPLIED_FORCE_VECTOR_LENGTH = 0.3; // length of a 1N applied force vector
  var Y_AXIS_HEIGHT = 270;
  var TICK_LENGTH = 10;
  var TICK_OPTIONS = {
    stroke: 'black',
    lineWidth: 1
  };

  /**
   * @param {Spring} spring
   * @param {Object} [options]
   * @constructor
   */
  function ForceXYPlot( spring, options ) {

    options = _.extend( {
      modelViewTransform: ModelViewTransform2.createIdentity(),
      valuesVisibleProperty: new Property( true ),
      displacementVectorVisibleProperty: new Property( true )
    }, options );

    // x axis
    var minX = options.modelViewTransform.modelToViewX( 1.1 * spring.displacementRange.min );
    var maxX = options.modelViewTransform.modelToViewX( 1.1 * spring.displacementRange.max );
    var xAxisNode = new ArrowNode( minX, 0, maxX, 0, {
      headHeight: 10,
      headWidth: 10,
      tailWidth: AXIS_LINE_WIDTH,
      fill: AXIS_COLOR,
      stroke: null
    } );
    var xAxisLabel = new Text( displacementString, {
      font: new HookesLawFont( 16 ),
      left: xAxisNode.right + 4,
      centerY: xAxisNode.centerY
    } );

    // y axis
    var yAxisNode = new ArrowNode( 0, Y_AXIS_HEIGHT / 2, 0, -Y_AXIS_HEIGHT / 2, {
      headHeight: 10,
      headWidth: 10,
      tailWidth: AXIS_LINE_WIDTH,
      fill: AXIS_COLOR,
      stroke: null
    } );
    var yAxisLabel = new Text( appliedForceString, {
      font: new HookesLawFont( 16 ),
      centerX: yAxisNode.centerX,
      bottom: yAxisNode.top - 2
    } );

    // point and the dashed lines that connect to it
    var pointNode = new Circle( 5, {
      fill: HookesLawColors.TOTAL_SPRING_FORCE //TODO why is this using this color in mockups?
    } );
    var verticalLine = new Line( 0, 0, 0, 1, LINE_OPTIONS );
    var horizontalLine = new Line( 0, 0, 1, 0, LINE_OPTIONS );

    // displacement nodes
    var displacementVectorNode = new LineArrowNode( 0, 0, 1, 0, HookesLawConstants.DISPLACEMENT_VECTOR_OPTIONS );
    var displacementValueNode = new Text( '', {
      fill: HookesLawColors.DISPLACEMENT,
      font: HookesLawConstants.XY_PLOT_VALUE_FONT
    } );
    var displacementTickNode = new Line( 0, 0, 0, TICK_LENGTH, _.extend( TICK_OPTIONS, {
      centerY: xAxisNode.centerY
    } ) );

    // force nodes
    var forceValueNode = new Text( '', {
      fill: HookesLawColors.APPLIED_FORCE,
      font: HookesLawConstants.XY_PLOT_VALUE_FONT
    } );
    var forceTickNode = new Line( 0, 0, TICK_LENGTH, 0, _.extend( TICK_OPTIONS, {
      centerX: yAxisNode.centerX
    } ) );

    var slopeLineNode = new Line( 0, 0, 1, 1, {
      stroke: HookesLawColors.APPLIED_FORCE, //TODO why is this force color? It's slope due to spring constant
      lineWidth: 1
    } );

    options.children = [
      xAxisNode, xAxisLabel, yAxisNode, yAxisLabel,
      slopeLineNode,
      verticalLine, horizontalLine, pointNode,
      displacementTickNode, displacementVectorNode, displacementValueNode,
      forceTickNode, forceValueNode
    ];
    Node.call( this, options );

    // visibility
    options.displacementVectorVisibleProperty.linkAttribute( displacementVectorNode, 'visible' );
    options.valuesVisibleProperty.linkAttribute( displacementValueNode, 'visible' );
    options.valuesVisibleProperty.linkAttribute( verticalLine, 'visible' );
    options.valuesVisibleProperty.linkAttribute( horizontalLine, 'visible' );

    spring.springConstantProperty.link( function( springConstant ) {
      var minDisplacement = options.modelViewTransform.modelToViewX( spring.displacementRange.min );
      var maxDisplacement = options.modelViewTransform.modelToViewX( spring.displacementRange.max );
      // F = kx
      var minForce = -UNIT_APPLIED_FORCE_VECTOR_LENGTH * springConstant * spring.displacementRange.min;
      var maxForce = -UNIT_APPLIED_FORCE_VECTOR_LENGTH * springConstant * spring.displacementRange.max;
      slopeLineNode.setLine( minDisplacement, minForce, maxDisplacement, maxForce );
    } );

    spring.displacementProperty.link( function( displacement ) {

      var fixedDisplacement = Util.toFixedNumber( displacement, HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES );
      var viewDisplacement = options.modelViewTransform.modelToViewX( fixedDisplacement );

      // vector
      displacementVectorNode.visible = ( fixedDisplacement !== 0 ); // since we can't draw a zero-length arrow
      if ( fixedDisplacement !== 0 ) {
        displacementVectorNode.setTailAndTip( 0, 0, viewDisplacement, 0 );
      }

      // tick mark
      displacementTickNode.visible = ( fixedDisplacement !== 0 );
      displacementTickNode.centerX = viewDisplacement;

      // value
      var displacementText = Util.toFixed( fixedDisplacement, HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES );
      displacementValueNode.text = StringUtils.format( pattern_0value_1units, displacementText, metersString );
      //TODO simplify placement
      var xSpacing = 4;
      if ( Math.abs( viewDisplacement ) > ( xSpacing + displacementValueNode.width / 2 ) ) {
        if ( fixedDisplacement >= 0 ) {
          displacementValueNode.centerX = viewDisplacement;
        }
        else {
          displacementValueNode.centerX = viewDisplacement;
        }
      }
      else {
        if ( fixedDisplacement >= 0 ) {
          displacementValueNode.left = xSpacing;
        }
        else {
          displacementValueNode.right = -xSpacing;
        }
      }
      //TODO y position should be based on sign of applied force
      var ySpacing = 12;
      if ( fixedDisplacement >= 0 ) {
        displacementValueNode.top = ySpacing;
      }
      else {
        displacementValueNode.bottom = -ySpacing;
      }
    } );

    spring.appliedForceProperty.link( function( appliedForce ) {

      var fixedForce = Util.toFixedNumber( appliedForce, HookesLawConstants.APPLIED_FORCE_DECIMAL_PLACES );
      var viewForce = fixedForce * UNIT_APPLIED_FORCE_VECTOR_LENGTH;

      // tick mark
      forceTickNode.visible = ( fixedForce !== 0 );
      forceTickNode.centerY = -viewForce;

      // value
      var forceText = Util.toFixed( fixedForce, HookesLawConstants.APPLIED_FORCE_DECIMAL_PLACES );
      forceValueNode.text = StringUtils.format( pattern_0value_1units, forceText, newtonsString );
      //TODO simplify placement
      //TODO x position should be based on sign of displacement
      var xSpacing = 4;
      if ( fixedForce >= 0 ) {
        forceValueNode.right = yAxisNode.left - xSpacing;
      }
      else {
        forceValueNode.left = yAxisNode.right + xSpacing;
      }
      var ySpacing = 4;
      if ( Math.abs( viewForce ) > ySpacing + forceValueNode.height / 2 ) {
        if ( fixedForce >= 0 ) {
          forceValueNode.centerY = -viewForce;
        }
        else {
          forceValueNode.centerY = -viewForce;
        }
      }
      else {
        if ( fixedForce >= 0 ) {
          forceValueNode.bottom = -ySpacing;
        }
        else {
          forceValueNode.top = +ySpacing;
        }
      }
    } );

    var pointProperty = new DerivedProperty( [ spring.appliedForceProperty, spring.displacementProperty ],
      function( appliedForce, displacement ) {
        var fixedDisplacement = Util.toFixedNumber( displacement, HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES );
        var x = options.modelViewTransform.modelToViewX( fixedDisplacement );
        var y = -appliedForce * UNIT_APPLIED_FORCE_VECTOR_LENGTH;
        return new Vector2( x, y );
      } );

    pointProperty.link( function( point ) {

      // point
      pointNode.x = point.x;
      pointNode.y = point.y;

      // dashed lines
      horizontalLine.setLine( 0, point.y, point.x, point.y );
      verticalLine.setLine( point.x, 0, point.x, point.y );
    } );
  }

  return inherit( Node, ForceXYPlot );
} );