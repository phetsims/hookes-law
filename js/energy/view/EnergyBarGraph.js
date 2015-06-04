// Copyright 2002-2015, University of Colorado Boulder

/**
 * Bar graph representation of Energy.
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
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  // strings
  var energyString = require( 'string!HOOKES_LAW/energy' );
  var joulesString = require( 'string!HOOKES_LAW/joules' );
  var pattern_0value_1units = require( 'string!HOOKES_LAW/pattern.0value.1units' );

  // constants
  var AXIS_LINE_WIDTH = 1;
  var AXIS_COLOR = 'black';
  var UNIT_ENERGY_VECTOR_LENGTH = 1.1; //TODO this needs to be the same as EnergyXYPlot.UNIT_ENERGY_VECTOR_LENGTH
  var Y_AXIS_LENGTH = 250; //TODO this needs to be the same as EnergyXYPlot.Y_AXIS_LENGTH

  /**
   * @param {Spring} spring
   * @param {Object} [options]
   * @constructor
   */
  function EnergyBarGraph( spring, options ) {

    options = _.extend( {
      valueVisibleProperty: new Property( true )
    }, options );

    var xAxisNode = new Line( 0, 0, 40, 0, {
      stroke: AXIS_COLOR,
      lineWidth: AXIS_LINE_WIDTH
    } );

    var yAxisNode = new ArrowNode( 0, 0, 0, -Y_AXIS_LENGTH, {
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

    var barNode = new Rectangle( 0, 0, 1, 1, {
      fill: HookesLawColors.ENERGY
    } );

    var valueNode = new Text( '', {
      font: new HookesLawFont( 16 )
    } );

    options.children = [ barNode, valueNode, xAxisNode, yAxisNode, yAxisLabel ];
    Node.call( this, options );

    spring.energyProperty.link( function( energy ) {

      // resize the bar
      barNode.visible = ( energy > 0 );
      var width = 0.4 * xAxisNode.width;
      var height = Math.max( 1, energy * UNIT_ENERGY_VECTOR_LENGTH ); // bar must have non-zero size
      barNode.setRect( 0, -height, width, height ); // bar grows up
      barNode.centerX = xAxisNode.centerX;

      // change the value
      valueNode.text = StringUtils.format( pattern_0value_1units, Util.toFixed( energy, HookesLawConstants.ENERGY_DECIMAL_PLACES ), joulesString );
      valueNode.left = barNode.right + 3;
      if ( !barNode.visible || barNode.height < valueNode.height / 2 ) {
        valueNode.bottom = xAxisNode.bottom;
      }
      else {
        valueNode.centerY = barNode.top;
      }
    } );

    options.valueVisibleProperty.linkAttribute( valueNode, 'visible' );
  }

  return inherit( Node, EnergyBarGraph );
} );
