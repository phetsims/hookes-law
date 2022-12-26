// Copyright 2015-2022, University of Colorado Boulder

// @ts-nocheck
/**
 * Bar graph representation of Energy.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import { Line, Node, Rectangle, Text } from '../../../../scenery/js/imports.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import HookesLawColors from '../../common/HookesLawColors.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawStrings from '../../HookesLawStrings.js';

// constants
const BAR_WIDTH = 20;

export default class EnergyBarGraph extends Node {

  /**
   * @param {Spring} spring
   * @param {BooleanProperty} valueVisibleProperty - whether value is visible on the graph
   * @param {Object} [options]
   */
  constructor( spring, valueVisibleProperty, options ) {

    options = merge( {
      // phet-io
      tandem: Tandem.REQUIRED
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

    const yAxisText = new Text( HookesLawStrings.potentialEnergyStringProperty, {
      rotation: -Math.PI / 2,
      font: HookesLawConstants.BAR_GRAPH_AXIS_FONT,
      right: yAxisNode.left - 1,
      centerY: yAxisNode.centerY,
      maxWidth: 0.85 * yAxisNode.height, // constrain for i18n
      tandem: options.tandem.createTandem( 'yAxisText' )
    } );

    const barNode = new Rectangle( 0, 0, BAR_WIDTH, 1, {
      fill: HookesLawColors.ENERGY,
      centerX: xAxisNode.centerX
    } );

    const valueText = new Text( '', {
      maxWidth: 100, // i18n
      fill: HookesLawColors.ENERGY,
      font: HookesLawConstants.BAR_GRAPH_VALUE_FONT,
      tandem: options.tandem.createTandem( 'valueText' )
    } );

    assert && assert( !options.children, 'EnergyBarGraph sets children' );
    options.children = [ barNode, valueText, xAxisNode, yAxisNode, yAxisText ];

    spring.potentialEnergyProperty.link( energy => {

      // resize the bar
      barNode.visible = ( energy > 0 ); // because we can't create a zero height rectangle
      const height = Math.max( 1, energy * HookesLawConstants.UNIT_ENERGY_Y ); // bar must have non-zero size
      barNode.setRect( 0, -height, BAR_WIDTH, height ); // bar grows up

      // change the value
      valueText.text = StringUtils.format( HookesLawStrings.pattern[ '0value' ][ '1units' ],
        Utils.toFixed( energy, HookesLawConstants.ENERGY_DECIMAL_PLACES ), HookesLawStrings.joules );
      valueText.left = barNode.right + 5;
      if ( !barNode.visible || barNode.height < valueText.height / 2 ) {
        valueText.bottom = xAxisNode.bottom;
      }
      else {
        valueText.centerY = barNode.top;
      }
    } );

    valueVisibleProperty.linkAttribute( valueText, 'visible' );

    super( options );
  }
}

hookesLaw.register( 'EnergyBarGraph', EnergyBarGraph );