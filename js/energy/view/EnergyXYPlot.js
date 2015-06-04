// Copyright 2002-2015, University of Colorado Boulder

/**
 * The "Energy Graph" is an XY plot of displacement (x axis) vs energy (y axis).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var HookesLawFont = require( 'HOOKES_LAW/common/HookesLawFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LineArrowNode = require( 'HOOKES_LAW/common/view/LineArrowNode' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var displacementString = require( 'string!HOOKES_LAW/displacement' );
  var energyString = require( 'string!HOOKES_LAW/energy' );

  //TODO duplication here with ForceXYPlot
  // constants
  var AXIS_OPTIONS = {
    headHeight: 10,
    headWidth: 10,
    tailWidth: 1,
    fill: 'black',
    stroke: null
  };
  var LEADER_LINE_OPTIONS = {
    stroke: 'black',
    lineWidth: 1,
    lineDash: [ 3, 3 ]
  };
  var TICK_LENGTH = 10;
  var TICK_OPTIONS = {
    stroke: 'black',
    lineWidth: 1
  };
  var Y_AXIS_HEIGHT = 270;

  /**
   * @param {Spring} spring
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Object} [options]
   * @constructor
   */
  function EnergyXYPlot( spring, options ) {

    options = _.extend( {
      modelViewTransform: ModelViewTransform2.createIdentity(),
      valuesVisibleProperty: new Property( true ),
      displacementVectorVisibleProperty: new Property( true )
    }, options );

    // x axis
    var minX = options.modelViewTransform.modelToViewX( 1.1 * spring.displacementRange.min );
    var maxX = options.modelViewTransform.modelToViewX( 1.1 * spring.displacementRange.max );
    var xAxisNode = new ArrowNode( minX, 0, maxX, 0, AXIS_OPTIONS );
    var xAxisLabel = new Text( displacementString, {
      font: new HookesLawFont( 16 ),
      left: xAxisNode.right + 4,
      centerY: xAxisNode.centerY
    } );

    // y axis
    var yAxisNode = new ArrowNode( 0, 0, 0, -Y_AXIS_HEIGHT, AXIS_OPTIONS );
    var yAxisLabel = new Text( energyString, {
      font: new HookesLawFont( 16 ),
      centerX: yAxisNode.centerX,
      bottom: yAxisNode.top - 2
    } );

    // point and the dashed lines that connect to it
    var pointNode = new Circle( 5, {
      fill: HookesLawColors.TOTAL_SPRING_FORCE //TODO why is this using this color in mockups?
    } );

    // displacement nodes
    var displacementVectorNode = new LineArrowNode( 0, 0, 1, 0, HookesLawConstants.DISPLACEMENT_VECTOR_OPTIONS );
    var displacementValueNode = new Text( '', {
      fill: HookesLawColors.DISPLACEMENT,
      font: HookesLawConstants.XY_PLOT_VALUE_FONT
    } );
    var displacementTickNode = new Line( 0, 0, 0, TICK_LENGTH, _.extend( TICK_OPTIONS, {
      centerY: xAxisNode.centerY
    } ) );
    var displacementLeaderLine = new Line( 0, 0, 0, 1, LEADER_LINE_OPTIONS );

    options.children = [
      xAxisNode, xAxisLabel, yAxisNode, yAxisLabel,
      displacementLeaderLine, forceLeaderLine, pointNode,
      displacementTickNode, displacementVectorNode, displacementValueNode,
    ];
    Node.call( this, options );

    //TODO more efficient to have 1 observer?
    // visibility
    options.displacementVectorVisibleProperty.linkAttribute( displacementVectorNode, 'visible' );
    options.valuesVisibleProperty.linkAttribute( displacementValueNode, 'visible' );
    options.valuesVisibleProperty.linkAttribute( displacementTickNode, 'visible' );
    options.valuesVisibleProperty.linkAttribute( displacementLeaderLine, 'visible' );
    //options.valuesVisibleProperty.linkAttribute( energyValueNode, 'visible' );
    //options.valuesVisibleProperty.linkAttribute( energyTickNode, 'visible' );
    //options.valuesVisibleProperty.linkAttribute( energyLeaderLine, 'visible' );
  }

  return inherit( Node, EnergyXYPlot );
} );