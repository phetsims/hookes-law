// Copyright 2002-2015, University of Colorado Boulder

/**
 * View for the "Energy" screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var EnergyBarGraph = require( 'HOOKES_LAW/energy/view/EnergyBarGraph' );
  var EnergyGraphControls = require( 'HOOKES_LAW/energy/view/EnergyGraphControls' );
  var EnergyXYPlot = require( 'HOOKES_LAW/energy/view/EnergyXYPlot' );
  var EnergySystemNode = require( 'HOOKES_LAW/energy/view/EnergySystemNode' );
  var EnergyViewProperties = require( 'HOOKES_LAW/energy/view/EnergyViewProperties' );
  var EnergyVisibilityPanel = require( 'HOOKES_LAW/energy/view/EnergyVisibilityPanel' );
  var ForceXYPlot = require( 'HOOKES_LAW/energy/view/ForceXYPlot' );
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

    // System
    var systemNode = new EnergySystemNode( model.system, modelViewTransform, viewProperties, {
      number: 1,
      left: this.layoutBounds.left + 100,
      bottom: this.layoutBounds.bottom - 10
    } );
    this.addChild( systemNode );

    // Visibility controls
    var visibilityPanel = new EnergyVisibilityPanel( viewProperties, {
      right: this.layoutBounds.right - 10,
      top: systemNode.top
    } );
    this.addChild( visibilityPanel );

    // Energy bar graph
    var energyBarGraph = new EnergyBarGraph( model.system.spring, {
      left: 20,
      bottom: systemNode.top - 20
    } );
    this.addChild( energyBarGraph );

    // Energy XY plot
    var energyXYPlot = new EnergyXYPlot( model.system.spring, modelViewTransform, {
      left: energyBarGraph.right + 25,
      bottom: energyBarGraph.bottom
    } );
    this.addChild( energyXYPlot );

    // Force XY plot
    var forceXYPlot = new ForceXYPlot( model.system.spring, modelViewTransform, {
      left: energyBarGraph.right + 25,
      centerY: 0.25 * this.layoutBounds.height
    } );
    this.addChild( forceXYPlot );

    // Graph controls
    var graphControls = new EnergyGraphControls( viewProperties, {
      left: energyXYPlot.right + 20,
      top: this.layoutBounds.top + 20
    } );
    this.addChild( graphControls );

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
      forceXYPlot.visible = ( graph === 'force' );
      energyXYPlot.visible = ( graph === 'energy' );
    } );
  }

  return inherit( ScreenView, EnergyView );
} );