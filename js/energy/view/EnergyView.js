// Copyright 2015, University of Colorado Boulder

/**
 * View for the "Energy" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var EnergyBarGraph = require( 'HOOKES_LAW/energy/view/EnergyBarGraph' );
  var EnergyXYPlot = require( 'HOOKES_LAW/energy/view/EnergyXYPlot' );
  var EnergySystemNode = require( 'HOOKES_LAW/energy/view/EnergySystemNode' );
  var EnergyViewProperties = require( 'HOOKES_LAW/energy/view/EnergyViewProperties' );
  var EnergyVisibilityControls = require( 'HOOKES_LAW/energy/view/EnergyVisibilityControls' );
  var ForceXYPlot = require( 'HOOKES_LAW/energy/view/ForceXYPlot' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );

  /**
   * @param {EnergyModel} model
   * @constructor
   */
  function EnergyView( model ) {

    ScreenView.call( this, HookesLawConstants.SCREEN_VIEW_OPTIONS );

    // View length of 1 meter of displacement
    var unitDisplacementLength = HookesLawConstants.UNIT_DISPLACEMENT_X;

    // Properties that are specific to the view
    var viewProperties = new EnergyViewProperties();

    // Visibility controls
    var visibilityControls = new EnergyVisibilityControls( viewProperties, {
      right: this.layoutBounds.right - 10,
      top: 10,
      maxWidth: 235 // constrain width for i18n, determining empirically
    } );
    this.addChild( visibilityControls );

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

      forceXYPlot.visible = ( graph === 'forceXY' );
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