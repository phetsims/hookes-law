// Copyright 2002-2015, University of Colorado Boulder

/**
 * View for the "Systems" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ParallelSystemNode = require( 'HOOKES_LAW/systems/view/ParallelSystemNode' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var SeriesParallelControl = require( 'HOOKES_LAW/systems/view/SeriesParallelControl' );
  var SeriesSystemNode = require( 'HOOKES_LAW/systems/view/SeriesSystemNode' );
  var SystemsVisibilityPanel = require( 'HOOKES_LAW/systems/view/SystemsVisibilityPanel' );
  var SystemsViewProperties = require( 'HOOKES_LAW/systems/view/SystemsViewProperties' );

  /**
   * @param {SystemsModel} model
   * @constructor
   */
  function SystemsView( model ) {

    ScreenView.call( this, HookesLawConstants.SCREEN_VIEW_OPTIONS );

    var unitDisplacementLength = HookesLawConstants.UNIT_DISPLACEMENT_X;

    // Properties that are specific to the view
    var viewProperties = new SystemsViewProperties();

    // Visibility controls
    var visibilityPanel = new SystemsVisibilityPanel( viewProperties, {
      top: this.layoutBounds.top + 10,
      right: this.layoutBounds.right - 10,
      maxWidth: 260 // constrain width for i18n, determining empirically
    } );
    this.addChild( visibilityPanel );

    // Control for selecting between series and parallel systems
    var seriesParallelControl = new SeriesParallelControl( viewProperties.seriesParallelProperty, {
      centerX: visibilityPanel.centerX,
      top: visibilityPanel.bottom + 10
    } );
    this.addChild( seriesParallelControl );

    // Series system
    var seriesSystemNode = new SeriesSystemNode( model.seriesSystem, viewProperties, {
      unitDisplacementLength: unitDisplacementLength,
      left: this.layoutBounds.left + 15, //careful! position this so that max applied force vector doesn't go offscreen or overlap control panel
      centerY: this.layoutBounds.centerY,
      visible: viewProperties.seriesParallelProperty.get() === 'series'
    } );
    this.addChild( seriesSystemNode );

    // Parallel system
    var parallelSystemNode = new ParallelSystemNode( model.parallelSystem, viewProperties, {
      unitDisplacementLength: unitDisplacementLength,
      left: seriesSystemNode.left,
      centerY: this.layoutBounds.centerY,
      visible: viewProperties.seriesParallelProperty.get() === 'parallel'
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
      bottom: this.layoutBounds.maxY - 15
    } );
    this.addChild( resetAllButton );

    viewProperties.seriesParallelProperty.lazyLink( function( seriesParallel ) {
      // make one of the 2 systems visible
      seriesSystemNode.visible = ( seriesParallel === 'series' );
      parallelSystemNode.visible = ( seriesParallel === 'parallel' );
    } );
  }

  return inherit( ScreenView, SystemsView );
} );