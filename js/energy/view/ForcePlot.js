// Copyright 2015-2019, University of Colorado Boulder

/**
 *  ForcePlot is an XY plot of displacement (x axis) vs force (y axis),
 *  with energy (E) being the area under the curve.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  const HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  const HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Line = require( 'SCENERY/nodes/Line' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Property = require( 'AXON/Property' );
  const Shape = require( 'KITE/Shape' );
  const Tandem = require( 'TANDEM/Tandem' );
  const Util = require( 'DOT/Util' );
  const XYPointPlot = require( 'HOOKES_LAW/energy/view/XYPointPlot' );

  // strings
  const appliedForceString = require( 'string!HOOKES_LAW/appliedForce' );
  const displacementString = require( 'string!HOOKES_LAW/displacement' );
  const metersString = require( 'string!HOOKES_LAW/meters' );
  const newtonsString = require( 'string!HOOKES_LAW/newtons' );

  /**
   * @param {Spring} spring
   * @param {number} unitDisplacementLength - view length of a 1m displacement vector
   * @param {BooleanProperty} valuesVisibleProperty - whether values are visible on the plot
   * @param {BooleanProperty} displacementVectorVisibleProperty - whether the horizontal displacement is displayed
   * @param {BooleanProperty} energyVisibleProperty - whether the area that represents energy is filled in
   * @param {Object} [options]
   * @constructor
   */
  function ForcePlot( spring, unitDisplacementLength,
                      valuesVisibleProperty, displacementVectorVisibleProperty, energyVisibleProperty, options ) {

    options = _.extend( {

      // both axes
      axisFont: HookesLawConstants.XY_PLOT_AXIS_FONT,
      valueFont: HookesLawConstants.XY_PLOT_VALUE_FONT,

      // point
      pointFill: HookesLawColors.SINGLE_SPRING,

      // x axis
      minX: unitDisplacementLength * ( 1.1 * spring.displacementRange.min ),
      maxX: unitDisplacementLength * ( 1.1 * spring.displacementRange.max ),
      xString: displacementString,
      xUnits: metersString,
      xDecimalPlaces: HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES,
      xValueFill: HookesLawColors.DISPLACEMENT,
      xUnitLength: unitDisplacementLength,
      xLabelMaxWidth: 100, // constrain width for i18n, determined empirically

      // y axis
      minY: -HookesLawConstants.FORCE_Y_AXIS_LENGTH / 2,
      maxY: HookesLawConstants.FORCE_Y_AXIS_LENGTH / 2,
      yString: appliedForceString,
      yUnits: newtonsString,
      yDecimalPlaces: HookesLawConstants.APPLIED_FORCE_DECIMAL_PLACES,
      yValueFill: HookesLawColors.APPLIED_FORCE,
      yUnitLength: HookesLawConstants.UNIT_FORCE_Y,

      // phet-io
      tandem: Tandem.required

    }, options );

    XYPointPlot.call( this, spring.displacementProperty, spring.appliedForceProperty,
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
    spring.springConstantProperty.link( function( springConstant ) {

      // x
      const minDisplacement = options.xUnitLength * spring.displacementRange.min;
      const maxDisplacement = options.xUnitLength * spring.displacementRange.max;

      // F = kx
      const minForce = -options.yUnitLength * springConstant * spring.displacementRange.min;
      const maxForce = -options.yUnitLength * springConstant * spring.displacementRange.max;
      forceLineNode.setLine( minDisplacement, minForce, maxDisplacement, maxForce );
    } );

    // update energy area (triangle)
    Property.multilink( [ spring.displacementProperty, spring.appliedForceProperty, energyVisibleProperty ],
      function( displacement, appliedForce, visible ) {
        const fixedDisplacement = Util.toFixedNumber( displacement, options.xDecimalPlaces );
        const x = options.xUnitLength * fixedDisplacement;
        const y = -appliedForce * options.yUnitLength;
        energyPath.visible = ( fixedDisplacement !== 0 && visible );
        if ( energyPath.visible ) {
          energyPath.shape = new Shape().moveTo( 0, 0 ).lineTo( x, 0 ).lineTo( x, y ).close();
        }
      } );
  }

  hookesLaw.register( 'ForcePlot', ForcePlot );

  return inherit( XYPointPlot, ForcePlot );
} );