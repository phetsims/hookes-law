// Copyright 2015-2018, University of Colorado Boulder

/**
 * EnergyPlot is an XY plot of displacement (x axis) vs energy (y axis).
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var Tandem = require( 'TANDEM/Tandem' );
  var XYPointPlot = require( 'HOOKES_LAW/energy/view/XYPointPlot' );

  // strings
  var displacementString = require( 'string!HOOKES_LAW/displacement' );
  var joulesString = require( 'string!HOOKES_LAW/joules' );
  var metersString = require( 'string!HOOKES_LAW/meters' );
  var potentialEnergyString = require( 'string!HOOKES_LAW/potentialEnergy' );

  /**
   * @param {Spring} spring
   * @param {number} unitDisplacementLength - view length of a 1m displacement vector
   * @param {BooleanProperty} valuesVisibleProperty - whether values are visible on the plot
   * @param {BooleanProperty} displacementVectorVisibleProperty - whether the horizontal displacement is displayed
   * @param {Object} [options]
   * @constructor
   */
  function EnergyPlot( spring, unitDisplacementLength, valuesVisibleProperty, displacementVectorVisibleProperty, options ) {

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
      minY: 0,
      maxY: HookesLawConstants.ENERGY_Y_AXIS_LENGTH,
      yString: potentialEnergyString,
      yUnits: joulesString,
      yDecimalPlaces: HookesLawConstants.ENERGY_DECIMAL_PLACES,
      yValueFill: HookesLawColors.ENERGY,
      yUnitLength: HookesLawConstants.UNIT_ENERGY_Y, // length of a 1J energy vector
      yValueBackgroundColor: 'rgba( 255, 255, 255, 0.7)', // translucent background, because value sometimes overlaps the curve

      // phet-io
      tandem: Tandem.required

    }, options );

    XYPointPlot.call( this, spring.displacementProperty, spring.potentialEnergyProperty,
      valuesVisibleProperty, displacementVectorVisibleProperty, options );

    // Parabola that corresponds to E = ( k * x * x ) / 2
    var energyParabolaNode = new Path( null, {
      stroke: HookesLawColors.ENERGY,
      lineWidth: 3
    } );
    this.addChild( energyParabolaNode );
    energyParabolaNode.moveToBack();

    // Redraws the parabola when the spring constant changes.
    spring.springConstantProperty.link( function( springConstant ) {

      var displacementRange = spring.displacementRange; // to improve readability

      // verify that range is symmetric around zero, so we can compute point for half of the parabola
      assert && assert( Math.abs( displacementRange.min ) === displacementRange.max );

      // displacement values
      var d1 = displacementRange.max;
      var d2 = displacementRange.max / 2;
      var d3 = 0;

      // corresponding energy values, E = ( k * x * x ) / 2
      var e1 = ( springConstant * d1 * d1 ) / 2;
      var e2 = ( springConstant * d2 * d2 ) / 2;
      var e3 = ( springConstant * d3 * d3 ) / 2;

      // convert to view coordinates
      var x1 = unitDisplacementLength * d1;
      var x2 = unitDisplacementLength * d2;
      var x3 = unitDisplacementLength * d3;
      var y1 = -options.yUnitLength * e1;
      var y2 = -options.yUnitLength * e2;
      var y3 = -options.yUnitLength * e3;

      // control points - close approximation, quick to calculate, general formula:
      // cpx = 2 * anywhereOnCurveX - startX/2 - endX/2
      // cpy = 2 * anywhereOnCurveY - startY/2 - endY/2
      var cpx = ( 2 * x2 ) - ( x1 / 2 ) - ( x3 / 2 );
      var cpy = ( 2 * y2 ) - ( y1 / 2 ) - ( y3 / 2 );

      // parabola
      energyParabolaNode.shape = new Shape()
        .moveTo( -x1, y1 )
        .quadraticCurveTo( -cpx, cpy, x3, y3 )
        .quadraticCurveTo( cpx, cpy, x1, y1 );
    } );
  }

  hookesLaw.register( 'EnergyPlot', EnergyPlot );

  return inherit( Node, EnergyPlot );
} );