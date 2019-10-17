// Copyright 2015-2019, University of Colorado Boulder

/**
 * View for the "Energy" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const EnergyBarGraph = require( 'HOOKES_LAW/energy/view/EnergyBarGraph' );
  const EnergyPlot = require( 'HOOKES_LAW/energy/view/EnergyPlot' );
  const EnergySystemNode = require( 'HOOKES_LAW/energy/view/EnergySystemNode' );
  const EnergyViewProperties = require( 'HOOKES_LAW/energy/view/EnergyViewProperties' );
  const EnergyVisibilityControls = require( 'HOOKES_LAW/energy/view/EnergyVisibilityControls' );
  const ForcePlot = require( 'HOOKES_LAW/energy/view/ForcePlot' );
  const hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  const HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScreenView = require( 'JOIST/ScreenView' );

  /**
   * @param {EnergyModel} model
   * @param {Tandem} tandem
   * @constructor
   */
  function EnergyScreenView( model, tandem ) {

    ScreenView.call( this, merge( {}, HookesLawConstants.SCREEN_VIEW_OPTIONS, {
      tandem: tandem
    } ) );

    // View length of 1 meter of displacement
    const unitDisplacementLength = HookesLawConstants.UNIT_DISPLACEMENT_X;

    // Properties that are specific to the view
    const viewProperties = new EnergyViewProperties( tandem.createTandem( 'viewProperties' ) );

    // Visibility controls
    const visibilityControls = new EnergyVisibilityControls( viewProperties, {
      right: this.layoutBounds.right - 10,
      top: 10,
      maxWidth: 235, // constrain width for i18n, determining empirically
      tandem: tandem.createTandem( 'visibilityControls' )
    } );
    this.addChild( visibilityControls );

    // System
    const systemNode = new EnergySystemNode( model.system, viewProperties, {
      unitDisplacementLength: unitDisplacementLength,
      number: 1,
      left: this.layoutBounds.left + 35,
      bottom: this.layoutBounds.bottom - 10,
      tandem: tandem.createTandem( 'systemNode' )
    } );
    this.addChild( systemNode );

    // Energy bar graph
    const barGraph = new EnergyBarGraph( model.system.spring, viewProperties.valuesVisibleProperty, {
      // x position depends on whether XY plots are visible
      bottom: systemNode.top - 35,
      tandem: tandem.createTandem( 'barGraph' )
    } );
    this.addChild( barGraph );

    // Force plot
    const forcePlot = new ForcePlot( model.system.spring, unitDisplacementLength,
      viewProperties.valuesVisibleProperty,
      viewProperties.displacementVectorVisibleProperty,
      viewProperties.energyOnForcePlotVisibleProperty, {
        // origin aligned with equilibrium position
        x: systemNode.x + ( unitDisplacementLength * model.system.spring.equilibriumXProperty.get() ),
        bottom: barGraph.bottom,
        tandem: tandem.createTandem( 'forcePlot' )
      } );
    this.addChild( forcePlot );

    // Energy plot
    const energyPlot = new EnergyPlot( model.system.spring, unitDisplacementLength,
      viewProperties.valuesVisibleProperty, viewProperties.displacementVectorVisibleProperty, {
        x: forcePlot.x,
        y: barGraph.bottom,
        tandem: tandem.createTandem( 'energyPlot' )
      } );
    this.addChild( energyPlot );

    // Reset All button, bottom right
    const resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
        viewProperties.reset();
      },
      right: this.layoutBounds.maxX - 15,
      bottom: this.layoutBounds.maxY - 15,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( resetAllButton );

    // Observe view properties
    viewProperties.graphProperty.link( function( graph ) {

      forcePlot.visible = ( graph === 'forcePlot' );
      energyPlot.visible = ( graph === 'energyPlot' );

      if ( graph === 'barGraph' ) {
        // aligned with equilibrium position
        barGraph.x = systemNode.x + ( unitDisplacementLength * model.system.spring.equilibriumXProperty.get() );
      }
      else {
        barGraph.left = 15;
      }
    } );
  }

  hookesLaw.register( 'EnergyScreenView', EnergyScreenView );

  return inherit( ScreenView, EnergyScreenView );
} );