// Copyright 2015-2018, University of Colorado Boulder

/**
 * Bar graph representation of Energy.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  const hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  const HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  const HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Line = require( 'SCENERY/nodes/Line' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Util = require( 'DOT/Util' );

  // strings
  const joulesString = require( 'string!HOOKES_LAW/joules' );
  const pattern0Value1UnitsString = require( 'string!HOOKES_LAW/pattern.0value.1units' );
  const potentialEnergyString = require( 'string!HOOKES_LAW/potentialEnergy' );

  // constants
  const BAR_WIDTH = 20;

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

    const xAxisNode = new Line( 0, 0, 1.65 * BAR_WIDTH, 0, {
      stroke: 'black',
      lineWidth: 0.25
    } );

    const yAxisNode = new ArrowNode( 0, 0, 0, -HookesLawConstants.ENERGY_Y_AXIS_LENGTH, {
      headHeight: 10,
      headWidth: 10,
      tailWidth: 1,
      fill: 'black',
      stroke: null
    } );

    const yAxisLabel = new Text( potentialEnergyString, {
      rotation: -Math.PI / 2,
      font: HookesLawConstants.BAR_GRAPH_AXIS_FONT,
      right: yAxisNode.left - 1,
      centerY: yAxisNode.centerY,
      maxWidth: 0.85 * yAxisNode.height // constrain for i18n
    } );

    const barNode = new Rectangle( 0, 0, BAR_WIDTH, 1, {
      fill: HookesLawColors.ENERGY,
      centerX: xAxisNode.centerX
    } );

    const valueNode = new Text( '', {
      maxWidth: 100, // i18n
      fill: HookesLawColors.ENERGY,
      font: HookesLawConstants.BAR_GRAPH_VALUE_FONT
    } );

    assert && assert( !options.children, 'EnergyBarGraph sets children' );
    options.children = [ barNode, valueNode, xAxisNode, yAxisNode, yAxisLabel ];

    spring.potentialEnergyProperty.link( function( energy ) {

      // resize the bar
      barNode.visible = ( energy > 0 ); // because we can't create a zero height rectangle
      const height = Math.max( 1, energy * HookesLawConstants.UNIT_ENERGY_Y ); // bar must have non-zero size
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
