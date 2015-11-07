// Copyright 2015, University of Colorado Boulder

/**
 *  The "Force Graph" is an XY plot of displacement (x axis) vs force (y axis), with energy (E) being the area under the curve.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Property = require( 'AXON/Property' );
  var Shape = require( 'KITE/Shape' );
  var Util = require( 'DOT/Util' );
  var XYPointPlot = require( 'HOOKES_LAW/energy/view/XYPointPlot' );

  // strings
  var appliedForceString = require( 'string!HOOKES_LAW/appliedForce' );
  var displacementString = require( 'string!HOOKES_LAW/displacement' );
  var metersString = require( 'string!HOOKES_LAW/meters' );
  var newtonsString = require( 'string!HOOKES_LAW/newtons' );

  /**
   * @param {Spring} spring
   * @param {number} unitDisplacementLength - view length of a 1m displacement vector
   * @param {Object} [options]
   * @constructor
   */
  function ForceXYPlot( spring, unitDisplacementLength, options ) {

    options = _.extend( {

      // both axes
      axisFont: HookesLawConstants.XY_PLOT_AXIS_FONT,
      valueFont: HookesLawConstants.XY_PLOT_VALUE_FONT,
      valuesVisibleProperty: new Property( true ), // {boolean} are numeric values visible?
      energyVisibleProperty: new Property( true ), // {boolean} is the energy area (triangle) visible?

      // point
      pointFill: HookesLawColors.SINGLE_SPRING,

      // x axis
      minX: unitDisplacementLength * ( 1.1 * spring.displacementRange.min ),
      maxX: unitDisplacementLength * ( 1.1 * spring.displacementRange.max ),
      xString: displacementString,
      xUnits: metersString,
      xDecimalPlaces: HookesLawConstants.DISPLACEMENT_DECIMAL_PLACES,
      xValueFill: HookesLawColors.DISPLACEMENT,
      xVectorVisibleProperty: new Property( true ),
      xUnitLength: unitDisplacementLength,
      xLabelMaxWidth: 100, // constrain width for i18n, determined empirically

      // y axis
      minY: -HookesLawConstants.FORCE_Y_AXIS_LENGTH / 2,
      maxY: HookesLawConstants.FORCE_Y_AXIS_LENGTH / 2,
      yString: appliedForceString,
      yUnits: newtonsString,
      yDecimalPlaces: HookesLawConstants.APPLIED_FORCE_DECIMAL_PLACES,
      yValueFill: HookesLawColors.APPLIED_FORCE,
      yUnitLength: HookesLawConstants.UNIT_FORCE_Y

    }, options );

    XYPointPlot.call( this, spring.displacementProperty, spring.appliedForceProperty, options );

    // The line that corresponds to F = kx
    var forceLineNode = new Line( 0, 0, 1, 1, {
      stroke: HookesLawColors.APPLIED_FORCE,
      lineWidth: 3
    } );
    this.addChild( forceLineNode );
    forceLineNode.moveToBack();

    // energy area
    var energyPath = new Path( null, {
      fill: HookesLawColors.ENERGY
    } );
    this.addChild( energyPath );
    energyPath.moveToBack();

    // update force line
    spring.springConstantProperty.link( function( springConstant ) {

      // x
      var minDisplacement = options.xUnitLength * spring.displacementRange.min;
      var maxDisplacement = options.xUnitLength * spring.displacementRange.max;

      // F = kx
      var minForce = -options.yUnitLength * springConstant * spring.displacementRange.min;
      var maxForce = -options.yUnitLength * springConstant * spring.displacementRange.max;
      forceLineNode.setLine( minDisplacement, minForce, maxDisplacement, maxForce );
    } );

    // update energy area (triangle)
    Property.multilink( [ spring.displacementProperty, spring.appliedForceProperty, options.energyVisibleProperty ],
      function( displacement, appliedForce, visible ) {
        var fixedDisplacement = Util.toFixedNumber( displacement, options.xDecimalPlaces );
        var x = options.xUnitLength * fixedDisplacement;
        var y = -appliedForce * options.yUnitLength;
        energyPath.visible = ( fixedDisplacement !== 0 && visible );
        if ( energyPath.visible ) {
          energyPath.shape = new Shape().moveTo( 0, 0 ).lineTo( x, 0 ).lineTo( x, y ).close();
        }
      } );
  }

  return inherit( XYPointPlot, ForceXYPlot );
} );