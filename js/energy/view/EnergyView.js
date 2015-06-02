// Copyright 2002-2015, University of Colorado Boulder

/**
 * View for the "Energy" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var EnergyGraph = require( 'HOOKES_LAW/energy/view/EnergyGraph' );
  var EnergySystemNode = require( 'HOOKES_LAW/energy/view/EnergySystemNode' );
  var EnergyViewProperties = require( 'HOOKES_LAW/energy/view/EnergyViewProperties' );
  var EnergyVisibilityPanel = require( 'HOOKES_LAW/energy/view/EnergyVisibilityPanel' );
  var ForceGraph = require( 'HOOKES_LAW/energy/view/ForceGraph' );
  var HookesLawConstants = require( 'HOOKES_LAW/common/HookesLawConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ScreenView = require( 'JOIST/ScreenView' );

  /**
   * @param {EnergyModel} model
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function EnergyView( model, modelViewTransform ) {

    ScreenView.call( this, HookesLawConstants.SCREEN_VIEW_OPTIONS );

    // Properties that are specific to the view
    var viewProperties = new EnergyViewProperties();

    // Visibility controls
    var visibilityPanel = new EnergyVisibilityPanel( viewProperties, {
      top: this.layoutBounds.top + 10,
      right: this.layoutBounds.right - 10
    } );
    this.addChild( visibilityPanel );

    // System
    var systemNode = new EnergySystemNode( model.system, modelViewTransform, viewProperties, {
      number: 1,
      left: this.layoutBounds.left + 49, //careful! position this so that max applied force vector doesn't go offscreen or overlap control panel
      bottom: this.layoutBounds.bottom - 10
    } );
    this.addChild( systemNode );

    // Force graph
    var forceGraph = new ForceGraph( model.system, {
      centerX: visibilityPanel.left / 2,
      bottom: systemNode.top - 20
    } );
    this.addChild( forceGraph );

    // Energy graph
    var energyGraph = new EnergyGraph( model.system, {
      translation: forceGraph.translation
    } );
    this.addChild( energyGraph );

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

    viewProperties.graphProperty.link( function( graph ) {
      forceGraph.visible = ( graph === 'force' );
      energyGraph.visible = ( graph === 'energy' );
    } );
  }

  return inherit( ScreenView, EnergyView );
} );