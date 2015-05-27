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
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function SystemsView( model, modelViewTransform ) {

    ScreenView.call( this, HookesLawConstants.SCREEN_VIEW_OPTIONS );

    // Properties that are specific to the view
    var viewProperties = new SystemsViewProperties();

    // Visibility controls
    var visibilityPanel = new SystemsVisibilityPanel( viewProperties, {
      top: this.layoutBounds.top + 10,
      right: this.layoutBounds.right - 10
    } );
    this.addChild( visibilityPanel );

    // Control for selecting between series and parallel systems
    var seriesParallelControl = new SeriesParallelControl( viewProperties.seriesParallelProperty, {
      centerX: visibilityPanel.centerX,
      top: visibilityPanel.bottom + 10
    } );
    this.addChild( seriesParallelControl );

    // Series system
    var seriesSystemNode = new SeriesSystemNode( model.seriesSystem, modelViewTransform, viewProperties, {
      left: this.layoutBounds.left + 60,
      centerY: this.layoutBounds.centerY,
      visible: viewProperties.seriesParallelProperty.get() === 'series'
    } );
    this.addChild( seriesSystemNode );

    // Parallel system
    var parallelSystemNode = new ParallelSystemNode( model.parallelSystem, modelViewTransform, viewProperties, {
      left: this.layoutBounds.left + 60,
      centerY: this.layoutBounds.centerY,
      visible: viewProperties.seriesParallelProperty.get() === 'parallel'
    } );
    this.addChild( parallelSystemNode );

    // Create and add the Reset All Button in the bottom right, which resets the model
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
        viewProperties.reset();
      },
      right: this.layoutBounds.maxX - 10,
      bottom: this.layoutBounds.maxY - 10
    } );
    this.addChild( resetAllButton );

    viewProperties.seriesParallelProperty.lazyLink( function( seriesParallel ) {

      // Synchronize the invisible system with the visible system. Do this here instead of in the model to improve performance.
      assert && assert( model.seriesSystem.equivalentSpring.appliedForceRange.equals( model.parallelSystem.equivalentSpring.appliedForceRange ) );
      assert && assert( model.seriesSystem.leftSpring.springConstantRange.equals( model.parallelSystem.topSpring.springConstantRange ) );
      assert && assert( model.seriesSystem.rightSpring.springConstantRange.equals( model.parallelSystem.bottomSpring.springConstantRange ) );
      if ( seriesParallel === 'series' ) {
        model.seriesSystem.equivalentSpring.appliedForceProperty.set( model.parallelSystem.equivalentSpring.appliedForceProperty.get() );
        model.seriesSystem.leftSpring.springConstantProperty.set( model.parallelSystem.topSpring.springConstantProperty.get() );
        model.seriesSystem.rightSpring.springConstantProperty.set( model.parallelSystem.bottomSpring.springConstantProperty.get() );
      }
      else {
        model.parallelSystem.equivalentSpring.appliedForceProperty.set( model.seriesSystem.equivalentSpring.appliedForceProperty.get() );
        model.parallelSystem.topSpring.springConstantProperty.set( model.seriesSystem.leftSpring.springConstantProperty.get() );
        model.parallelSystem.bottomSpring.springConstantProperty.set( model.seriesSystem.rightSpring.springConstantProperty.get() )
      }

      // make one of the 2 systems visible
      seriesSystemNode.visible = ( seriesParallel === 'series' );
      parallelSystemNode.visible = ( seriesParallel === 'parallel' );
    } );
  }

  return inherit( ScreenView, SystemsView );
} );