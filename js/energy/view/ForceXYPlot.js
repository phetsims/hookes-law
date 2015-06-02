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
  var DisplacementVectorNode = require( 'HOOKES_LAW/common/view/DisplacementVectorNode' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var HookesLawFont = require( 'HOOKES_LAW/common/HookesLawFont' );
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

  /**
   * @param {Spring} spring
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Object} [options]
   * @constructor
   */
  function ForceXYPlot( spring, modelViewTransform, options ) {

    options = options || {};

    var minX = modelViewTransform.modelToViewX( 1.1 * spring.displacementRange.min );
    var maxX = modelViewTransform.modelToViewX( 1.1 * spring.displacementRange.max );
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

    var displacementVectorNode = new DisplacementVectorNode( spring.displacementProperty, modelViewTransform, {
      verticalLineVisible: false
    } ); //TODO make Property optional

    options.children = [ xAxisNode, xAxisLabel, yAxisNode, yAxisLabel, displacementVectorNode ];
    Node.call( this, options );
  }

  return inherit( Node, ForceXYPlot );
} );