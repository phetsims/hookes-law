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
  var DisplacementVectorNode = require( 'HOOKES_LAW/common/view/DisplacementVectorNode' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var HookesLawFont = require( 'HOOKES_LAW/common/HookesLawFont' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var appliedForceString = require( 'string!HOOKES_LAW/appliedForce' );
  var displacementString = require( 'string!HOOKES_LAW/displacement' );

  // constants
  var AXIS_LINE_WIDTH = 1;
  var AXIS_COLOR = 'black';
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

    options.children = [ xAxisNode, xAxisLabel, yAxisNode, yAxisLabel, displacementVectorNode, pointNode ];
    Node.call( this, options );

    options.displacementVectorVisibleProperty.linkAttribute( displacementVectorNode, 'visible' );

    spring.appliedForceProperty.link( function( appliedForce ) {
      pointNode.y = appliedForce * UNIT_APPLIED_FORCE_VECTOR_LENGTH;
    } );
    spring.displacementProperty.link( function( displacement ) {
      pointNode.x = options.modelViewTransform.modelToViewX( displacement );
    } );
  }

  return inherit( Node, ForceXYPlot );
} );