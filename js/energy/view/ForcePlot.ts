// Copyright 2015-2022, University of Colorado Boulder

/**
 *  ForcePlot is an XY plot of displacement (x-axis) vs force (y-axis),
 *  with energy (E) being the area under the curve.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Multilink from '../../../../axon/js/Multilink.js';
import Utils from '../../../../dot/js/Utils.js';
import { Shape } from '../../../../kite/js/imports.js';
import { Line, NodeTranslationOptions, Path } from '../../../../scenery/js/imports.js';
import HookesLawColors from '../../common/HookesLawColors.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import hookesLaw from '../../hookesLaw.js';
import HookesLawStrings from '../../HookesLawStrings.js';
import XYPointPlot, { XYPointPlotOptions } from './XYPointPlot.js';
import Spring from '../../common/model/Spring.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import PickRequired from '../../../../phet-core/js/types/PickRequired.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';

type SelfOptions = EmptySelfOptions;

type ForcePlotOptions = SelfOptions & NodeTranslationOptions & PickRequired<XYPointPlotOptions, 'tandem' | 'visibleProperty'>;

export default class ForcePlot extends XYPointPlot {

  /**
   * @param spring
   * @param unitDisplacementLength - view length of a 1m displacement vector
   * @param valuesVisibleProperty - whether values are visible on the plot
   * @param displacementVectorVisibleProperty - whether the horizontal displacement is displayed
   * @param energyVisibleProperty - whether the area that represents energy is filled in
   * @param providedOptions
   */
  public constructor( spring: Spring,
                      unitDisplacementLength: number,
                      valuesVisibleProperty: TReadOnlyProperty<boolean>,
                      displacementVectorVisibleProperty: TReadOnlyProperty<boolean>,
                      energyVisibleProperty: TReadOnlyProperty<boolean>,
                      providedOptions: ForcePlotOptions ) {

    const options = optionize<ForcePlotOptions, SelfOptions, XYPointPlotOptions>()( {

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
      minY: -HookesLawConstants.FORCE_Y_AXIS_LENGTH / 2,
      maxY: HookesLawConstants.FORCE_Y_AXIS_LENGTH / 2,
      yString: HookesLawStrings.appliedForce,
      yUnits: HookesLawStrings.newtons,
      yDecimalPlaces: HookesLawConstants.APPLIED_FORCE_DECIMAL_PLACES,
      yValueFill: HookesLawColors.APPLIED_FORCE,
      yUnitLength: HookesLawConstants.UNIT_FORCE_Y,

      // point
      pointFill: HookesLawColors.SINGLE_SPRING
    }, providedOptions );

    super( spring.displacementProperty, spring.appliedForceProperty,
      valuesVisibleProperty, displacementVectorVisibleProperty, options );

    // The line that corresponds to F = kx
    const forceLineNode = new Line( 0, 0, 1, 1, {
      stroke: HookesLawColors.APPLIED_FORCE,
      lineWidth: 3
    } );
    this.addChild( forceLineNode );
    forceLineNode.moveToBack();

    // energy area
    const energyPath = new Path( null, {
      fill: HookesLawColors.ENERGY
    } );
    this.addChild( energyPath );
    energyPath.moveToBack();

    // update force line
    spring.springConstantProperty.link( springConstant => {

      // x
      const minDisplacement = options.xUnitLength * spring.displacementRange.min;
      const maxDisplacement = options.xUnitLength * spring.displacementRange.max;

      // F = kx
      const minForce = -options.yUnitLength * springConstant * spring.displacementRange.min;
      const maxForce = -options.yUnitLength * springConstant * spring.displacementRange.max;
      forceLineNode.setLine( minDisplacement, minForce, maxDisplacement, maxForce );
    } );

    // update energy area (triangle)
    Multilink.multilink( [ spring.displacementProperty, spring.appliedForceProperty, energyVisibleProperty ],
      ( displacement, appliedForce, visible ) => {
        const fixedDisplacement = Utils.toFixedNumber( displacement, options.xDecimalPlaces );
        const x = options.xUnitLength * fixedDisplacement;
        const y = -appliedForce * options.yUnitLength;
        energyPath.visible = ( fixedDisplacement !== 0 && visible );
        if ( energyPath.visible ) {
          energyPath.shape = new Shape().moveTo( 0, 0 ).lineTo( x, 0 ).lineTo( x, y ).close();
        }
      } );
  }
}

hookesLaw.register( 'ForcePlot', ForcePlot );