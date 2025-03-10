// Copyright 2015-2025, University of Colorado Boulder

/**
 * View for the "Systems" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import hookesLaw from '../../hookesLaw.js';
import SystemsModel from '../model/SystemsModel.js';
import ParallelSystemNode from './ParallelSystemNode.js';
import SeriesSystemNode from './SeriesSystemNode.js';
import SystemsViewProperties from './SystemsViewProperties.js';
import SystemsVisibilityPanel from './SystemsVisibilityPanel.js';
import SystemType from './SystemType.js';
import SystemTypeRadioButtonGroup from './SystemTypeRadioButtonGroup.js';

export default class SystemsScreenView extends ScreenView {

  public constructor( model: SystemsModel, tandem: Tandem ) {

    super( {
      tandem: tandem
    } );

    // View length of 1 meter of displacement
    const unitDisplacementLength = HookesLawConstants.UNIT_DISPLACEMENT_X;

    // Properties that are specific to the view
    const viewProperties = new SystemsViewProperties( tandem.createTandem( 'viewProperties' ) );

    // Visibility controls
    const visibilityPanel = new SystemsVisibilityPanel( viewProperties, {
      tandem: tandem.createTandem( 'visibilityPanel' )
    } );

    // Radio buttons for switching between series and parallel systems
    const systemTypeRadioButtonGroup = new SystemTypeRadioButtonGroup( viewProperties.systemTypeProperty,
      tandem.createTandem( 'systemTypeRadioButtonGroup' ) );

    // Controls at top right
    const controls = new VBox( {
      spacing: 10,
      children: [ visibilityPanel, systemTypeRadioButtonGroup ]
    } );
    controls.localBoundsProperty.link( () => {
      controls.right = this.layoutBounds.right - 10;
      controls.top = this.layoutBounds.top + 10;
    } );

    // Series system
    const seriesSystemNode = new SeriesSystemNode( model.seriesSystem, viewProperties, {
      unitDisplacementLength: unitDisplacementLength,
      left: this.layoutBounds.left + 30, //careful! position this so that max applied force vector doesn't go offscreen or overlap control panel
      centerY: this.layoutBounds.centerY,
      visibleProperty: new DerivedProperty( [ viewProperties.systemTypeProperty ], systemType => ( systemType === SystemType.SERIES ) ),
      tandem: tandem.createTandem( 'seriesSystemNode' )
    } );

    // Parallel system
    const parallelSystemNode = new ParallelSystemNode( model.parallelSystem, viewProperties, {
      unitDisplacementLength: unitDisplacementLength,
      left: seriesSystemNode.left,
      centerY: this.layoutBounds.centerY,
      visibleProperty: new DerivedProperty( [ viewProperties.systemTypeProperty ], systemType => ( systemType === SystemType.PARALLEL ) ),
      tandem: tandem.createTandem( 'parallelSystemNode' )
    } );
    assert && assert( parallelSystemNode.height < this.layoutBounds.height, 'parallel system is too tall' );

    // Interrupt interaction with the systems when the system type changes.
    viewProperties.systemTypeProperty.link( () => {
      seriesSystemNode.interruptSubtreeInput();
      parallelSystemNode.interruptSubtreeInput();
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
        controls,
        seriesSystemNode,
        parallelSystemNode,
        resetAllButton
      ]
    } );
    this.addChild( screenViewRootNode );

    // Play Area focus order
    this.pdomPlayAreaNode.pdomOrder = [
      seriesSystemNode,
      parallelSystemNode
    ];

    // Control Area focus order
    this.pdomControlAreaNode.pdomOrder = [
      controls,
      resetAllButton
    ];
  }
}

hookesLaw.register( 'SystemsScreenView', SystemsScreenView );