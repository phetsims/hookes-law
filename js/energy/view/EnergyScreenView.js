// Copyright 2015-2020, University of Colorado Boulder

/**
 * View for the "Energy" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import hookesLaw from '../../hookesLaw.js';
import EnergyBarGraph from './EnergyBarGraph.js';
import EnergyGraph from './EnergyGraph.js';
import EnergyPlot from './EnergyPlot.js';
import EnergySystemNode from './EnergySystemNode.js';
import EnergyViewProperties from './EnergyViewProperties.js';
import EnergyVisibilityPanel from './EnergyVisibilityPanel.js';
import ForcePlot from './ForcePlot.js';

class EnergyScreenView extends ScreenView {

  /**
   * @param {EnergyModel} model
   * @param {Tandem} tandem
   */
  constructor( model, tandem ) {

    super( {
      tandem: tandem
    } );

    // View length of 1 meter of displacement
    const unitDisplacementLength = HookesLawConstants.UNIT_DISPLACEMENT_X;

    // Properties that are specific to the view
    const viewProperties = new EnergyViewProperties( tandem.createTandem( 'viewProperties' ) );

    // Visibility controls
    const visibilityPanel = new EnergyVisibilityPanel( viewProperties, {
      right: this.layoutBounds.right - 10,
      top: 10,
      maxWidth: 235, // constrain width for i18n, determining empirically
      tandem: tandem.createTandem( 'visibilityPanel' )
    } );
    this.addChild( visibilityPanel );

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
      listener: () => {
        model.reset();
        viewProperties.reset();
      },
      right: this.layoutBounds.maxX - 15,
      bottom: this.layoutBounds.maxY - 15,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( resetAllButton );

    // Observe view properties
    viewProperties.graphProperty.link( graph => {

      forcePlot.visible = ( graph === EnergyGraph.FORCE_PLOT );
      energyPlot.visible = ( graph === EnergyGraph.ENERGY_PLOT );

      if ( graph === EnergyGraph.BAR_GRAPH ) {
        // aligned with equilibrium position
        barGraph.x = systemNode.x + ( unitDisplacementLength * model.system.spring.equilibriumXProperty.get() );
      }
      else {
        barGraph.left = 15;
      }
    } );
  }
}

hookesLaw.register( 'EnergyScreenView', EnergyScreenView );

export default EnergyScreenView;