// Copyright 2002-2015, University of Colorado Boulder

/**
 * View for the "Energy" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var CheckBox = require( 'SUN/CheckBox' );
  var EnergyBarGraph = require( 'HOOKES_LAW/energy/view/EnergyBarGraph' );
  var EnergyXYPlot = require( 'HOOKES_LAW/energy/view/EnergyXYPlot' );
  var EnergySystemNode = require( 'HOOKES_LAW/energy/view/EnergySystemNode' );
  var EnergyViewProperties = require( 'HOOKES_LAW/energy/view/EnergyViewProperties' );
  var EnergyVisibilityPanel = require( 'HOOKES_LAW/energy/view/EnergyVisibilityPanel' );
  var ForceXYPlot = require( 'HOOKES_LAW/energy/view/ForceXYPlot' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HookesLawColors = require( 'HOOKES_LAW/common/HookesLawColors' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var HookesLawFont = require( 'HOOKES_LAW/common/HookesLawFont' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var Path = require( 'SCENERY/nodes/Path' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Shape = require( 'KITE/Shape' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var energyString = require( 'string!HOOKES_LAW/energy' );

  /**
   * @param {EnergyModel} model
   * @constructor
   */
  function EnergyView( model ) {

    ScreenView.call( this, HookesLawConstants.SCREEN_VIEW_OPTIONS );

    var unitDisplacementLength = HookesLawConstants.UNIT_DISPLACEMENT_X;

    // Properties that are specific to the view
    var viewProperties = new EnergyViewProperties();

    // Visibility controls
    var visibilityPanel = new EnergyVisibilityPanel( viewProperties, {
      right: this.layoutBounds.right - 10,
      top: 10,
      maxWidth: 235 // constrain width for i18n, determining empirically
    } );
    this.addChild( visibilityPanel );

    // System
    var systemNode = new EnergySystemNode( model.system, viewProperties, {
      unitDisplacementLength: unitDisplacementLength,
      number: 1,
      left: this.layoutBounds.left + 35,
      bottom: this.layoutBounds.bottom - 10
    } );
    this.addChild( systemNode );

    // Energy bar graph
    var energyBarGraph = new EnergyBarGraph( model.system.spring, {
      valueVisibleProperty: viewProperties.valuesVisibleProperty,
      // x position depends on whether XY plots are visible
      bottom: systemNode.top - 35
    } );
    this.addChild( energyBarGraph );

    // Force XY plot
    var forceXYPlot = new ForceXYPlot( model.system.spring, unitDisplacementLength, {
      xVectorVisibleProperty: viewProperties.displacementVectorVisibleProperty,
      valuesVisibleProperty: viewProperties.valuesVisibleProperty,
      energyVisibleProperty: viewProperties.energyOnForcePlotVisibleProperty,
      // origin aligned with equilibrium position
      x: systemNode.x + ( unitDisplacementLength * model.system.spring.equilibriumXProperty.get() ),
      bottom: energyBarGraph.bottom
    } );
    this.addChild( forceXYPlot );

    // Check box for showing energy on Force XY plot
    var energyIcon = new HBox( {
      children: [
        new Text( energyString, { font: new HookesLawFont( 14 ) } ),
        new Path( new Shape().moveTo( 0, 0 ).lineTo( 20, 0 ).lineTo( 20, -10 ).close(), { fill: HookesLawColors.ENERGY } )
      ],
      spacing: 6
    } );
    var energyControlPanel = new Panel( new CheckBox( energyIcon,
      viewProperties.energyOnForcePlotVisibleProperty,
      HookesLawConstants.CHECK_BOX_OPTIONS ), {
      stroke: HookesLawColors.CONTROL_PANEL_STROKE,
      fill: HookesLawColors.CONTROL_PANEL_FILL,
      left: forceXYPlot.left + 10,
      top: forceXYPlot.top + 30,
      xMargin: 10,
      maxWidth: 200 // constrain for i18n, determined empirically
    } );
    this.addChild( energyControlPanel );

    // Energy XY plot
    var energyXYPlot = new EnergyXYPlot( model.system.spring, unitDisplacementLength, {
      xVectorVisibleProperty: viewProperties.displacementVectorVisibleProperty,
      valuesVisibleProperty: viewProperties.valuesVisibleProperty,
      x: forceXYPlot.x,
      y: energyBarGraph.bottom
    } );
    this.addChild( energyXYPlot );

    // Reset All button, bottom right
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
        viewProperties.reset();
      },
      right: this.layoutBounds.maxX - 15,
      bottom: this.layoutBounds.maxY - 15
    } );
    this.addChild( resetAllButton );

    // Observe view properties
    viewProperties.graphProperty.link( function( graph ) {

      forceXYPlot.visible = energyControlPanel.visible = ( graph === 'forceXY' );
      energyXYPlot.visible = ( graph === 'energyXY' );

      if ( graph === 'energyBar' ) {
        // aligned with equilibrium position
        energyBarGraph.x = systemNode.x + ( unitDisplacementLength * model.system.spring.equilibriumXProperty.get() );
      }
      else {
        energyBarGraph.left = 15;
      }
    } );
  }

  return inherit( ScreenView, EnergyView );
} );