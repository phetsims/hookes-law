// Copyright 2015-2023, University of Colorado Boulder

/**
 * Bar graph representation of Energy.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Utils from '../../../../dot/js/Utils.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import { Line, Node, NodeOptions, NodeTranslationOptions, Rectangle, Text } from '../../../../scenery/js/imports.js';
import HookesLawColors from '../../common/HookesLawColors.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import Spring from '../../common/model/Spring.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawStrings from '../../HookesLawStrings.js';

// constants
const BAR_WIDTH = 20;

type SelfOptions = EmptySelfOptions;

type EnergyBarGraphOptions = SelfOptions & NodeTranslationOptions & PickRequired<NodeOptions, 'tandem'>;

export default class EnergyBarGraph extends Node {

  public constructor( spring: Spring, valueVisibleProperty: TReadOnlyProperty<boolean>, providedOptions: EnergyBarGraphOptions ) {

    const options = optionize<EnergyBarGraphOptions, SelfOptions, NodeOptions>()( {}, providedOptions );

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
      visibleProperty: valueVisibleProperty,
      maxWidth: 100, // i18n
      fill: HookesLawColors.ENERGY,
      font: HookesLawConstants.BAR_GRAPH_VALUE_FONT,
      tandem: options.tandem.createTandem( 'valueText' )
    } );

    options.children = [ barNode, valueText, xAxisNode, yAxisNode, yAxisText ];

    spring.potentialEnergyProperty.link( energy => {

      // resize the bar
      barNode.visible = ( energy > 0 ); // because we can't create a zero height rectangle
      const height = Math.max( 1, energy * HookesLawConstants.UNIT_ENERGY_Y ); // bar must have non-zero size
      barNode.setRect( 0, -height, BAR_WIDTH, height ); // bar grows up

      // change the value
      valueText.string = StringUtils.format( HookesLawStrings.pattern[ '0value' ][ '1units' ],
        Utils.toFixed( energy, HookesLawConstants.ENERGY_DECIMAL_PLACES ), HookesLawStrings.joules );
      valueText.left = barNode.right + 5;
      if ( !barNode.visible || barNode.height < valueText.height / 2 ) {
        valueText.bottom = xAxisNode.bottom;
      }
      else {
        valueText.centerY = barNode.top;
      }
    } );

    super( options );
  }
}

hookesLaw.register( 'EnergyBarGraph', EnergyBarGraph );