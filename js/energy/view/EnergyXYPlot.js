// Copyright 2002-2015, University of Colorado Boulder

//TODO factor out lots of duplication with ForceXYPlot
/**
 * The "Energy Graph" is an XY plot of displacement (x axis) vs energy (y axis).
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
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var LineArrowNode = require( 'HOOKES_LAW/common/view/LineArrowNode' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  var displacementString = require( 'string!HOOKES_LAW/displacement' );
  var energyString = require( 'string!HOOKES_LAW/energy' );
  var joulesString = require( 'string!HOOKES_LAW/joules' );
  var metersString = require( 'string!HOOKES_LAW/meters' );
  var pattern_0value_1units = require( 'string!HOOKES_LAW/pattern.0value.1units' );

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
  var UNIT_ENERGY_VECTOR_LENGTH = 1;
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
      font: HookesLawConstants.XY_PLOT_AXIS_FONT,
      left: xAxisNode.right + 4,
      centerY: xAxisNode.centerY
    } );

    // y axis
    var yAxisNode = new ArrowNode( 0, 0, 0, -Y_AXIS_HEIGHT, AXIS_OPTIONS );
    var yAxisLabel = new Text( energyString, {
      font: HookesLawConstants.XY_PLOT_AXIS_FONT,
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

    // energy nodes
    var energyValueNode = new Text( '', {
      fill: HookesLawColors.ENERGY,
      font: HookesLawConstants.XY_PLOT_VALUE_FONT
    } );
    var energyTickNode = new Line( 0, 0, TICK_LENGTH, 0, _.extend( TICK_OPTIONS, {
      centerX: yAxisNode.centerX
    } ) );
    var energyLeaderLine = new Line( 0, 0, 1, 0, LEADER_LINE_OPTIONS );

    options.children = [
      xAxisNode, xAxisLabel, yAxisNode, yAxisLabel,
      displacementLeaderLine, displacementTickNode, displacementValueNode, displacementVectorNode,
      energyLeaderLine, energyTickNode, energyValueNode,
      pointNode
    ];
    Node.call( this, options );

    //TODO more efficient to have 1 observer?
    // visibility
    options.displacementVectorVisibleProperty.linkAttribute( displacementVectorNode, 'visible' );
    options.valuesVisibleProperty.linkAttribute( displacementValueNode, 'visible' );
    options.valuesVisibleProperty.linkAttribute( displacementTickNode, 'visible' );
    options.valuesVisibleProperty.linkAttribute( displacementLeaderLine, 'visible' );
    options.valuesVisibleProperty.linkAttribute( energyValueNode, 'visible' );
    options.valuesVisibleProperty.linkAttribute( energyTickNode, 'visible' );
    options.valuesVisibleProperty.linkAttribute( energyLeaderLine, 'visible' );

    spring.displacementProperty.link( function( displacement ) {

      var fixedDisplacement = Util.toFixedNumber( displacement, HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES );
      var viewDisplacement = options.modelViewTransform.modelToViewX( fixedDisplacement );

      // vector
      displacementVectorNode.visible = ( fixedDisplacement !== 0 && options.displacementVectorVisibleProperty.get() ); // can't draw a zero-length arrow
      if ( fixedDisplacement !== 0 ) {
        displacementVectorNode.setTailAndTip( 0, 0, viewDisplacement, 0 );
      }

      // tick mark
      displacementTickNode.visible = ( fixedDisplacement !== 0 && options.valuesVisibleProperty.get() );
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

    spring.energyProperty.link( function( energy ) {

      var fixedEnergy = Util.toFixedNumber( energy, HookesLawConstants.ENERGY_DECIMAL_PLACES );
      var viewEnergy = fixedEnergy * UNIT_ENERGY_VECTOR_LENGTH;

      // tick mark
      energyTickNode.visible = ( fixedEnergy !== 0 && options.valuesVisibleProperty.get() );
      energyTickNode.centerY = -viewEnergy;

      // value
      var forceText = Util.toFixed( fixedEnergy, HookesLawConstants.ENERGY_DECIMAL_PLACES );
      energyValueNode.text = StringUtils.format( pattern_0value_1units, forceText, joulesString );
      //TODO simplify placement
      var fixedDisplacement = Util.toFixedNumber( spring.displacementProperty.get(), HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES );
      var xSpacing = 4;
      if ( fixedDisplacement >= 0 ) {
        energyValueNode.right = yAxisNode.left - xSpacing;
      }
      else {
        energyValueNode.left = yAxisNode.right + xSpacing;
      }
      var ySpacing = 4;
      if ( Math.abs( viewEnergy ) > ySpacing + energyValueNode.height / 2 ) {
        if ( fixedEnergy >= 0 ) {
          energyValueNode.centerY = -viewEnergy;
        }
        else {
          energyValueNode.centerY = -viewEnergy;
        }
      }
      else {
        if ( fixedEnergy >= 0 ) {
          energyValueNode.bottom = -ySpacing;
        }
        else {
          energyValueNode.top = ySpacing;
        }
      }
    } );

    var pointProperty = new DerivedProperty( [ spring.displacementProperty, spring.energyProperty ],
      function( displacement, energy ) {
        var fixedDisplacement = Util.toFixedNumber( displacement, HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES );
        var x = options.modelViewTransform.modelToViewX( fixedDisplacement );
        var y = -energy * UNIT_ENERGY_VECTOR_LENGTH;
        return new Vector2( x, y );
      } );

    pointProperty.link( function( point ) {

      // point
      pointNode.x = point.x;
      pointNode.y = point.y;

      // leader lines
      displacementLeaderLine.setLine( point.x, 0, point.x, point.y );
      energyLeaderLine.setLine( 0, point.y, point.x, point.y );
    } );
  }

  return inherit( Node, EnergyXYPlot );
} );