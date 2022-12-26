// Copyright 2015-2022, University of Colorado Boulder

/**
 * EnergyPlot is an XY plot of displacement (x-axis) vs energy (y-axis).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import { Shape } from '../../../../kite/js/imports.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import { NodeTranslationOptions, Path } from '../../../../scenery/js/imports.js';
import HookesLawColors from '../../common/HookesLawColors.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import Spring from '../../common/model/Spring.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawStrings from '../../HookesLawStrings.js';
import XYPointPlot, { XYPointPlotOptions } from './XYPointPlot.js';

type SelfOptions = EmptySelfOptions;

type EnergyPlotOptions = SelfOptions & NodeTranslationOptions & PickRequired<XYPointPlotOptions, 'tandem' | 'visibleProperty'>;

export default class EnergyPlot extends XYPointPlot {

  /**
   * @param spring
   * @param unitDisplacementLength - view length of a 1m displacement vector
   * @param valuesVisibleProperty - whether values are visible on the plot
   * @param displacementVectorVisibleProperty - whether the horizontal displacement is displayed
   * @param providedOptions
   */
  public constructor( spring: Spring,
                      unitDisplacementLength: number,
                      valuesVisibleProperty: TReadOnlyProperty<boolean>,
                      displacementVectorVisibleProperty: TReadOnlyProperty<boolean>,
                      providedOptions: EnergyPlotOptions ) {

    const options = optionize<EnergyPlotOptions, SelfOptions, XYPointPlotOptions>()( {

      // XYPointPlotOptions
      // both axes
      axisFont: HookesLawConstants.XY_PLOT_AXIS_FONT,
      valueFont: HookesLawConstants.XY_PLOT_VALUE_FONT,

      // x-axis
      minX: unitDisplacementLength * ( 1.1 * spring.displacementRange.min ),
      maxX: unitDisplacementLength * ( 1.1 * spring.displacementRange.max ),
      xString: HookesLawStrings.displacement,
      xUnits: HookesLawStrings.meters,
      xDecimalPlaces: HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES,
      xValueFill: HookesLawColors.DISPLACEMENT,
      xUnitLength: unitDisplacementLength,
      xLabelMaxWidth: 100, // constrain width for i18n, determined empirically

      // y-axis
      minY: 0,
      maxY: HookesLawConstants.ENERGY_Y_AXIS_LENGTH,
      yString: HookesLawStrings.potentialEnergy,
      yUnits: HookesLawStrings.joules,
      yDecimalPlaces: HookesLawConstants.ENERGY_DECIMAL_PLACES,
      yValueFill: HookesLawColors.ENERGY,
      yUnitLength: HookesLawConstants.UNIT_ENERGY_Y, // length of a 1J energy vector
      yValueBackgroundColor: 'rgba( 255, 255, 255, 0.7)', // translucent background, because value sometimes overlaps the curve

      // point
      pointFill: HookesLawColors.SINGLE_SPRING
    }, providedOptions );

    super( spring.displacementProperty, spring.potentialEnergyProperty,
      valuesVisibleProperty, displacementVectorVisibleProperty, options );

    // Parabola that corresponds to E = ( k * x * x ) / 2
    const energyParabolaNode = new Path( null, {
      stroke: HookesLawColors.ENERGY,
      lineWidth: 3
    } );
    this.addChild( energyParabolaNode );
    energyParabolaNode.moveToBack();

    // Redraws the parabola when the spring constant changes.
    spring.springConstantProperty.link( springConstant => {

      const displacementRange = spring.displacementRange; // to improve readability

      // verify that range is symmetric around zero, so we can compute point for half of the parabola
      assert && assert( Math.abs( displacementRange.min ) === displacementRange.max );

      // displacement values
      const d1 = displacementRange.max;
      const d2 = displacementRange.max / 2;
      const d3 = 0;

      // corresponding energy values, E = ( k * x * x ) / 2
      const e1 = ( springConstant * d1 * d1 ) / 2;
      const e2 = ( springConstant * d2 * d2 ) / 2;
      const e3 = ( springConstant * d3 * d3 ) / 2;

      // convert to view coordinates
      const x1 = unitDisplacementLength * d1;
      const x2 = unitDisplacementLength * d2;
      const x3 = unitDisplacementLength * d3;
      const y1 = -options.yUnitLength * e1;
      const y2 = -options.yUnitLength * e2;
      const y3 = -options.yUnitLength * e3;

      // control points - close approximation, quick to calculate, general formula:
      // cpx = 2 * anywhereOnCurveX - startX/2 - endX/2
      // cpy = 2 * anywhereOnCurveY - startY/2 - endY/2
      const cpx = ( 2 * x2 ) - ( x1 / 2 ) - ( x3 / 2 );
      const cpy = ( 2 * y2 ) - ( y1 / 2 ) - ( y3 / 2 );

      // parabola
      energyParabolaNode.shape = new Shape()
        .moveTo( -x1, y1 )
        .quadraticCurveTo( -cpx, cpy, x3, y3 )
        .quadraticCurveTo( cpx, cpy, x1, y1 );
    } );
  }
}

hookesLaw.register( 'EnergyPlot', EnergyPlot );