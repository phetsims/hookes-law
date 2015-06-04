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
  var HookesLawFont = require( 'HOOKES_LAW/common/HookesLawFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var displacementString = require( 'string!HOOKES_LAW/displacement' );
  var energyString = require( 'string!HOOKES_LAW/energy' );

  // constants
  var AXIS_LINE_WIDTH = 1;
  var AXIS_COLOR = 'black';
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
    var yAxisNode = new ArrowNode( 0, 0, 0, -Y_AXIS_HEIGHT, {
      headHeight: 10,
      headWidth: 10,
      tailWidth: AXIS_LINE_WIDTH,
      fill: AXIS_COLOR,
      stroke: null
    } );
    var yAxisLabel = new Text( energyString, {
      font: new HookesLawFont( 16 ),
      centerX: yAxisNode.centerX,
      bottom: yAxisNode.top - 2
    } );

    options.children = [
      xAxisNode, xAxisLabel, yAxisNode, yAxisLabel
    ];
    Node.call( this, options );
  }

  return inherit( Node, EnergyXYPlot );
} );