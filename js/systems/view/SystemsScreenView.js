// Copyright 2015-2020, University of Colorado Boulder

/**
 * View for the "Systems" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import ScreenView from '../../../../joist/js/ScreenView.js';
import merge from '../../../../phet-core/js/merge.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import HookesLawConstants from '../../common/HookesLawConstants.js';
import hookesLaw from '../../hookesLaw.js';
import ParallelSystemNode from './ParallelSystemNode.js';
import SeriesSystemNode from './SeriesSystemNode.js';
import SystemsSceneControl from './SystemsSceneControl.js';
import SystemsViewProperties from './SystemsViewProperties.js';
import SystemsVisibilityControls from './SystemsVisibilityControls.js';

class SystemsScreenView extends ScreenView {
  /**
   * @param {SystemsModel} model
   * @param {Tandem} tandem
   */
  constructor( model, tandem ) {

    super( merge( {}, HookesLawConstants.SCREEN_VIEW_OPTIONS, {
      tandem: tandem
    } ) );

    // View length of 1 meter of displacement
    const unitDisplacementLength = HookesLawConstants.UNIT_DISPLACEMENT_X;

    // Properties that are specific to the view
    const viewProperties = new SystemsViewProperties( tandem.createTandem( 'viewProperties' ) );

    // Visibility controls
    const visibilityControls = new SystemsVisibilityControls( viewProperties, {
      maxWidth: 260, // constrain width for i18n, determining empirically
      tandem: tandem.createTandem( 'visibilityControls' )
    } );

    // Control for switching between series and parallel systems
    const sceneControl = new SystemsSceneControl( viewProperties.seriesParallelProperty, {
      tandem: tandem.createTandem( 'sceneControl' )
    } );

    // horizontally center the controls
    this.addChild( new VBox( {
      spacing: 10,
      children: [ visibilityControls, sceneControl ],
      right: this.layoutBounds.right - 10,
      top: this.layoutBounds.top + 10
    } ) );

    // Series system
    const seriesSystemNode = new SeriesSystemNode( model.seriesSystem, viewProperties, {
      unitDisplacementLength: unitDisplacementLength,
      left: this.layoutBounds.left + 15, //careful! position this so that max applied force vector doesn't go offscreen or overlap control panel
      centerY: this.layoutBounds.centerY,
      visible: viewProperties.seriesParallelProperty.get() === 'series',
      tandem: tandem.createTandem( 'seriesSystemNode' )
    } );
    this.addChild( seriesSystemNode );

    // Parallel system
    const parallelSystemNode = new ParallelSystemNode( model.parallelSystem, viewProperties, {
      unitDisplacementLength: unitDisplacementLength,
      left: seriesSystemNode.left,
      centerY: this.layoutBounds.centerY,
      visible: viewProperties.seriesParallelProperty.get() === 'parallel',
      tandem: tandem.createTandem( 'parallelSystemNode' )
    } );
    assert && assert( parallelSystemNode.height < this.layoutBounds.height, 'parallel system is too tall' );
    this.addChild( parallelSystemNode );

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

    // Make one of the 2 systems visible
    viewProperties.seriesParallelProperty.lazyLink( seriesParallel => {
      seriesSystemNode.visible = ( seriesParallel === 'series' );
      parallelSystemNode.visible = ( seriesParallel === 'parallel' );
    } );
  }
}

hookesLaw.register( 'SystemsScreenView', SystemsScreenView );

export default SystemsScreenView;