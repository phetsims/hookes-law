// Copyright 2015-2022, University of Colorado Boulder

/**
 * EnergyScreenView is the top-level view for the "Energy" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import { Node } from '../../../../scenery/js/imports.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import hookesLaw from '../../hookesLaw.js';
import EnergyModel from '../model/EnergyModel.js';
import EnergyBarGraph from './EnergyBarGraph.js';
import EnergyGraph from './EnergyGraph.js';
import EnergyPlot from './EnergyPlot.js';
import EnergySystemNode from './EnergySystemNode.js';
import EnergyViewProperties from './EnergyViewProperties.js';
import EnergyVisibilityPanel from './EnergyVisibilityPanel.js';
import ForcePlot from './ForcePlot.js';

export default class EnergyScreenView extends ScreenView {

  public constructor( model: EnergyModel, tandem: Tandem ) {

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

    // System
    const systemNode = new EnergySystemNode( model.system, viewProperties, {
      unitDisplacementLength: unitDisplacementLength,
      left: this.layoutBounds.left + 35,
      bottom: this.layoutBounds.bottom - 10,
      tandem: tandem.createTandem( 'systemNode' )
    } );

    const graphsTandem = tandem.createTandem( 'graphs' );

    // Energy bar graph
    const barGraph = new EnergyBarGraph( model.system.spring, viewProperties.valuesVisibleProperty, {
      // x position depends on whether the other plots are visible
      bottom: systemNode.top - 35,
      tandem: graphsTandem.createTandem( 'barGraph' )
    } );

    // Force plot
    const forcePlot = new ForcePlot( model.system.spring, unitDisplacementLength,
      viewProperties.valuesVisibleProperty,
      viewProperties.displacementVectorVisibleProperty,
      viewProperties.energyOnForcePlotVisibleProperty, {
        // origin aligned with equilibrium position
        x: systemNode.x + ( unitDisplacementLength * model.system.spring.equilibriumXProperty.value ),
        bottom: barGraph.bottom,
        visibleProperty: new DerivedProperty( [ viewProperties.graphProperty ], graph => ( graph === EnergyGraph.FORCE_PLOT ) ),
        tandem: graphsTandem.createTandem( 'forcePlot' )
      } );

    // Energy plot
    const energyPlot = new EnergyPlot( model.system.spring, unitDisplacementLength,
      viewProperties.valuesVisibleProperty, viewProperties.displacementVectorVisibleProperty, {
        x: forcePlot.x,
        y: barGraph.bottom,
        visibleProperty: new DerivedProperty( [ viewProperties.graphProperty ], graph => ( graph === EnergyGraph.ENERGY_PLOT ) ),
        tandem: graphsTandem.createTandem( 'energyPlot' )
      } );

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

    const screenViewRootNode = new Node( {
      children: [
        visibilityPanel,
        systemNode,
        barGraph,
        forcePlot,
        energyPlot,
        resetAllButton
      ]
    } );
    this.addChild( screenViewRootNode );

    // Position the Bar Graph
    viewProperties.graphProperty.link( graph => {
      if ( graph === EnergyGraph.BAR_GRAPH ) {
        // aligned with equilibrium position
        barGraph.x = systemNode.x + ( unitDisplacementLength * model.system.spring.equilibriumXProperty.value );
      }
      else {
        // at the left edge of the ScreenView
        barGraph.left = this.layoutBounds.left + 15;
      }
    } );
  }
}

hookesLaw.register( 'EnergyScreenView', EnergyScreenView );