// Copyright 2015-2018, University of Colorado Boulder

/**
 * Bar graph representation of Energy.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Tandem = require( 'TANDEM/Tandem' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );

  // strings
  var joulesString = require( 'string!HOOKES_LAW/joules' );
  var pattern0Value1UnitsString = require( 'string!HOOKES_LAW/pattern.0value.1units' );
  var potentialEnergyString = require( 'string!HOOKES_LAW/potentialEnergy' );

  // constants
  var BAR_WIDTH = 20;

  /**
   * @param {Spring} spring
   * @param {BooleanProperty} valueVisibleProperty - whether value is visible on the graph
   * @param {Object} [options]
   * @constructor
   */
  function EnergyBarGraph( spring, valueVisibleProperty, options ) {

    options = _.extend( {
      // phet-io
      tandem: Tandem.required
    }, options );

    var xAxisNode = new Line( 0, 0, 1.65 * BAR_WIDTH, 0, {
      stroke: 'black',
      lineWidth: 0.25
    } );

    var yAxisNode = new ArrowNode( 0, 0, 0, -HookesLawConstants.ENERGY_Y_AXIS_LENGTH, {
      headHeight: 10,
      headWidth: 10,
      tailWidth: 1,
      fill: 'black',
      stroke: null
    } );

    var yAxisLabel = new Text( potentialEnergyString, {
      rotation: -Math.PI / 2,
      font: HookesLawConstants.BAR_GRAPH_AXIS_FONT,
      right: yAxisNode.left - 1,
      centerY: yAxisNode.centerY,
      maxWidth: 0.85 * yAxisNode.height // constrain for i18n
    } );

    var barNode = new Rectangle( 0, 0, BAR_WIDTH, 1, {
      fill: HookesLawColors.ENERGY,
      centerX: xAxisNode.centerX
    } );

    var valueNode = new Text( '', {
      maxWidth: 100, // i18n
      fill: HookesLawColors.ENERGY,
      font: HookesLawConstants.BAR_GRAPH_VALUE_FONT
    } );

    assert && assert( !options.children, 'EnergyBarGraph sets children' );
    options.children = [ barNode, valueNode, xAxisNode, yAxisNode, yAxisLabel ];

    spring.potentialEnergyProperty.link( function( energy ) {

      // resize the bar
      barNode.visible = ( energy > 0 ); // because we can't create a zero height rectangle
      var height = Math.max( 1, energy * HookesLawConstants.UNIT_ENERGY_Y ); // bar must have non-zero size
      barNode.setRect( 0, -height, BAR_WIDTH, height ); // bar grows up

      // change the value
      valueNode.text = StringUtils.format( pattern0Value1UnitsString, Util.toFixed( energy, HookesLawConstants.ENERGY_DECIMAL_PLACES ), joulesString );
      valueNode.left = barNode.right + 5;
      if ( !barNode.visible || barNode.height < valueNode.height / 2 ) {
        valueNode.bottom = xAxisNode.bottom;
      }
      else {
        valueNode.centerY = barNode.top;
      }
    } );

    valueVisibleProperty.linkAttribute( valueNode, 'visible' );

    Node.call( this, options );
  }

  hookesLaw.register( 'EnergyBarGraph', EnergyBarGraph );

  return inherit( Node, EnergyBarGraph );
} );
