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
  var ScreenView = require( 'JOIST/ScreenView' );
  var SeriesParallelControl = require( 'HOOKES_LAW/systems/view/SeriesParallelControl' );
  var SystemsVisibilityPanel = require( 'HOOKES_LAW/systems/view/SystemsVisibilityPanel' );
  var SystemsVisibilityProperties = require( 'HOOKES_LAW/systems/view/SystemsVisibilityProperties' );

  /**
   * @param {SystemsModel} model
   * @constructor
   */
  function SystemsView( model ) {

    ScreenView.call( this, HookesLawConstants.SCREEN_VIEW_OPTIONS );

    // Properties that are specific to the visibility of things in the view
    var visibilityProperties = new SystemsVisibilityProperties();

    // Visibility controls
    var visibilityPanel = new SystemsVisibilityPanel( visibilityProperties, {
      top: this.layoutBounds.top + 10,
      right: this.layoutBounds.right - 10
    } );
    this.addChild( visibilityPanel );

    // Control for selecting between series or parallel springs
    var seriesParallelControl = new SeriesParallelControl( model.seriesParallelProperty, {
      centerX: visibilityPanel.centerX,
      top: visibilityPanel.bottom + 10
    } );
    this.addChild( seriesParallelControl );

    // Create and add the Reset All Button in the bottom right, which resets the model
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
        visibilityProperties.reset();
      },
      right: this.layoutBounds.maxX - 10,
      bottom: this.layoutBounds.maxY - 10
    } );
    this.addChild( resetAllButton );
  }

  return inherit( ScreenView, SystemsView );
} );