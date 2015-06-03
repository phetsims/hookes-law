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
  var DisplacementVectorNode = require( 'HOOKES_LAW/common/view/DisplacementVectorNode' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var HookesLawFont = require( 'HOOKES_LAW/common/HookesLawFont' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var appliedForceString = require( 'string!HOOKES_LAW/appliedForce' );
  var displacementString = require( 'string!HOOKES_LAW/displacement' );

  // constants
  var AXIS_LINE_WIDTH = 1;
  var AXIS_COLOR = 'black';
  var LINE_OPTIONS = {
    stroke: 'black',
    lineWidth: 1,
    lineDash: [ 3, 3 ]
  };
  var UNIT_APPLIED_FORCE_VECTOR_LENGTH = 0.25; // length of a 1N applied force vector

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

    var yAxisNode = new ArrowNode( 0, 120, 0, -120, {
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

    var displacementVectorNode = new DisplacementVectorNode( spring.displacementProperty, {
      valueVisibleProperty: options.valuesVisibleProperty,
      modelViewTransform: options.modelViewTransform,
      verticalLineVisible: false
    } );

    var pointNode = new Circle( 5, {
      fill: HookesLawColors.TOTAL_SPRING_FORCE //TODO why is this using this color in mockups?
    } );

    var verticalLine = new Line( 0, 0, 0, 1, LINE_OPTIONS );

    var horizontalLine = new Line( 0, 0, 1, 0, LINE_OPTIONS );

    options.children = [
      xAxisNode, xAxisLabel, yAxisNode, yAxisLabel, displacementVectorNode,
      verticalLine, horizontalLine, pointNode
    ];
    Node.call( this, options );

    options.displacementVectorVisibleProperty.linkAttribute( displacementVectorNode, 'visible' );

    var pointProperty = new DerivedProperty( [ spring.appliedForceProperty, spring.displacementProperty ],
      function( appliedForce, displacement ) {
        var x = options.modelViewTransform.modelToViewX( displacement );
        var y = -appliedForce * UNIT_APPLIED_FORCE_VECTOR_LENGTH;
        return new Vector2( x, y );
      } );

    pointProperty.link( function( point ) {
      pointNode.x = point.x;
      pointNode.y = point.y;
      horizontalLine.setLine( 0, point.y, point.x, point.y );
      verticalLine.setLine( point.x, 0, point.x, point.y );
    } );
  }

  return inherit( Node, ForceXYPlot );
} );