// Copyright 2015-2018, University of Colorado Boulder

/**
 * View for the "Systems" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const hookesLaw = require( 'HOOKES_LAW/hookesLaw' );
  const HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  const inherit = require( 'PHET_CORE/inherit' );
  const ParallelSystemNode = require( 'HOOKES_LAW/systems/view/ParallelSystemNode' );
  const ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  const ScreenView = require( 'JOIST/ScreenView' );
  const SeriesSystemNode = require( 'HOOKES_LAW/systems/view/SeriesSystemNode' );
  const SystemsSceneControl = require( 'HOOKES_LAW/systems/view/SystemsSceneControl' );
  const SystemsViewProperties = require( 'HOOKES_LAW/systems/view/SystemsViewProperties' );
  const SystemsVisibilityControls = require( 'HOOKES_LAW/systems/view/SystemsVisibilityControls' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  /**
   * @param {SystemsModel} model
   * @param {Tandem} tandem
   * @constructor
   */
  function SystemsScreenView( model, tandem ) {

    ScreenView.call( this, _.extend( {}, HookesLawConstants.SCREEN_VIEW_OPTIONS, {
      tandem: tandem
    } ) );

    // View length of 1 meter of displacement
    var unitDisplacementLength = HookesLawConstants.UNIT_DISPLACEMENT_X;

    // Properties that are specific to the view
    var viewProperties = new SystemsViewProperties( tandem.createTandem( 'viewProperties' ) );

    // Visibility controls
    var visibilityControls = new SystemsVisibilityControls( viewProperties, {
      maxWidth: 260, // constrain width for i18n, determining empirically
      tandem: tandem.createTandem( 'visibilityControls' )
    } );

    // Control for switching between series and parallel systems
    var sceneControl = new SystemsSceneControl( viewProperties.seriesParallelProperty, {
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
    var seriesSystemNode = new SeriesSystemNode( model.seriesSystem, viewProperties, {
      unitDisplacementLength: unitDisplacementLength,
      left: this.layoutBounds.left + 15, //careful! position this so that max applied force vector doesn't go offscreen or overlap control panel
      centerY: this.layoutBounds.centerY,
      visible: viewProperties.seriesParallelProperty.get() === 'series',
      tandem: tandem.createTandem( 'seriesSystemNode' )
    } );
    this.addChild( seriesSystemNode );

    // Parallel system
    var parallelSystemNode = new ParallelSystemNode( model.parallelSystem, viewProperties, {
      unitDisplacementLength: unitDisplacementLength,
      left: seriesSystemNode.left,
      centerY: this.layoutBounds.centerY,
      visible: viewProperties.seriesParallelProperty.get() === 'parallel',
      tandem: tandem.createTandem( 'parallelSystemNode' )
    } );
    assert && assert( parallelSystemNode.height < this.layoutBounds.height, 'parallel system is too tall' );
    this.addChild( parallelSystemNode );

    // Reset All button, bottom right
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
        viewProperties.reset();
      },
      right: this.layoutBounds.maxX - 15,
      bottom: this.layoutBounds.maxY - 15,
      tandem: tandem.createTandem( 'resetAllButton' )
    } );
    this.addChild( resetAllButton );

    // Make one of the 2 systems visible
    viewProperties.seriesParallelProperty.lazyLink( function( seriesParallel ) {
      seriesSystemNode.visible = ( seriesParallel === 'series' );
      parallelSystemNode.visible = ( seriesParallel === 'parallel' );
    } );
  }

  hookesLaw.register( 'SystemsScreenView', SystemsScreenView );

  return inherit( ScreenView, SystemsScreenView );
} );